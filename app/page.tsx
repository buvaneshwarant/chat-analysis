'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

  if (!res.ok) {
    console.error('API error:', res.statusText);
    return;
  }

  try {
    const data = await res.json();
    setResponse(data.result || 'No result returned');
  } catch (error) {
    console.error('Error parsing JSON:', error);
    setResponse('Error: Invalid response from server');
  }

  };

  return (
    <div>
      <h1>OpenAI Integration with Next.js</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
        />
        <button type="submit">Generate</button>
      </form>
      {response && <div><h2>Response:</h2><p>{response}</p></div>}
    </div>
  );
}