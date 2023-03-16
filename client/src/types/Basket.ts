export interface Basket {
    _id: string
    userId: string
    type: string//"PLASTIC" | "ORGANIC" | "PAPER" | "GLASS" | "METAL" | "UNDIFFERENTIED"
    dimension: number
    filling: number
    createdAt: Date | null
    updatedAt: Date | undefined | null
}

export const basketTypes = [{ name: "PLASTIC" }, { name: "ORGANIC" }, { name: "PAPER" }, { name: "GLASS" }, { name: "UNDIFFERENTIED" }, { name: "METAL" }]