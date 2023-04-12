import mongoose from "mongoose";

export type Person = {
  id?: mongoose.Types.ObjectId;
  name: string;
  age: number;
  email: string;
  address: string;
  phone: string;
  createdAt?: Date;
  [key: string]: any;
};
