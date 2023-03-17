import { BasketTypes } from "../types/Basket";

interface Colors {
    type: BasketTypes
    color: string
}

export const colors: Colors[] = [
    { type: BasketTypes.PLASTIC, color: "#fbef86" },
    { type: BasketTypes.GLASS, color: "#7db5ff" },
    { type: BasketTypes.PAPER, color: "#e7fbaf" },
    { type: BasketTypes.METALS, color: "#8986cd" },
    { type: BasketTypes.ORGANIC, color: "#efc08b" },
    { type: BasketTypes.MIXED, color: "#c2c0c0" },
];