import React, { useEffect, useState } from "react";

const Typewriter = ({ message, onUpdate }) => {
  const [text, setText] = useState("0"); // Initialize with '0'

  useEffect(() => {
    let currentIndex = 0;

    if (message) {
      setText(""); // Clear the text when the message prop changes
      const typingInterval = setInterval(() => {
        if (currentIndex < message.length) {
          setText((prevText) => prevText + message[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          // Send a response back
        }
      }, 1000); // Adjust the typing speed (in milliseconds) as needed

      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [message, onUpdate]);

  return (
    <div className="typewriter">
      <p>{text}</p>
    </div>
  );
};

export default Typewriter;
