import React from "react";

export default function QuestionMarkBox(props) {
  return (
    <div
      {...props}
      className="w-72 h-72 text-9xl text-black text-center align-middle font-bold rounded-lg border-black border-2 bg-gray-100 flex flex-col justify-center"
    >
      <span>?</span>
    </div>
  );
}
