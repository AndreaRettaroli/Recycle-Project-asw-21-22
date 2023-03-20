import React from "react";
import {
  AreaChart as Chart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Data {
  name: string;
  wasteValue: number;
  wasteWeight: number;
}
interface Props {
  data: Data[];
}
const AreaChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart
        width={1000}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="wasteWeight"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="wasteValue"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        {/* <Area
          type="monotone"
          dataKey="wasteWeight"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        /> */}
      </Chart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
