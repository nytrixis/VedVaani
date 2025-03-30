import { NextRequest, NextResponse } from 'next/server';
import { translateText, fallbackTranslate } from '@/app/lib/translate';

// Helper function to create a prompt based on user selections
function createPrompt(question: string, scriptures: string[], level: string) {
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
  
  return `
    I am seeking spiritual guidance from the following scriptures: ${scriptureContext}.
    
    ${levelContext}
    
    My question is: ${question}
    
    Please structure your response in the following format:
    1. A direct quote or verse from one of the selected scriptures that addresses my question
    2. The source of the quote (scripture name, chapter, verse if applicable)
    3. A clear explanation of the meaning
    4. How I can apply this wisdom in my daily life
    5. A short meditation or reflection practice related to this teaching
    
    Please ensure the response is authentic to the spiritual traditions represented in the selected scriptures, remove any asterisks or special characters, and avoid any unnecessary formatting.
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
    const prompt = createPrompt(translatedQuestion, scriptures, level);
    
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
    let responseText = data.choices[0].message.content;
    
    // Translate the response back to the requested language if it's not English
    if (language !== 'en') {
      try {
        responseText = await translateText(responseText, language);
      } catch (error) {
        console.error('Error translating response:', error);
        // Try fallback translation
        try {
          responseText = await fallbackTranslate(responseText, language);
        } catch (fallbackError) {
          console.error('Fallback translation also failed:', fallbackError);
          // Continue with original response if both translation attempts fail
        }
      }
    }
    
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
