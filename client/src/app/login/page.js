"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

export default function PostPage() {
  const router = useRouter();
    const [responseGet, setResponseGet] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    
      // Check if all required fields are filled
      useEffect(() => {
        setIsFormValid(username && password);
      }, [username, password]);
    


  const handleSubmit = () => {
    if (username && password) {

      userService.loginUser(username, password).then(users => { // change to look for success
        setResponseGet("Post Success");
        router.push('/volunteer'); // change later
      });
      
    }
  };

  return (
    <div>
    
  <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 p-8">
       <br />
       <br />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white-800 mb-8">Login</h1>
        
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-lg shadow-md p-6 space-y-6">
          <div className="space-y-4">

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-white-900 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900 focus:border-blue-500 bg-indigo-950"
                placeholder="Enter username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white-900 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900 focus:border-blue-500 bg-indigo-950"
                placeholder="Enter password"
              />
            </div>
          </div>
            
        {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-4 py-2 rounded-md bg-red-600 text-white-600 hover:bg-red-90"
            >
              Cancel
            </button>
            {!responseGet &&     <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={!isFormValid}
              className={`px-4 py-2 rounded-md transition-colors ${
                isFormValid ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }`}
            >
              Login
            </button>}
            <label className="block text-sm font-medium text-red-700 mb-1">{responseGet}</label>
          </div>
        </form>
      </div>
    </div>   
    </div>
  );
}