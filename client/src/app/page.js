"use client";
import { useState, useEffect } from 'react';
import { userService } from './services/userService';
import { useRouter } from 'next/navigation';
import Header from './components/header';
import Background from './components/background';
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
      <Background />
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
        className="w-full bg-gradient-to-b from-indigo-200 to-indigo-300 text-black p-6 rounded-lg shadow-lg flex items-center justify-center space-x-3 hover:from-indigo-300 hover:to-indigo-400 transition-all"
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
        className="w-full bg-gradient-to-b from-indigo-300 to-indigo-400 text-black p-6 rounded-lg shadow-lg flex items-center justify-center space-x-3 hover:from-indigo-400 hover:to-indigo-500 transition-all"
        onClick={() => handleRegister()}
      >
        <UserPlus className="w-6 h-6" />
        <span className="text-lg font-semibold">Register</span>
      </motion.button>

      </motion.div>
      </div>
      
    // </div>
  );
}
