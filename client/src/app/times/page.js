"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
        console.log(data);
        setTimeData(data);
      } catch (error) {
        console.error("Error fetching time data:", error);
      }
    }
    fetchTimeData();
  }, []);


  const formatDateTime = (dateTimeStr) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateTimeStr);
    return date.toLocaleString(undefined, options);
  };

  return (
    <div>
      <Header />
      <Background />
      <br />
      <br />
      <br />
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
        Volunteer Your Time!
        </h1>
        {timeData.length === 0 ? (
          <p className="text-white text-center">No time posts available.</p>
        ) : (
          timeData.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg text-white mb-6"
            >
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="mb-4">{post.body}</p>
              {post.timeSlots && post.timeSlots.length > 0 && (
                <div className="mb-4">
                  {post.timeSlots.map((slot, i) => (
                    <div key={i} className="flex items-center mb-1">
                      <span className="font-bold">Start:</span>
                      <span className="ml-2">{formatDateTime(slot.start)}</span>
                      <span className="font-bold ml-4">End:</span>
                      <span className="ml-2">{formatDateTime(slot.end)}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex space-x-4">
                {post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Visit Link
                  </a>
                )}
                <Link href={`/times/${post.id}`} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md">
                    View Full Post
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
