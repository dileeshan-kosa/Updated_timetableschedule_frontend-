import React from "react";

import {
  BsFillArchiveFill,
  BsFillBellFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const LectureDesignUiux = () => {
  return (
    <div className="p-5 text-white">
      <h3 className="text-2xl mb-6">DASHBOARD</h3>

      <div className="grid grid-cols-4 gap-5 mb-8">
        <div className="flex flex-col justify-around p-3 rounded bg-blue-600 w-72">
          <div className="flex items-center justify-between">
            <h3>LECTURES</h3>
            <BsFillArchiveFill className="text-xl" />
          </div>
          <h1>100</h1>
        </div>

        <div className="flex flex-col justify-around p-3 rounded bg-orange-600">
          <div className="flex items-center justify-between">
            <h3>DEGREES</h3>
            <BsFillGrid3X3GapFill className="text-xl" />
          </div>
          <h1>20</h1>
        </div>

        <div className="flex flex-col justify-around p-3 rounded bg-green-700">
          <div className="flex items-center justify-between">
            <h3>STUDENTS</h3>
            <BsPeopleFill className="text-xl" />
          </div>
          <h1>1000</h1>
        </div>

        <div className="flex flex-col justify-around p-3 rounded bg-red-600">
          <div className="flex items-center justify-between">
            <h3>ALERTS</h3>
            <BsFillBellFill className="text-xl" />
          </div>
          <h1>2</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LectureDesignUiux;
