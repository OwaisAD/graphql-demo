import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  persons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
});

const AddressModel = mongoose.model("Address", AddressSchema);

export default AddressModel;
