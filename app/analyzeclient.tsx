//'use client';
import { useState } from 'react';

export default function AnalyzePage() {
  const [chatData, setChatData] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatData, userId: 'example_user' }),
    });


    if (!res.ok) {
      console.error('API error:', res.statusText);
      return;
    }

    try {
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }

  }

  return (
    <div>
      <h1>Upload Chat for Analysis</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={chatData}
          onChange={(e) => setChatData(e.target.value)}
          placeholder="Paste your chat text..."
        />
        <button type="submit">Analyze</button>
      </form>
    </div>
  );
}