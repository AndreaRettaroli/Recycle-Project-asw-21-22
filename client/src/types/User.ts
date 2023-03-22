import { Languages } from "./Languages";

export interface User {
    _id: string,
    _v: number,
    name: string;
    surname: string;
    email: string;
    password: string;
    address: string;
    province: string;
    language: Languages;
    role: string;
    token: string;
    createdAt: Date;
    updatedAt?: Date
}