import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

interface Data {
  name: string;
  wasteValue: number;
  wasteWeight: number;
}
interface Props {
  data: Data[];
}

const ScatterChart: React.FC<Props> = ({ data }) => {
  return (
    <RadarChart
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
      outerRadius={100}
      width={500}
      height={300}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="name" />
      <PolarRadiusAxis />
      <Radar
        name="Waste Weight"
        dataKey="wasteWeight"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />

    </RadarChart>
  );
};

export default ScatterChart;
