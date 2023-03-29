import mongoose, { Document } from "mongoose";

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  age: Number,
  email: String,
  address: String,
  phone: String,
});

personSchema.set("toJSON", {
  transform: (document: Document, returnedObject: Record<string, any>) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

export default Person = mongoose.model("Person", personSchema);
