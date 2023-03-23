import React, { useEffect, useState } from "react";

export default function SendVerification() {
  const [number, setNumber] = useState("");

  useEffect(() => {
    document.title = "Almost there!";
    localStorage.setItem("number", "6285647847468");
    setNumber(localStorage.getItem("number"));
  }, []);
  return (
    <div className='bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2 dark:bg-slate-900 dark:text-white h-100vh'>
      <h1 className="font-bold text-xl mb-5">🎉 Almost there!</h1>
      <p className='text-center text-base text-gray-600 dark:text-white'>
        We've sent a messsage at <p className='font-bold'>{number}</p>{" "}
        <p className="mb-5">Please follow the instruction in the message.</p>
      </p>
      <p className='text-center text-base text-gray-600 dark:text-white'>
        Didn't receive an message? <br/>
        <button class="rounded bg-blue-500 text-white p-2 mt-1 font-semibold text-sm">RESEND VERIFICATION</button>
      </p>
    </div>
  );
}
