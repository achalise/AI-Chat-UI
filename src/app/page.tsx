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
  const upload = () => {
    const url = 'http://localhost:8080/upload'; 
    const formData = new FormData();
    //data.append("file", file, file.name);
    formData.append("file", file);

    fetch(url, {
      method: 'POST',
      // headers: {
      //   "Content-Type": "multipart/mixed"
      // },
      body: formData 
    })
      .then(response => response.json())
      .then(result => {
        // Handle the response/result here
        console.log(result);
      })
      .catch(error => {
        // Handle any error that occurs during the request
        console.error(error);
      });
  };

  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
  }

  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [file, setFile] = useState<any>({});
  return (
    <div className="container">
      <div className="mb-3">
        <label className="form-label">Default file input example</label>
        <input className="form-control" type="file" id="formFile" onChange={selectFile} />
        <button type="button" className="btn btn-dark mt-3 mb-3" onClick={upload}>Upload</button>
      </div>
      <div className="mb-1">
        <label className="form-label">Question</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Type your question .."
          value={message} onChange={updateValue} />
        <button type="button" className="btn btn-dark mt-3 mb-3" onClick={post}>Submit</button>
      </div>
      <div className="mb-1">
        <label className="form-label">Response</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="30" value={response}></textarea>
      </div>
    </div>
  )
}