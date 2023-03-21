import { BasketTypes } from "./Basket"

export interface Acquisition {
    _id: string
    userId: string
    basketId: string
    wasteName: string
    wasteType: BasketTypes
    wasteWeight: number
    createdAt: Date
    updatedAt?: Date
}

export interface PutRequest {
    userId: string
    basketId: string
    wasteName: string
    wasteType: BasketTypes
    wasteWeight: number
}

export interface RemoveRequest {
    acquisitionId: string
}

export interface ClearRequest {
    userId: string
    basketId: string
}