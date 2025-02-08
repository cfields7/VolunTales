"use client";
import { useRouter } from 'next/navigation';
import {useState} from  'react';
import { userService } from '../services/userService';

export default function PostPage() {
  const router = useRouter();
    const [responseGet, setResponseGet] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

  const handleSubmit = () => {
    if (lastName && firstName) {
        userService.addUser(lastName, firstName);
        setResponseGet("Post Success")
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New User</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">First Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter first name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Last Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            {!responseGet && <button
              type="button"
              onClick={() => handleSubmit()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Create User
            </button>}
            <label className="block text-sm font-medium text-red-700 mb-1">{responseGet}</label>
          </div>
        </form>
      </div>
    </div>
  );
}