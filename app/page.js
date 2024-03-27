"use client"
import { useRef } from 'react';
import { useState, useEffect } from "react"
import { useRecordVoice } from "./RecordVoice/page"
import 'tailwindcss/tailwind.css'
import 'regenerator-runtime/runtime';
import {useRouter} from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <main>
      <h1 className='p-50 m-5 text-sky-900 text-center text-3xl'>Neem Bean Machine</h1>
      <div className='text-center'>
        <button className='w-full h-12 px-6 text-white bg-sky-800 rounded-xl hover:bg-sky-900' onClick={() => router.push('/aiHome')}>
          Ask ChatGPT Your Question
        </button>
      </div>
    </main>
  )
    
}

