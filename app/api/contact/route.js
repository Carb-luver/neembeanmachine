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
    const data  = await req.json()
    const nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,    
      auth: {
        user: 'megan.nora.khan.burner@gmail.com',
        pass: ''
      }
    })

    const mailOptions = {
      from: 'megan.nora.khan@gmail.com',
      to: data.email,
      subject: data.subject,
      text: JSON.stringify(data.message)
    }

    try {
      const mail = await transporter.sendMail(mailOptions)
      return NextResponse.json(JSON.stringify("Success! Email sent"))
    } catch (error) {
      return NextResponse.json(JSON.stringify("Could not send email " + error))
    }
    

}