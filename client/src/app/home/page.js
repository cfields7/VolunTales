"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import Background from '../components/background';
import Header from '../components/header';

export default function HomePage() {
  return (
    <div>
      <Header />
      <Background />
        <br />
        <br />
        <br />
        <br />
        <div className="max-w-6xl mx-auto space-y-12">
          <h1 className="text-4xl font-bold text-white text-center">Home Page</h1>
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section - Large */}
            <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-center mb-4">Lend a Helping Hand</h2>
              <p className="text-m mb-4 text-center"><i>How Will You Make an Impact Today?</i></p>
              <p className="text-center">
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}