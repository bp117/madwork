import React from 'react';
import { PlusIcon, UserCircleIcon, CogIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';


interface Props {
    onClose: () => void;
}

const AISidebar: React.FC<Props> = ({ onClose }) => {
    return (
        <div className="bg-purple-100 w-60 p-4 h-full flex flex-col">
            <button className="bg-black text-white flex items-center justify-center mb-4 p-1 rounded-full w-40" onClick={onClose}>
                <PlusIcon className="h-4 w-4 mr-1" />
                New Chat
            </button>

            <h2 className="font-bold mb-2">Today</h2>
            {/* List out today's conversations */}
            <div className="mb-4">
                {/* Sample conversation */}
                <p className="mb-2">Sample Conversation 1</p>
                <p className="mb-2">Sample Conversation 2</p>
            </div>

            <hr className="mb-4" />

            <h2 className="font-bold mb-2">Previous 7 Days</h2>
            {/* List out conversations from the past 7 days */}
            <div className="mb-4">
                {/* Sample past conversation */}
                <p className="mb-2">Past Conversation 1</p>
                <p className="mb-2">Past Conversation 2</p>
            </div>

            <div className="mt-auto p-4 bg-white shadow-lg rounded">
    <div className="flex justify-between items-center">
        <div className="flex items-center">
            <UserCircleIcon className="h-12 w-12 mr-4" />
            <p className="font-bold">John</p>
        </div>
        <EllipsisHorizontalIcon className="h-6 w-6" />
    </div>
    
    <div className="mt-4 flex items-center justify-center">
        <button className="bg-slate-100 flex items-center space-x-2 text-gray-600 rounded-full hover:text-black">
            <CogIcon className="h-6 w-6" />
            <span>Settings</span>
            <ChevronRightIcon className="h-5 w-5" />
        </button>
    </div>
</div>

  </div>
    );
}

export default AISidebar;
