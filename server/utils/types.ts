import mongoose from "mongoose";

export type Person = {
  id?: mongoose.Types.ObjectId;
  name: string;
  age: number;
  email: string;
  address: string;
  phone: string;
  image: string;
  addresses: [Address];
  createdAt?: Date;
  [key: string]: any;
};

export type Address = {
  id?: mongoose.Types.ObjectId;
  address: string;
  persons: [Person];
  [key: string]: any;
};
