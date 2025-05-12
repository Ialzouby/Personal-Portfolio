"use client";
import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  texts: string[];
  speed?: number;
  pause?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  texts,
  speed = 200,
  pause = 2000,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      if (isDeleting) {
        if (charIndex > 0) {
          setDisplayedText((prev) => prev.substring(0, prev.length - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      } else {
        if (charIndex < texts[textIndex].length) {
          setDisplayedText((prev) => prev + texts[textIndex].charAt(charIndex));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pause);
        }
      }
    };

    const typingSpeed = isDeleting ? speed / 2 : speed;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, pause, speed, textIndex, texts]);

  return <span>{displayedText}</span>;
};

export default TypingEffect;
