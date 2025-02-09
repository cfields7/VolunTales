"use client";
import Header from '../components/header';
import { useState } from 'react';
import Background from '../components/background';

export default function RequestAid() {
  const [selectedAidType, setSelectedAidType] = useState(null);
  const [timeSlots, setTimeSlots] = useState(['']);
  const [items, setItems] = useState(['']);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // do post to server
    console.log(data); //test
  };

  const addTimeSlot = () => setTimeSlots([...timeSlots, '']);
  const addItem = () => setItems([...items, '']);

  return (
    <div>
      <Header />
      <Background />
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 p-8">
        <br />
        <br />
        <br />
        <div className="max-w-6xl mx-auto space-y-12">
          <h1 className="text-4xl font-bold text-white text-center">Request Assistance</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left Section */}
            <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg">
              <p className="text-lg mb-4 text-center">What type of assistance do you need?</p>
              <h2 className="text-2xl font-semibold text-center mb-4">We're Here to Help</h2>
              <p className="text-center">
                Let us know what kind of support you require and we'll help connect you with volunteers.
                <br />
                Select an assistance type to get started.
              </p>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              {/* Aid Type Selection */}
              <div className="space-y-6">
                <button
                  onClick={() => setSelectedAidType('time')}
                  className="w-full bg-gray-700 p-6 rounded-xl shadow-lg text-white hover:bg-gray-600 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex justify-center items-center text-lg">🕒</div>
                    <div>
                      <h3 className="text-xl font-semibold">Request Time Assistance</h3>
                      <p className="text-sm">Need volunteers for specific time slots</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedAidType('money')}
                  className="w-full bg-gray-700 p-6 rounded-xl shadow-lg text-white hover:bg-gray-600 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex justify-center items-center text-lg">💵</div>
                    <div>
                      <h3 className="text-xl font-semibold">Request Financial Assistance</h3>
                      <p className="text-sm">Set up a financial goal for your needs</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedAidType('items')}
                  className="w-full bg-gray-700 p-6 rounded-xl shadow-lg text-white hover:bg-gray-600 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex justify-center items-center text-lg">📦</div>
                    <div>
                      <h3 className="text-xl font-semibold">Request Items</h3>
                      <p className="text-sm">List specific items you need donated</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Request Form */}
              {selectedAidType && (
                <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
                  <div>
                    <label className="block text-white mb-2">Request Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full bg-gray-700 text-white p-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Description</label>
                    <textarea
                      name="body"
                      required
                      className="w-full bg-gray-700 text-white p-2 rounded h-32"
                    />
                  </div>

                  {selectedAidType === 'time' && (
                    <div>
                      <label className="block text-white mb-2">Time Slots Needed</label>
                      {timeSlots.map((_, index) => (
                        <input
                          key={index}
                          type="datetime-local"
                          name={`timeSlot-${index}`}
                          required
                          className="w-full bg-gray-700 text-white p-2 rounded mb-2"
                        />
                      ))}
                      <button
                        type="button"
                        onClick={addTimeSlot}
                        className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
                      >
                        Add Another Time Slot
                      </button>
                    </div>
                  )}

                  {selectedAidType === 'money' && (
                    <div>
                      <label className="block text-white mb-2">Financial Goal ($)</label>
                      <input
                        type="number"
                        name="goal"
                        required
                        className="w-full bg-gray-700 text-white p-2 rounded"
                      />
                    </div>
                  )}

                  {selectedAidType === 'items' && (
                    <div>
                      <label className="block text-white mb-2">Items Needed</label>
                      {items.map((_, index) => (
                        <input
                          key={index}
                          type="text"
                          name={`item-${index}`}
                          required
                          className="w-full bg-gray-700 text-white p-2 rounded mb-2"
                          placeholder="Item name and description"
                        />
                      ))}
                      <button
                        type="button"
                        onClick={addItem}
                        className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
                      >
                        Add Another Item
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}