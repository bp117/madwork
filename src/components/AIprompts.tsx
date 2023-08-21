// AIprompts.tsx

import React from 'react';
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

interface AIPromptsProps {
   theme: 'dark' | 'light',
  onPromptSelected: (promptText: string) => void;

}

const AIPrompts: React.FC<AIPromptsProps> = ({ theme, onPromptSelected }) => {
   
  const prompts = [
    { text: "Prompt 1" },
    { text: "Prompt 2" },
    { text: "Prompt 3" },
    { text: "Prompt 4" }
  ];

  return (
    <div className={`grid grid-cols-2 gap-4 w-full ${theme === 'dark' ? 'bg-darkBackground text-white' : 'bg-lightBackground text-black'}`}>
      {prompts.map((prompt, idx) => (
        <button
          key={idx}
          className={`${theme === 'dark' ? 'bg-greyBackground text-white' : 'bg-lightBackground text-black'} rounded h-32 flex flex-row items-center justify-center space-x-2 shadow-2xl`}
          onClick={() => onPromptSelected(prompt.text)}
        >
          <span>{prompt.text}</span>
          <PaperAirplaneIcon className="h-6 w-6 text-blue-500" />
        </button>
      ))}
    </div>
  );
};

export default AIPrompts;
