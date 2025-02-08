"use client";
import { useEffect } from "react";

// API Base
const API_BASE_URL = 'https://cfhc.fly.dev/api';

const responsepost = await fetch(`${API_BASE_URL}/users/search`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', 
  },
  // body: JSON.stringify(imageObject),
});

useEffect(() => {
  const fetchData = async () => {
    const responseget = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
      },
    });

    fetchData();

    }}, []);


const getData = await responseGet.json();
      setResponseGet(getData);



export default function Home() {
  return (
    <div>
    {JSON.stringify(getData)}
    </div>
  );
}
