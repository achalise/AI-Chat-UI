"use client"
import { useState } from "react"

export default function Home() {
  const post = async () => {
    setResponse((r) => {
      return "Please wait retrieving response ..."
    })
    const response = await fetch(`http://localhost:8080/chat?question=${message}`);
    const content = await response.text();
    setResponse(content);
    console.log(content);
  }

  const updateValue = (e: any) => {
    setMessage(e.target.value)
  }
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  return (
    <div className="container">
      <div className="mb-1">
        <label  className="form-label">Question</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Type your question .." 
           value={message} onChange={ updateValue }/>
        <button type="button" className="btn btn-dark mt-3 mb-3" onClick={post}>Submit</button>
      </div>
      <div className="mb-1">
        <label className="form-label">Response</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="30" value={response}></textarea>
      </div>
    </div>
  )
}