import { NextRequest, NextResponse } from 'next/server';
import { translateText, fallbackTranslate } from '@/app/lib/translate';

// Helper function to create a prompt based on user selections
function createPrompt(question: string, scriptures: string[], level: string, language: string) {
  const scriptureContext = scriptures.join(", ");
  
  let levelContext = "";
  switch (level) {
    case "seeker":
      levelContext = "I am a spiritual seeker beginning my journey. Please provide guidance in simple terms with practical first steps.";
      break;
    case "practitioner":
      levelContext = "I am a regular spiritual practitioner with basic understanding. Please provide moderate depth with practical applications.";
      break;
    case "sage":
      levelContext = "I am an advanced spiritual practitioner. Please provide deep philosophical insights and nuanced interpretations.";
      break;
    default:
      levelContext = "I am seeking spiritual guidance. Please provide balanced insights.";
  }

  let languageName = "English";
  switch (language) {
    case "hi": languageName = "Hindi"; break;
    case "sa": languageName = "Sanskrit"; break;
    case "bn": languageName = "Bengali"; break;
    case "ta": languageName = "Tamil"; break;
    case "te": languageName = "Telugu"; break;
    case "mr": languageName = "Marathi"; break;
    case "gu": languageName = "Gujarati"; break;
    case "kn": languageName = "Kannada"; break;
    case "ml": languageName = "Malayalam"; break;
    case "pa": languageName = "Punjabi"; break;
    case "ne": languageName = "Nepali"; break;
    case "si": languageName = "Sinhala"; break;
    case "en": languageName = "English"; break;
    // Add more languages as needed
  }

  const languageInstruction = language === 'en' 
  ? "Please respond in English." 
  : `Please respond in ${languageName} language. The entire response including the quote, explanation, application, and meditation should be in ${languageName}.`;

  
  return `
    I am seeking spiritual guidance from the following scriptures: ${scriptureContext}.
    
    ${levelContext}
    
    My question is: ${question}
    
    ${languageInstruction}
    
    Please structure your response as follows:

    1. Begin with a direct quote or verse from one of the selected scriptures that addresses my question. Present this as a complete quotation in quotation marks.
    
    2. Provide the source of the quote (scripture name, chapter, verse if applicable) on a new line after the quote.
    
    3. Explanation: Write a clear explanation of the meaning in 2-3 short, complete paragraphs. Avoid bullet points, numbered lists, or asterisks. Make sure each paragraph flows naturally and contains complete thoughts.
    
    4. Application: Begin this section with "Application:" and then provide 1-2 concise paragraphs about how I can apply this wisdom in my daily life. Ensure these are complete paragraphs with full sentences, not fragmented points. Do not use bullet points or asterisks.
    
    5. Meditation: Begin this section with "Meditation:" and then describe a short meditation or reflection practice in 1 complete paragraph. This should be a cohesive paragraph with clear instructions, not a list of steps.
    
    Important formatting guidelines:
    - Do not use asterisks (*), bullet points, or numbered lists anywhere in your response
    - Write in complete sentences and well-formed paragraphs
    - Keep paragraphs concise (3-5 sentences each)
    - Ensure each section flows naturally and doesn't start abruptly
    - Use simple formatting with clear section breaks
    - Do not use markdown formatting
    
    Please ensure the response is authentic to the spiritual traditions represented in the selected scriptures.
  `;
}


export async function POST(request: NextRequest) {
  try {
    const { question, scriptures, level, language } = await request.json();
    
    if (!question || !scriptures || !level || !language) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    // Translate question to English for processing if it's not already in English
    let translatedQuestion = question;
    if (language !== 'en') {
      try {
        translatedQuestion = await translateText(question, 'en');
      } catch (error) {
        console.error('Error translating question:', error);
        // Try fallback translation
        try {
          translatedQuestion = await fallbackTranslate(question, 'en');
        } catch (fallbackError) {
          console.error('Fallback translation also failed:', fallbackError);
          // Continue with original question if both translation attempts fail
        }
      }
    }
    
    // Create the prompt for Groq
    const prompt = createPrompt(translatedQuestion, scriptures, level, language);
    
    // Call Groq API
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192', // or 'mixtral-8x7b-32768' or 'gemma-7b-it'
          messages: [
            { role: 'system', content: 'You are a divine wisdom oracle that provides spiritual guidance based on ancient scriptures.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });
    
    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();
      console.error('Groq API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from wisdom oracle' },
        { status: 500 }
      );
    }
    
    const data = await groqResponse.json();
    const responseText = data.choices[0].message.content;
    
    // Translate the response back to the requested language if it's not English
    // if (language !== 'en') {
    //   try {
    //     responseText = await translateText(responseText, language);
    //   } catch (error) {
    //     console.error('Error translating response:', error);
    //     // Try fallback translation
    //     try {
    //       responseText = await fallbackTranslate(responseText, language);
    //     } catch (fallbackError) {
    //       console.error('Fallback translation also failed:', fallbackError);
    //       // Continue with original response if both translation attempts fail
    //     }
    //   }
    // }
    
    // Parse the response to extract structured data
    const parsedResponse = parseGrokResponse(responseText);
    
    return NextResponse.json({ 
      response: responseText,
      structured: parsedResponse
    });
    
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to parse Grok's response into structured data
function parseGrokResponse(text: string) {
  try {
    // This is a simplified parser - you would need to adjust based on actual response patterns
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    // Extract quote - usually the first paragraph or text in quotes
    const quoteMatch = text.match(/"([^"]+)"/);
    const quote = quoteMatch ? quoteMatch[1] : lines[0];
    
    // Try to find source information
    const sourceRegex = /(Source|From|—|-).*?(Bhagavad Gita|Upanishads|Vedas|Yoga Sutras|Ramayana|Mahabharata|Puranas).*?(\d+[:\.]\d+|Chapter \d+|Verse \d+)?/i;
    const sourceMatch = text.match(sourceRegex);
    let source = "Ancient Scripture";
    let chapter = null;
    let verse = null;
    
    if (sourceMatch) {
      source = sourceMatch[2];
      if (sourceMatch[3]) {
        const chapterVerseMatch = sourceMatch[3].match(/(\d+)[:\.]\s*(\d+)/);
        if (chapterVerseMatch) {
          chapter = parseInt(chapterVerseMatch[1]);
          verse = parseInt(chapterVerseMatch[2]);
        }
      }
    }
    
    // Extract explanation - usually follows the quote
    let explanation = "";
    let foundQuote = false;
    for (const line of lines) {
      if (line.includes(quote)) {
        foundQuote = true;
        continue;
      }
      if (foundQuote && !line.match(sourceRegex) && !line.includes("Application") && !line.includes("Meditation")) {
        explanation += line + " ";
      }
    }
    
    // Extract application advice
    const applicationMatch = text.match(/Application[:\s]+([\s\S]+?)(?=Meditation|$)/i);
    const application = applicationMatch ? applicationMatch[1].trim() : "";
    
    // Extract meditation practice
    const meditationMatch = text.match(/Meditation[:\s]+([\s\S]+?)(?=$)/i);
    const meditation = meditationMatch ? meditationMatch[1].trim() : "";
    
    return {
      quote,
      source,
      chapter,
      verse,
      explanation: explanation.trim(),
      application,
      meditation
    };
  } catch (error) {
    console.error('Error parsing response:', error);
    return {
      quote: text,
      source: "Ancient Scripture",
      explanation: "Divine wisdom to contemplate.",
      application: "",
      meditation: ""
    };
  }
}
