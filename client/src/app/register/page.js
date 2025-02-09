"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import Background from '../components/background';
import LoginPage from '../login/page';

export default function PostPage() {
  const router = useRouter();
  const [responseGet, setResponseGet] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Check if all required fields are filled
  useEffect(() => {
    setIsFormValid(lastName && firstName && username && password);
  }, [lastName, firstName, username, password]);

  const handleSubmit = () => {
    if (isFormValid) {

      userService.addUser(firstName, lastName, username, password, email).then(response => {
        if (response.ok) {
          setResponseGet("Post Success");
          if (username && password) {
            userService.loginUser(username, password).then(response => {
              if (response.ok) {
                setResponseGet("Post Success");
                localStorage.setItem("token", response.token);
                router.push('/home'); 
              } else {
                alert("Invalid Credentials")
              }
            });
          }
        } else {
          alert("Error: Username Already Exists.");
        }
      });
      

    }
  };

  return (
    <div>
        <Background />
      <br />
      <br />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Register A New Account</h1>

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-lg shadow-md p-6 space-y-6">
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-900 focus:border-red-500 bg-indigo-950 text-white"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900 focus:border-blue-500 bg-indigo-950 text-white"
                placeholder="Enter last name"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900 focus:border-blue-500 bg-indigo-950 text-white"
                placeholder="Enter username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900 focus:border-blue-500 bg-indigo-950 text-white"
                placeholder="Enter password"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email Address <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900 focus:border-blue-500 bg-indigo-950 text-white"
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-90"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={!isFormValid}
              className={`px-4 py-2 rounded-md transition-colors ${
                isFormValid ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }`}
            >
              Create User
            </button>
          </div>
          <label className="block text-sm font-medium text-red-700 mb-1">{responseGet}</label>
        </form>
      </div>
    </div>
  );
}
