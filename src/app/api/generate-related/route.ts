import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Missing prompt parameter' },
        { status: 400 }
      );
    }
    
    // Call Groq API
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'You are a spiritual assistant that generates related questions. Respond only with a JSON array of 3 questions.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });
    
    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();
      console.error('Groq API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate related questions' },
        { status: 500 }
      );
    }
    
    const data = await groqResponse.json();
    const responseText = data.choices[0].message.content;
    
    // Parse the JSON array from the response
    let questions = [];
    try {
      // Handle various response formats
      if (responseText.includes('[') && responseText.includes(']')) {
        const jsonStr = responseText.substring(
          responseText.indexOf('['),
          responseText.lastIndexOf(']') + 1
        );
        questions = JSON.parse(jsonStr);
      } else {
        // Fallback if not properly formatted
        questions = responseText.split('\n')
          .filter((line: string) => line.trim().length > 0)
          .slice(0, 3);
      }
    } catch (error) {
      console.error('Error parsing questions:', error);
      // Fallback to splitting by newlines
            // Fallback to splitting by newlines
            questions = responseText.split('\n')
            .filter((line: string) => line.trim().length > 0 && !line.includes('{') && !line.includes('}'))
            .map((line: string) => line.replace(/^\d+\.\s*/, '').replace(/"/g, ''))
            .slice(0, 3);
        }
        
        // Ensure we have exactly 3 questions
        while (questions.length < 3) {
          questions.push("How can I apply this wisdom in my daily life?");
        }
        
        // Limit to 3 questions if we have more
        questions = questions.slice(0, 3);
        
        return NextResponse.json({ questions });
        
      } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json(
          { error: 'Internal server error', questions: [
            "How can I apply this wisdom in difficult situations?",
            "What does this teaching say about personal growth?",
            "How does this relate to modern spiritual practice?"
          ] },
          { status: 500 }
        );
      }
    }    