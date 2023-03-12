export interface User {
    _id: String,
    _v: Number,
    name: String;
    surname: String;
    email: String;
    password: String;
    address: String;
    province: String;
    language: String;
    role: String;
    token: String;
    createdAt: Date;
    updatedAt: Date | null;
}