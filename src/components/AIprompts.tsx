import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
interface AIPromptsProps {
    onPromptSelected: (message: string) => void;
}
const AIPrompts: React.FC<AIPromptsProps> = ({ onPromptSelected }) => {
    const prompts = [
        "What's the weather today?",
        "Set a reminder for my meeting.",
        "Tell me a joke.",
    ];

    return (
        <div className="space-y-4">
            {prompts.map((prompt, index) => (
                <div key={index}
                onClick={() => onPromptSelected(prompt)} className="flex items-center bg-white p-2 rounded-lg shadow-lg space-x-2">
                    <QuestionMarkCircleIcon className="h-6 w-6" />
                    <span>{prompt}</span>
                </div>
            ))}
        </div>
    );
}

export default AIPrompts;
