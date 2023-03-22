import React, { FC, useEffect, useState } from "react";
import Api from "../api/Api";
import Loading from "./UI/Loading";
import { Acquisition } from "../types/Acquisition";

interface Props {
  basketId?: string;
}

const BasketAcquisitionsList: FC<Props> = ({ basketId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [acquisitionsList, setAcquisitionsList] = useState<Acquisition[]>([]);

  const getAcquisitions = async () => {
    const response = await Api.get("/api/acquisitions", {
      params: { basketId: basketId },
    });
    if (response.status === 200) {
      console.log(
        "🚀 ~ file: BasketAcquisitionsList.tsx:17 ~ getAcquisitions ~ response:",
        response
      );
      setAcquisitionsList(response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAcquisitions();
  }, []);

  const dateParser = (itemDate: Date) => {
    let d = new Date(itemDate);
    let dformat =
      [
        d.getHours() < 10 ? "0" + "" + d.getHours() : d.getHours(),
        d.getMinutes() < 10 ? "0" + "" + d.getMinutes() : d.getMinutes(),
        d.getSeconds() < 10 ? "0" + "" + d.getSeconds() : d.getSeconds(),
      ].join(":") +
      " " +
      [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("-");
    return dformat;
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-48 ">
          <Loading />
        </div>
      ) : (
        <div className="w-full ">
          <h2 className="text-2xl font-bold">Last acquisitions</h2>
          <ul>
            {/* add .slice(-x) to take last x element, need to check order*/}
            {acquisitionsList
              .reverse()
              .slice(0, 10)
              .map((item, index) => (
                <li key={"acquisition-" + index} className="list-disc ml-4">
                  {item.wasteName +
                    " " +
                    item.wasteWeight +
                    "Kg " +
                    dateParser(item.createdAt)}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default BasketAcquisitionsList;
