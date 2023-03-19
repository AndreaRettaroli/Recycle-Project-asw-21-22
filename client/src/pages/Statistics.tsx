import React, { FC, useEffect, useState } from "react";
import Example from "../components/LineChart";
import DoughnutChart from "../components/CustomActiveShapePieChart";
import AreaCart from "../components/StackedAreaChart";
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

    const filteredDate = data.filter(
      (item) => item?.wasteType === BasketTypes.PLASTIC
    );
    const mapped = filteredDate.map((item) => item?.basketType);
    const reduced = mapped.reduce((partialSum, value) => partialSum + value, 0);
    console.log(
      "🚀 ~ file: Statistics.tsx:38 ~ generateDoughnutData ~ filteredDate:",
      filteredDate,
      mapped,
      reduced
    );

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
