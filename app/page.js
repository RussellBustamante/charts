"use client";

import Link from 'next/link';

import { useState } from 'react';
import { Pie, Bubble, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, PointElement, CategoryScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, PointElement, CategoryScale, BarElement);

const dummyPieData = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const dummyBubbleData = {
  datasets: [
    {
      label: 'Knowledge Bubbles',
      data: [
        { x: 10, y: 20, r: 15 },
        { x: 15, y: 10, r: 10 },
        { x: 20, y: 30, r: 20 },
        { x: 25, y: 15, r: 12 },
        { x: 30, y: 25, r: 18 },
      ],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

const dummyListData = [
  { id: 1, title: 'Item 1', description: 'Description for Item 1' },
  { id: 2, title: 'Item 2', description: 'Description for Item 2' },
  { id: 3, title: 'Item 3', description: 'Description for Item 3' },
];

const dummyBarData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

const dummyResourceLinks = [
  { id: 1, title: 'React Documentation', url: 'https://reactjs.org/docs/getting-started.html' },
  { id: 2, title: 'Next.js Documentation', url: 'https://nextjs.org/docs' },
  { id: 3, title: 'Chart.js Documentation', url: 'https://www.chartjs.org/docs/latest/' },
];

const dummyQuotes = [
  { id: 1, link: 'https://example.com/quote1', quote: 'The best way to predict the future is to invent it.' },
  { id: 2, link: 'https://example.com/quote2', quote: 'Innovation distinguishes between a leader and a follower.' },
  { id: 3, link: 'https://example.com/quote3', quote: 'The only way to do great work is to love what you do.' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('pie');

  return (
    <main className="max-w-6xl mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Chart and Data Demo</h1>
      <div className="flex justify-center space-x-4 mb-8">
        <button onClick={() => setActiveTab('pie')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Pie Chart</button>
        <button onClick={() => setActiveTab('bubble')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Knowledge Bubbles</button>
        <button onClick={() => setActiveTab('bar')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Bar Chart</button>
        <button onClick={() => setActiveTab('resources')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Resource Links</button>
        <button onClick={() => setActiveTab('quotes')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Quotes</button>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg mb-8">
        {activeTab === 'pie' && <Pie data={dummyPieData} />}
        {activeTab === 'bubble' && <Bubble data={dummyBubbleData} />}
        {activeTab === 'bar' && <Bar data={dummyBarData} />}
        {activeTab === 'resources' && (
          <ul className="space-y-4">
            {dummyResourceLinks.map((resource) => (
              <li key={resource.id} className="bg-white p-4 rounded shadow">
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{resource.title}</a>
              </li>
            ))}
          </ul>
        )}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            {dummyQuotes.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded shadow">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Source Link</a>
                <blockquote className="mt-2 pl-4 border-l-4 border-gray-300 italic">{item.quote}</blockquote>
              </div>
            ))}
          </div>
        )}
      </div>
      <Link href="/profile" className="text-blue-600 hover:underline">View Profile Page</Link>
    </main>
  );
}