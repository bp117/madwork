import React from 'react';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import AppBar from './AppBar';
interface Props {
    onSignIn: () => void;
  }
const LoginCard: React.FC<Props> = ({ onSignIn }) => {
  return (
    <div className="flex flex-col h-screen">
    <AppBar />
    <div className="flex-1 flex justify-center items-center">
      
      <div className="bg-white p-10 rounded shadow-md w-1/2 h-1/2">
        <h2 className="text-2xl font-bold mb-6">Welcome 👋</h2>
        <form>
          <div className="flex items-center border rounded px-3 py-2 mb-6">
            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input className="flex-1 focus:outline-none" placeholder="AD-ENT ID" id="username" type="text" />
          </div>
          <div className="flex items-center border rounded px-3 py-2 mb-6">
            <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input className="flex-1 focus:outline-none" placeholder="Password" id="password" type="password" />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none w-full" type="button" onClick={onSignIn} >
            Sign In
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default LoginCard;
