import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai'

export async function GET(){
    const data = {
        name: 'megan',
        age: '29'
    }

    return NextResponse.json({data})
}

export async function POST(req){
    const data  = await req.json();
    console.log(data)
    const openai = new OpenAI();
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Respond to the user."
          },
          {
            role: "user",
            content: JSON.stringify(data)
          }
        ],
        temperature: 0,
      })
    
    const content = response.choices[0].message.content;

    return NextResponse.json(JSON.stringify(content))

}