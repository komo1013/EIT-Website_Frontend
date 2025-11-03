"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace the URL with your real API endpoint if needed
    fetch("https://api.eit-hka.de/auth/login")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Error loading data.</div>;

  return (
    <div>
      <h1>Frontend Dining Room</h1>
      {data?.message && <h2>{data.message}</h2>}
      {Array.isArray(data?.items) ? (
        <ul>
          {data.items.map((item: any, i: number) => (
            <li key={i}>{String(item)}</li>
          ))}
        </ul>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
