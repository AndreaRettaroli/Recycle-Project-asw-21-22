import { BasketTypes } from "./Basket"

export interface Withdrawal {
    _id: string
    userId: string
    basketId: string
    wasteType: BasketTypes
    wasteWeight: number
    wasteValue: number
    createdAt: Date
    updatedAt?: Date
}
