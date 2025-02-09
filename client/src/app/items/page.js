"use client";

import { useEffect, useState } from "react";
import { volunteerService } from "../services/volunteerService";
import Header from "../components/header";
import Background from "../components/background";

export default function ItemsAssistancePage() {
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    async function fetchItemsData() {
      try {
        const res = await volunteerService.getItems();
        const data = await res.json();
        setItemsData(data);
      } catch (error) {
        console.error("Error fetching items data:", error);
      }
    }
    fetchItemsData();
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
          Items Assistance Posts
        </h1>
        {itemsData.length === 0 ? (
          <p className="text-white text-center">No items posts available.</p>
        ) : (
          itemsData.map((post, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg text-white mb-4"
            >
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p>{post.body}</p>
              {post.items &&
                post.items.map((item, i) => (
                  <div key={i} className="mt-2">
                    <span className="font-bold">Item:</span> {item.name}{" "}
                    <span className="font-bold">Quantity:</span> {item.quantity}
                  </div>
                ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
