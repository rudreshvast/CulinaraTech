'use client';

import { useState, useEffect } from 'react';

const roles = [
  'Food Technologists',
  'QA Engineers',
  'Dairy Scientists',
  'R&D Professionals',
  'Plant Managers',
  'Spice Exporters',
];

export function HeroTypingTag() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1500);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
      } else {
        timeout = setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setIsTyping(true);
        }, 0);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, roleIndex, isTyping]);

  return (
    <div className="text-gray-400 text-sm md:text-base">
      The platform for{' '}
      <span className="text-green-400 font-medium">
        {displayText}
        <span className={`ml-1 ${isTyping ? 'animate-pulse' : 'hidden'}`}>|</span>
      </span>
    </div>
  );
}
