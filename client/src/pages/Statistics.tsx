import React, { FC, useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import DoughnutChart from "../components/CustomActiveShapePieChart";
import AreaChart from "../components/StackedAreaChart";
import Card from "../components/UI/Card";
import Navbar from "../components/UI/Navbar";
import { Acquisition } from "../types/Acquisition";
import { Withdrawal } from "../types/Withdrawal";
import useUserSession from "../hooks/useUserSession";
import { useDispatch } from "react-redux";
import Loading from "../components/UI/Loading";
import Api from "../api/Api";
import { BasketTypes } from "../types/Basket";

const Statistics: FC = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, loggedUser } = useUserSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [acquisitionsList, setAcquisitionsList] = useState<Acquisition[]>([]);
  const [withdrawalsList, setWithdrawalsList] = useState<Withdrawal[]>([]);
  const [doughnutData, setDoughnutData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [areaData, setAreaData] = useState([]);

  const generateAreaData = (data: any[]) => {
    const calculatedData = data.map((item) => {
      return {
        name: item?.basketType,
        wasteValue: item?.wasteValue,
        wasteWaight: item?.wasteWeight,
      };
    });
    setAreaData([...calculatedData]);
  };

  const generateLineData = (data: any[]) => {
    console.log(
      "🚀 ~ file: Statistics.tsx:25 ~ generateLineData ~ data:",
      data
    );
    let defaultData = [
      { name: BasketTypes.GLASS, wasteValue: 0, wasteWaight: 0 },
      { name: BasketTypes.ORGANIC, wasteValue: 0, wasteWaight: 0 },
      { name: BasketTypes.MIXED, wasteValue: 0, wasteWaight: 0 },
      { name: BasketTypes.METALS, wasteValue: 0, wasteWaight: 0 },
      { name: BasketTypes.PLASTIC, wasteValue: 0, wasteWaight: 0 },
      { name: BasketTypes.PAPER, wasteValue: 0, wasteWaight: 0 },
    ];

    const calculatedData = defaultData
      .map((item) => item.name)
      .map((name) => {
        return {
          name: name,
          wasteValue: data
            .filter((item) => item?.basketType === name)
            .map((item) => item?.wasteValue)
            .reduce((partialSum, value) => partialSum + value, 0),
          wasteWeight: data
            .filter((item) => item?.basketType === name)
            .map((item) => item?.wasteWeight)
            .reduce((partialSum, value) => partialSum + value, 0),
        };
      });
    console.log(
      "🚀 ~ file: Statistics.tsx:37 ~ generateDoughnutData ~ d:",
      calculatedData
    );
    setLineData([...calculatedData]);
  };

  const generateDoughnutData = (data: any[]) => {
    console.log(
      "🚀 ~ file: Statistics.tsx:26 ~ generateDoughnutData ~ data:",
      data
    );
    let defaultData = [
      { name: BasketTypes.GLASS, value: 0 },
      { name: BasketTypes.ORGANIC, value: 0 },
      { name: BasketTypes.MIXED, value: 0 },
      { name: BasketTypes.METALS, value: 0 },
      { name: BasketTypes.PLASTIC, value: 0 },
      { name: BasketTypes.PAPER, value: 0 },
    ];

    const calculatedData = defaultData
      .map((item) => item.name)
      .map((name) => {
        return {
          name: name,
          value: data
            .filter((item) => item?.basketType === name)
            .map((item) => item?.wasteValue)
            .reduce((partialSum, value) => partialSum + value, 0),
        };
      });
    console.log(
      "🚀 ~ file: Statistics.tsx:37 ~ generateDoughnutData ~ d:",
      calculatedData
    );
    setDoughnutData([...calculatedData]);
  };

  const getData = async () => {
    try {
      const params = {
        userId: loggedUser.userId,
      };
      const res = await Promise.all([
        Api.get("/api/withdrawals", { params: params }),
        Api.get("/api/acquisitions", { params: params }),
      ]);
      if (res[0].status === 200 && res[1].status === 200) {
        setWithdrawalsList(res[0].data);
        setAcquisitionsList(res[1].data);
        generateDoughnutData(res[0].data);
        generateLineData(res[0].data);
        generateAreaData(res[0].data);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("🚀 ~ file: Statistics.tsx:29 ~ getData ~ err:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getData();
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar title="Statistics" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full flex-container">
          <div className="w-5/6 grid-container gap-8">
            <Card>
              <div className="chart-container flex items-center">
                <div className="w-3/6 text-center">
                  <h2 className="text-2xl font-bold">Earned</h2>
                  <b className="text-3xl text-green">
                    {withdrawalsList
                      .map((item) => item?.wasteValue)
                      .reduce((partialSum, value) => partialSum + value, 0)
                      .toFixed(2)}
                    $
                  </b>
                </div>
                <div className="w-3/6 text-center ">
                  <h2 className="text-2xl font-bold">Recycled</h2>
                  <b className="text-3xl text-green">
                    {withdrawalsList
                      .map((item) => item?.wasteWeight)
                      .reduce((partialSum, value) => partialSum + value, 0)
                      .toFixed(2)}
                    Kg
                  </b>
                </div>
              </div>
            </Card>
            <Card>
              <div className="chart-container">
                <LineChart data={lineData} />
              </div>
            </Card>
            <Card>
              <div className="chart-container">
                <AreaChart data={areaData} />
              </div>
            </Card>
            <Card>
              <div className="chart-container">
                <DoughnutChart data={doughnutData} />
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Statistics;
