import React, { FC, useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import DoughnutChart from "../components/CustomActiveShapePieChart";
import Card from "../components/UI/Card";
import Navbar from "../components/UI/Navbar";
import { Acquisition } from "../types/Acquisition";
import { Withdrawal } from "../types/Withdrawal";
import useUserSession from "../hooks/useUserSession";
import Loading from "../components/UI/Loading";
import Api from "../api/Api";
import { BasketTypes } from "../types/Basket";
import CustomShapeBarChart from "../components/CustomShapeBarChart";
import { useTranslation } from "react-i18next";

interface BarData {
  name: BasketTypes;
  acquisitionsNumber: number;
}
interface LineData {
  name: BasketTypes;
  wasteValue: number;
  wasteWeight: number;
}

interface DoughnutData {
  name: BasketTypes;
  value: number;
}

const Statistics: FC = () => {
  const { t } = useTranslation("translation");
  const { isLoggedIn, loggedUser } = useUserSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [acquisitionsList, setAcquisitionsList] = useState<Acquisition[]>([]);
  const [withdrawalsList, setWithdrawalsList] = useState<Withdrawal[]>([]);
  const [doughnutData, setDoughnutData] = useState<DoughnutData[]>([]);
  const [lineData, setLineData] = useState<LineData[]>([]);
  const [barData, setBarData] = useState<BarData[]>([]);

  const generateBarData = (data: any[]) => {
    let defaultData = [
      { name: BasketTypes.GLASS, acquisitionsNumber: 0 },
      { name: BasketTypes.ORGANIC, acquisitionsNumber: 0 },
      { name: BasketTypes.MIXED, acquisitionsNumber: 0 },
      { name: BasketTypes.METALS, acquisitionsNumber: 0 },
      { name: BasketTypes.PLASTIC, acquisitionsNumber: 0 },
      { name: BasketTypes.PAPER, acquisitionsNumber: 0 },
    ];
    const calculatedData = defaultData
      .map((item) => item.name)
      .map((name) => {
        return {
          name: name,
          acquisitionsNumber: data.filter((item) => item?.wasteType === name)
            .length,
        };
      });
    setBarData([...calculatedData]);
  };

  const generateLineData = (data: any[]) => {
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

    setLineData([...calculatedData]);
  };

  const generateDoughnutData = (data: any[]) => {
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
        generateBarData(res[1].data);
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
      <Navbar title={t("Statistics")} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full flex-container">
          <div className="w-5/6 grid-container gap-8">
            <Card>
              <div className="chart-container flex items-center">
                <div className="w-3/6 text-center">
                  <h2 className="text-2xl font-bold">{t("Earned")}</h2>
                  <b className="text-3xl text-green">
                    {withdrawalsList
                      .map((item) => item?.wasteValue)
                      .reduce((partialSum, value) => partialSum + value, 0)
                      .toFixed(2)}
                    $
                  </b>
                </div>
                <div className="w-3/6 text-center ">
                  <h2 className="text-2xl font-bold">{t("Recycled")}</h2>
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
                <CustomShapeBarChart data={barData} />
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
