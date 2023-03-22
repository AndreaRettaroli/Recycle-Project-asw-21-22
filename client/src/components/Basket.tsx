import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Basket as BasketModel } from "../types/Basket";
import Card from "./UI/Card";

interface Props {
  basket: BasketModel | undefined | any;
  color: string;
}

const Basket: FC<Props> = (props) => {
  const getHeight = (filling: number, dimension: number) => {
    if (!Object.is(filling, undefined) && !Object.is(dimension, undefined)) {
      return ((100 * filling) / dimension).toFixed(0);
    } else {
      return 0;
    }
  };

  const waveHeight = `${getHeight(
    props.basket?.filling,
    props.basket?.dimension
  )}px`;

  return (
    <Card>
      <Link to={`/basket-details/${props.basket?._id}`}>
        <div className=" flex w-48 h-48 flex-col justify-between items-center">
          <div>
            <h3 className="text-1xl font-bold mb-2 text-center">
              {props.basket?.type}
            </h3>
            <p className="text-center">
              {props.basket?.filling + "/" + props.basket?.dimension + " Kg"}
            </p>
          </div>
          <div
            className="w-full sm:w-[6rem] md:w-36 rounded-lg"
            style={{ backgroundColor: `${props.color}`, height: waveHeight }}
          ></div>
        </div>
      </Link>
    </Card>
  );
};

export default Basket;
