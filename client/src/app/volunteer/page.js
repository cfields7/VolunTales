"use client";
import Header from '../components/header';
import Link from 'next/link';
import Background from '../components/background';

export default function Volunteer() {
  return (
    <div>
      <Header />
      <Background />
        <br />
        <br />
        <br />
        <br />
        <div className="max-w-6xl mx-auto space-y-12">
          <h1 className="text-4xl font-bold text-white text-center">Welcome Volunteers!</h1>
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section - Large */}
            <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg">
              <p className="text-lg mb-4 text-center">How would you like to volunteer?</p>
              <h2 className="text-2xl font-semibold text-center mb-4">Everything Helps!</h2>
              <p className="text-center">
                No matter what your volunteering experience, skillset, or availability, WebsiteName can help you help others!
                <br />
                Choose one of the options on the right to get started.
              </p>
            </div>

            {/* Right Section - Stacked smaller boxes */}
            <div className="space-y-6">
              {/* Volunteer Time Option */}
              <Link
                href="/times"
                className="block bg-gray-700 p-6 rounded-xl shadow-lg text-white hover:bg-gray-600 transition-all"
              >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex justify-center items-center text-lg">🕒</div>
                    <div>
                      <h3 className="text-xl font-semibold">Volunteer Your Time</h3>
                      <p className="text-sm">Whether you want to (or not?)</p>
                    </div>
                  </div>
              </Link>

              {/* Financial Aid Option */}
              <Link
  href="/finance"
  className="block bg-gray-700 p-6 rounded-xl shadow-lg text-white hover:bg-gray-600 transition-all"
>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex justify-center items-center text-lg">💵</div>
                    <div>
                      <h3 className="text-xl font-semibold">Provide Financial Aid</h3>
                      <p className="text-sm">Donate money to the group or organization of your choice.</p>
                    </div>
                  </div>
               
              </Link>

              {/* Goods Donation Option */}
              <Link
  href="/items"
  className="block bg-gray-700 p-6 rounded-xl shadow-lg text-white hover:bg-gray-600 transition-all"
>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex justify-center items-center text-lg">📦</div>
                    <div>
                      <h3 className="text-xl font-semibold">Donate Goods</h3>
                      <p className="text-sm">Search for specific items (dry goods, clothing, etc.) needed in your location.</p>
                    </div>
                  </div>
              
              </Link>
            </div>
          </div>
        </div>
      </div>

  );
}
