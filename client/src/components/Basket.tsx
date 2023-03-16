import React, { FC } from "react";
import { Basket as BasketModel } from "../types/Basket";
import Card from "./UI/Card";

interface Props {
  basket: BasketModel;
  color: string;
}

const Basket: FC<Props> = (props) => {
  const getHeight = (filling: number, dimension: number) => {
    return ((100 * filling) / dimension).toFixed(0);
  };
  
  const waveHeight = `${getHeight(props.basket.filling, props.basket.dimension)}px`;
  
  return (
    <Card>
      <div className="h-48 flex w-48 flex-col justify-between items-center">
        <div>
          <h3 className="text-3xl font-bold mb-2 text-center">
            {props.basket.type}
          </h3>
          <p className="text-center">
            {props.basket.filling + "/" + props.basket.dimension}
          </p>
        </div>
        <div className="relative w-full">
          <div
            className="absolute inset-0 h-full w-full"
            style={{ backgroundImage: `url('/wave.svg')`, backgroundColor: `${props.color}` }}
          />
           <div className="absolute inset-x-0 bottom-0 h-3 rounded-lg" style={{ backgroundColor: `${props.color}`, height: waveHeight }}></div> 
        </div>
      </div>
    </Card>
  );
};

export default Basket;
