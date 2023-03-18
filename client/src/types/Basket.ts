export interface Basket {
    _id: string
    userId: string
    type: BasketTypes//"PLASTIC" | "ORGANIC" | "PAPER" | "GLASS" | "METALS" | "MIXED"
    dimension: BasketDimensions
    filling: number
    createdAt: Date
    updatedAt?: Date
}

export enum BasketTypes {
    PLASTIC = "PLASTIC",
    ORGANIC = "ORGANIC",
    PAPER = "PAPER",
    GLASS = "GLASS",
    METALS = "METALS",
    MIXED = "MIXED",
}

export enum BasketDimensions {
    SMALL = 2,
    MEDIUM = 5,
    LARGE = 10,
}