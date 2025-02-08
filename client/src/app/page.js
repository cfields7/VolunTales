"use client";
import { useState, useEffect } from 'react';
const userService = require('./request');


export default function Home() {
  const [responseGet, setResponseGet] = useState(null);
  const [responsePost, setResponsePost] = useState(null);

  useEffect(() => {
    setResponseGet(userService.fetchData());
  }, []);

  return (
    <div>
      <h1>GET Response</h1>
      <pre>{JSON.stringify(responseGet, 2)}</pre>

      <h1>POST Response</h1>
      <pre>{JSON.stringify(responsePost, 2)}</pre>
    </div>
  );
}
