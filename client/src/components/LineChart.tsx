import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("translation");
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
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          name={t<string>("Waste Weight")}
          type="monotone"
          dataKey="wasteWeight"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          name={t<string>("Waste Value")}
          type="monotone"
          dataKey="wasteValue"
          stroke="#82ca9d"
        />
      </Chart>
    </ResponsiveContainer>
  );
};

export default LineChart;
