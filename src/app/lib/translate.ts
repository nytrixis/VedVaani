// Remove this import
// import { Translate } from '@google-cloud/translate/build/src/v2';

// Remove the Google Translate client initialization
// let translateClient: Translate | null = null;
// try {
//   translateClient = new Translate({
//     projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
//     key: process.env.GOOGLE_TRANSLATE_API_KEY,
//   });
// } catch (error) {
//   console.error('Error initializing Google Translate:', error);
// }

// Replace the translateText function with this implementation
export async function translateText(text: string, targetLanguage: string) {
    try {
      // If the target language is English, no need to translate
      if (targetLanguage === 'en') {
        return text;
      }
      
      // Use MyMemory Translation API (free tier)
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`
      );
      
      const data = await response.json();
      if (data.responseStatus === 200 && data.responseData) {
        return data.responseData.translatedText;
      }
      
      return text;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text if translation fails
    }
  }
  
  // Keep the fallbackTranslate function as is, since it already uses MyMemory
  export async function fallbackTranslate(text: string, targetLanguage: string) {
    try {
      // If the target language is English, no need to translate
      if (targetLanguage === 'en') {
        return text;
      }
      
      // Use a free translation API as fallback
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`);
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData) {
        return data.responseData.translatedText;
      }
      
      return text;
    } catch (error) {
      console.error('Fallback translation error:', error);
      return text;
    }
  }
  