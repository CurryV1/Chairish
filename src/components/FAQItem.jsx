import React, { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  const questionId = question.toLowerCase().replace(/\s+/g, "-") + "-label";
  const answerId = questionId + "-content";

  return (
    <div className="border-b">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-2 px-4 flex justify-between items-center hover:bg-gray-100"
        aria-expanded={open}
        aria-controls={answerId}
        id={questionId}
      >
        <span>{question}</span>
        <span aria-hidden="true">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          id={answerId}
          
          aria-labelledby={questionId}
          className="px-4 pb-4 text-gray-600"
        >
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;



