import { NextResponse } from 'next/server';
//import openai from '../../utils/supabase/openai';
import { Configuration, OpenAIApi } from "openai";

interface GenerateRequest {
  prompt: string;
}

export async function POST(request: Request) {


  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);
  
  const body: GenerateRequest = await request.json();

  if (!body.prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }



  try {



    const response = await openai.createChatCompletion({
      model: "gpt-4", // Use "gpt-3.5-turbo" if you don't have access to GPT-4
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: body.prompt },
      ],
      max_tokens: 150,
    });

    //return NextResponse.json({ result: body.prompt});


    // console.log("OpenAI response:", response.data.choices[0].text);

    const messageContent = response.data.choices?.[0]?.message?.content;
    if (!messageContent) {
      return NextResponse.json({ error: "No response from OpenAI" }, { status: 500 });
    }
    return NextResponse.json({ result: messageContent }, { status: 200 });
  } catch (error) {
    
    console.log("Error calling OpenAI API:", error);

    const errorMessage = (error as Error)?.message || "Unknown error occurred";

    return NextResponse.json(
      { error: error },
      { status: 999 }
    );

  }
}