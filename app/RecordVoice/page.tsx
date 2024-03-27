"use client";
import { useEffect, useState, useRef } from "react";

declare global {
  interface Window{
    webkitSpeechRecognition:any;
  }
}

export const useRecordVoice = () => {
  const[isRecording, setIsRecording] = useState<boolean>(false);
  const[recordingComplete, setRecordingComplete] = useState<boolean>(false);
  const[transcript, setTranscript] = useState<string>("");

  const recognitionRef = useRef<any>(null);
  
  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event:any) => {
      const { transcript } = event.results[event.results.length-1][0];
      setTranscript(transcript);
    }
    recognitionRef.current.start();
  };

  useEffect(() => {
    return() => {
      if(recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  },[])

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecordingComplete(true);
    }
    // console.log(transcript);
  };

  return { startRecording, stopRecording, transcript};
};