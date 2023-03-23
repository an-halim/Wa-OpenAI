import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Web() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY || "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"

  function copyToClipBoard(e) {
    let text = e.target.innerText;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  }

  function askToGPT() {
    setLoading(true);
    let question = document.querySelector("textarea").value;
    let answer = document.querySelector(".text-base.cursor-pointer");
    let url = `https://api.openai.com/v1/engines/davinci/completions`;
    let data = {
      prompt: question,
      max_tokens: 50,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\n", " Human:", " AI:"],
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        answer.innerText = data.choices[0].text;
      })
      .catch((err) => {
        setError(true)
        console.log(err);
        setTimeout(() => {
          setError(false)
        }, 3000);
      });
    setLoading(false);
  }

  return (
    <div className='max-w-4xl py-2 px-2 mx-auto divide-y '>
      <Navbar />
      <main className='flex flex-col md:py-2 mx-2 px-2 md:mx-5 md:px-5'>
        <h1
          className='font-bold text-xl mb-2 mt-5 text-center bg-gradient-to-r from-sky-400 via-indigo-600 to-violet-100
        bg-clip-text text-transparent
        '>
          Mau tanya apa?
        </h1>
        <p className='text-slate-500 mb-5 text-center'>
          Sudah lebih dari 1000 pertanyaan yang telah dijawab oleh{" "}
          <span
            className='font-bold bg-gradient-to-r from-sky-400 via-indigo-600 to-violet-100
        bg-clip-text text-transparent'>
            GPT-3
          </span>
        </p>
        <div className='flex flex-col items-center justify-center'>
          <form
            className='w-full'
            onSubmit={(e) => {
              e.preventDefault();
              askToGPT();
            }}>
            <textarea
              className='w-full h-40 mt-5 border-2 border-gray-300 p-4 rounded-lg focus:outline-none focus:border-blue-500'
              placeholder='Tulis pertanyaanmu disini'
              required></textarea>

            <button
              disabled={loading}
              className='rounded bg-blue-500 text-white p-3 mt-1 font-semibold text-sm w-full 
              hover:bg-blue-600
              focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50
              shadow-lg
              transition duration-300 ease-in-out
              transform hover:-translate-y-1 
              active:scale-95
              font-bold              
              hover:shadow-blue-300
              '
              type='submit'>
              Kirim
            </button>
          </form>
        </div>

        {
          error && (
            <small class=" font-medium text-base p-3 inline-block text-white rounded my-5
            transition duration-300 ease-in-out
            transform hover:-translate-y-1
            bg-red-500
            shadow-lg
            ">
            <p className='text-center'>
              <span className='font-bold'>Opps!</span> 
              <br />
              <span className='font-bold'>GPT-3</span> tidak bisa menjawab pertanyaanmu saat ini.
            </p>
          </small>
          )
        }

        {/* card jawaban */}
        <div className='flex flex-col items-center justify-center mt-5 mb-5'>
          <div className='w-full h-40 mt-5 border-2 border-gray-300 p-4 rounded-lg focus:outline-none focus:border-blue-500'>
            <p className='text-base'>
              <span className='font-bold'>GPT-3</span> menjawab:
            </p>
            <p
              className='text-base cursor-pointer'
              onClick={copyToClipBoard}></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
