"use client";

import { useEffect, useState } from "react";
import { volunteerService } from "../services/volunteerService";
import Header from "../components/header";
import Background from "../components/background";

export default function TimeAssistancePage() {
  const [timeData, setTimeData] = useState([]);

  useEffect(() => {
    async function fetchTimeData() {
      try {
        const res = await volunteerService.getTime();
        const data = await res.json();
        setTimeData(data);
      } catch (error) {
        console.error("Error fetching time data:", error);
      }
    }
    fetchTimeData();
  }, []);

  return (
    <div>
      <Header />
      <Background />
      <br />
      <br />
      <br />
      <div className="max-w-6xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Time Assistance Posts
        </h1>
        {timeData.length === 0 ? (
          <p className="text-white text-center">No time posts available.</p>
        ) : (
          timeData.map((post, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg text-white mb-4"
            >
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p>{post.body}</p>
              {post.timeSlots &&
                post.timeSlots.map((slot, i) => (
                  <div key={i} className="mt-2">
                    <span className="font-bold">Start:</span> {slot.start}{" "}
                    <span className="font-bold">End:</span> {slot.end}
                  </div>
                ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
