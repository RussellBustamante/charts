"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label, Sector } from 'recharts';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartJSTooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartJSTooltip, Legend);

const pieChartData = [
  { name: 'Ecosystems', value: 30 },
  { name: 'Climate Change', value: 25 },
  { name: 'Pollution', value: 20 },
  { name: 'Resource Management', value: 25 },
];

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

const dummyBarData = {
  labels: ['Quiz 1', 'Quiz 2', 'Midterm', 'Project', 'Final'],
  datasets: [
    {
      label: 'Scores',
      data: [85, 90, 78, 95, 88],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

const strengths = [
  "Excellent understanding of ecosystems",
  "Strong analytical skills",
  "Great at conducting experiments",
  "Effective communicator"
];

const weaknesses = [
  "Struggles with climate models",
  "Needs improvement in data visualization",
  "Could enhance knowledge of environmental policies"
];

const resourceLinks = [
  { 
    id: 1, 
    title: 'Introduction to Climate Models', 
    url: 'https://example.com/climate-models',
    quote: "Climate models are mathematical representations of the Earth's climate system."
  },
  { 
    id: 2, 
    title: 'Data Visualization Techniques', 
    url: 'https://example.com/data-viz',
    quote: "Effective data visualization can transform complex data into intuitive and actionable insights."
  },
  { 
    id: 3, 
    title: 'Environmental Policy Overview', 
    url: 'https://example.com/env-policy',
    quote: "Environmental policies are the commitments, goals, and guidelines that address human impacts on the environment."
  },
];

const renderActiveShape = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-midAngle * Math.PI / 180);
  const cos = Math.cos(-midAngle * Math.PI / 180);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function Profile() {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
      <Link href="/" className="inline-block mb-4 text-blue-600 font-bold hover:underline">← Back to Home</Link>
      <div className="flex items-center mb-8">
        <div className="w-36 h-36 rounded-full overflow-hidden shadow-md mr-8">
          <img src="/placeholder-profile.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-blue-600">John Doe</h1>
          <h2 className="text-2xl text-yellow-500">AP Environmental Science</h2>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-green-500 border-b-2 border-gray-200 pb-2 mb-4">Strengths</h3>
            <ul className="list-disc pl-5">
              {strengths.map((strength, index) => (
                <li key={index} className="mb-2">{strength}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-red-500 border-b-2 border-gray-200 pb-2 mb-4">Areas for Improvement</h3>
            <ul className="list-disc pl-5">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="mb-2">{weakness}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-2 flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold text-blue-600 border-b-2 border-gray-200 pb-2 mb-4">Topic Proficiency</h3>
            <div className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-blue-600 border-b-2 border-gray-200 pb-2 mb-4">Performance Overview</h3>
            <div className="h-64">
              <Bar data={dummyBarData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-blue-600 border-b-2 border-gray-200 pb-2 mb-4">Recommended Resources</h3>
        <ul className="space-y-4">
          {resourceLinks.map((resource) => (
            <li key={resource.id} className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-blue-600 hover:underline">{resource.title}</a>
              <blockquote className="mt-2 pl-4 border-l-4 border-yellow-500 italic text-gray-600">{resource.quote}</blockquote>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}