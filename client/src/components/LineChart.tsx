import React, { PureComponent } from "react";
import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

const LineChart: React.FC<Props> = ({ data }) => {
  console.log("🚀 ~ file: LineChart.tsx:68 ~ data:", data);
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
        <Legend />
        <Line
          name="Waste Weight"
          type="monotone"
          dataKey="wasteWeight"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          name="Waste Value"
          type="monotone"
          dataKey="wasteValue"
          stroke="#82ca9d"
        />
      </Chart>
    </ResponsiveContainer>
  );
};

export default LineChart;
