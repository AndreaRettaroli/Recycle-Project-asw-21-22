export interface User {
    _id: string,
    _v: number,
    name: string;
    surname: string;
    email: string;
    password: string;
    address: string;
    province: string;
    language: string;
    role: string;
    token: string;
    createdAt: Date;
    updatedAt?: Date
}