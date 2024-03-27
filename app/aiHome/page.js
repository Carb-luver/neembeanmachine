"use client"
import { useRef } from 'react';
import { useState, useEffect } from "react"
import { useRecordVoice } from "../RecordVoice/page"
import 'tailwindcss/tailwind.css'

export default function Home() {
  const [emailResponse, setEmailResponse] = useState('')
  const { startRecording, stopRecording, transcript } = useRecordVoice()
  const prompt = useRef("")
  const email = useRef("")
  const [response, setResponse] = useState('')
  const [responseArray, setResponseArray] = useState([])
  //const[emailMessage, setEmailMessage] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/handleform',{
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify(prompt.current),
        headers: {
          'content-type': 'application/json'
        }
      })
      const data = await res.json()
      setResponse(data)
      setResponseArray(data.split("\\n"))
      console.log(data)
    } catch (error) {
      console.log("openai failed")
    }
  }

  const sendEmail = async(e) => {
    try {
      const emailMessage = {email: email.current, subject: prompt.current, message: response}
      
      console.log(process.env.EMAIL_USERNAME)
      console.log(emailMessage.message)
      console.log(emailMessage.subject)
      console.log(emailMessage.email)
      
      const emailRes = await fetch('/api/contact',{
        method: 'POST',
        body: JSON.stringify(emailMessage),
      })
      setEmailResponse(await emailRes.json())
      console.log(emailResponse)
    } catch (error) {
      console.log(JSON.stringify("email not sent"))
    }
  }

  return (
    <div>
      <div>
        <div className='h-5'></div>
        <h1 className='text-sky-900 text-center text-3xl'>Hold Icon To Ask ChatGpt Your Question</h1>
        <div className='h-5'></div>
      </div>
      <div className='text-center'>
        <button
          onMouseDown={startRecording}    // Start recording when mouse is pressed
          onMouseUp={stopRecording}        // Stop recording when mouse is released
          onTouchStart={startRecording}    // Start recording when touch begins on a touch device
          onTouchEnd={stopRecording}        // Stop recording when touch ends on a touch device
          className="border-none bg-transparent"
          >
          {/* Microphone icon component */}
          <img className='h-24 w-24' src="/IconMicrophone.png"/>
        </button>
        <div className=''></div>
      </div>

      <div className='p-50 m-5 text-center'>
        <form onSubmit={onSubmit}>
          {/* <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={transcript} /> */}
          <input className='h-10 w-full text-center border-solid border-2 border-sky-500' onChange={(e)=>{prompt.current=e.currentTarget.value}} ref={prompt} type="text" name="name" defaultValue={ transcript }></input>
          <div className='h-5'></div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
        </form>
      </div>
      
        <form onSubmit={sendEmail}>
          <div className="p-50 m-5 text-center">
            <input className='h-10 text-center border-solid border-2 border-sky-500' onChange={(e)=>{email.current=e.currentTarget.value}} type="text" name="email" placeholder="Enter email here"></input>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Send Email</button>
          </div>
          <div className='p-50 m-5'>
            {responseArray.map(item=>(
              <p key={ item }>{ item }</p>
            ))}
            <p className='p-50 m-5 text-center'>{ emailResponse }</p>
          </div>
        </form> 
    </div>
  )
}

