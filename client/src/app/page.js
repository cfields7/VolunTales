"use client";
import { useState, useEffect } from 'react';
import { userService } from './services/userService';
import { useRouter } from 'next/navigation';
import Header from './components/header';
import { User, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState(null);

  const doLogin = async () => {
    router.push('/login');
  };

  useEffect(() => {
    userService.getUsers().then(users => {
      setUsers(users);
    });
  }, []);

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <div> 
      {/* <Header /> */}
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 p-8">
         <br />
         <br />
         <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
        >

        {/* Logo */}
        <div className="flex justify-center items-center mt-20 mb-8">
          <img 
            src="/logo.png" 
            alt="App Logo" 
            className="h-41 object-contain py-8"
          />
        </div>

        <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-gradient-to-b from-purple-500 to-purple-800 text-white p-6 rounded-lg shadow-lg flex items-center justify-center space-x-3 hover:from-purple-600 hover:to-purple-900 transition-all"
        onClick={() => {
            doLogin();
          }}
      >
        <User className="w-6 h-6" />
        <span className="text-lg font-semibold">Login</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-gradient-to-b from-green-500 to-green-800 text-white p-6 rounded-lg shadow-lg flex items-center justify-center space-x-3 hover:from-green-600 hover:to-green-800 transition-all"
        onClick={() => handleRegister()}
      >
        <UserPlus className="w-6 h-6" />
        <span className="text-lg font-semibold">Register</span>
      </motion.button>

      </motion.div>
      </div>
    </div>
  );
}
