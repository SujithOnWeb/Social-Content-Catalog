import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent, PlatformKey, SocialPost, Tone } from '../types';
import { PLATFORMS } from '../constants';

// Fix: Initialize GoogleGenAI client according to guidelines.
// The API key is assumed to be available in the environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const textGenerationSchema = {
  type: Type.OBJECT,
  properties: {
    linkedinPost: {
      type: Type.STRING,
      description: "A long-form, professional post for LinkedIn, including relevant business-oriented hashtags. Should be well-structured and insightful.",
    },
    twitterPost: {
      type: Type.STRING,
      description: "A short, punchy, and engaging post for Twitter/X, strictly under 280 characters, with 1-3 relevant hashtags.",
    },
    instagramPost: {
      type: Type.STRING,
      description: "A visually-focused caption for Instagram, encouraging engagement, with a block of 5-7 relevant, popular hashtags at the end.",
    },
    imagePrompt: {
        type: Type.STRING,
        description: "A concise, descriptive, and visually engaging prompt (5-15 words) suitable for an AI image generator to create a relevant image. It should capture the essence of the core idea."
    }
  },
  required: ['linkedinPost', 'twitterPost', 'instagramPost', 'imagePrompt']
};


export async function generateSocialPosts(idea: string, tone: Tone): Promise<SocialPost[]> {
  try {
    // Step 1 & 2: Generate all text content and the image prompt in one call
    const textGenerationResponse = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: `Generate social media content for the following idea: "${idea}". The desired tone is: "${tone}". Please provide the output in a single, valid JSON object with the specified schema. Do not include any text, markdown, or backticks outside of the JSON object.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: textGenerationSchema,
        }
    });

    const textContentRaw = textGenerationResponse.text;
    const { linkedinPost, twitterPost, instagramPost, imagePrompt } = JSON.parse(textContentRaw);
    
    if (!linkedinPost || !twitterPost || !instagramPost || !imagePrompt) {
        throw new Error("Failed to generate complete text content.");
    }

    // Step 3: Generate images for all platforms in parallel
    const imagePromises = PLATFORMS.map(platform => 
      ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: imagePrompt,
        config: {
          numberOfImages: 1,
          aspectRatio: platform.aspectRatio,
          outputMimeType: 'image/jpeg',
        },
      }).then(response => {
        if (!response.generatedImages || response.generatedImages.length === 0) {
          throw new Error(`Image generation failed for ${platform.name}`);
        }
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
      })
    );
    
    const [linkedinImageUrl, twitterImageUrl, instagramImageUrl] = await Promise.all(imagePromises);

    // Step 4: Combine text and images into the final structure
    const results: SocialPost[] = [
      {
        platform: PLATFORMS[0].name,
        text: linkedinPost,
        imageUrl: linkedinImageUrl,
        aspectRatio: PLATFORMS[0].aspectRatio,
      },
      {
        platform: PLATFORMS[1].name,
        text: twitterPost,
        imageUrl: twitterImageUrl,
        aspectRatio: PLATFORMS[1].aspectRatio,
      },
      {
        platform: PLATFORMS[2].name,
        text: instagramPost,
        imageUrl: instagramImageUrl,
        aspectRatio: PLATFORMS[2].aspectRatio,
      }
    ];

    return results;

  } catch (error) {
    console.error("Error generating social media content:", error);
    if (error instanceof Error) {
        throw new Error(`An error occurred with the Gemini API: ${error.message}`);
    }
    throw new Error("An unknown error occurred during content generation.");
  }
}
