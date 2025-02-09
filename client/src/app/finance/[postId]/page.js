"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // For Next.js 13 App Router; if using the Pages Router, use useRouter from 'next/router'
import Header from "../../components/header";
import Background from "../../components/background";
import { volunteerService } from "../../services/volunteerService";

export default function FullPostPage() {
  // Get the postId from the URL.
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await volunteerService.getPostById(postId);
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
    fetchPost();
  }, [postId]);

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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Background />
      <br />
      <br />
      <br />
      <div className="max-w-4xl mx-auto py-12 text-white">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        <p className="mb-6">{post.body}</p>
        {post.timeSlots && post.timeSlots.length > 0 && (
          <div className="mb-6">
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
      </div>
    </div>
  );
}
