import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide a name"],
    maxLength: [25, "Name can't be longer than 25 characters"],
    minLength: [2, "Name can't be shorter than 2 characters"],
  },
  age: {
    type: Number,
    required: [true, "Please provide an age"],
    min: [13, "Age can't be less than 13"],
    max: [100, "Age can't be more than 100"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  image: {
    type: String,
  },
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

const PersonModel = mongoose.model("Person", PersonSchema);

export default PersonModel;
