import { Schema, model } from "mongoose";

const citySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    lon: {
      type: Number,
      require: true,
    },
    lat: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("City", citySchema);
