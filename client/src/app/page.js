"use client";
import { useState, useEffect } from 'react';
import { userService } from './services/userService';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState(null);

  const doGet = async () => {
    userService.getUsers().then(users => {
      setUsers(users);
    });
  };

  useEffect(() => {
    userService.getUsers().then(users => {
      setUsers(users);
    });
  }, []);

  const handlePost = () => {
    router.push('/post');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">API Tester</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">GET Request</h2>
            <button
              onClick={doGet}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Fetch Data
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <pre className="overflow-auto max-h-96 text-sm text-gray-600">
              {JSON.stringify(users)}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">POST Request/Routing Test</h2>
            <button
              onClick={handlePost}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Go to Post Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
