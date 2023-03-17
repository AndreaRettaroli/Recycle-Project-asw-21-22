import React, { FC } from "react";
import Example from "../components/LineChart";
import Example1 from "../components/CustomActiveShapePieChart";
import AreaCart from "../components/StackedAreaChart";
import Card from "../components/UI/Card";
import Navbar from "../components/UI/Navbar";

const Statistics: FC = () => {
  return (
    <>
      <Navbar title="Statistics" />
      <div className="w-full flex-container">
        <div className="w-5/6 grid-container gap-8">
          <Card>
            <div className="chart-container flex items-center">
              <div className="w-3/6 text-center">
                <h2 className="text-2xl font-bold">Earned</h2>
                <b className="text-3xl text-green">1000$</b>
              </div>
              <div className="w-3/6 text-center ">
                <h2 className="text-2xl font-bold">Recycled</h2>
                <b className="text-3xl text-green">500 Kg</b>
              </div>
            </div>
          </Card>
          <Card>
            <div className="chart-container">
              <Example />
            </div>
          </Card>
          <Card>
            <div className="chart-container">
              <AreaCart />
            </div>
          </Card>
          <Card>
            <div className="chart-container">
              <Example1 />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Statistics;
