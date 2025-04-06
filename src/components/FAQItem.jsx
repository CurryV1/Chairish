import React, { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-2 px-4 flex justify-between items-center hover:bg-gray-100"
      >
        <span>{question}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && <p className="px-4 pb-4 text-gray-600">{answer}</p>}
    </div>
  );
};

export default FAQItem;