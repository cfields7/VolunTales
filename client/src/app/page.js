"use client";
import { useState, useEffect } from 'react';
import { userService } from './services/userService';

export default function Home() {

  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getUsers().then(users => {
      setUsers(users);
    });
  }, []);

  return (
    <div>
      <p>{JSON.stringify(users)}</p>
    </div>
  );
}
