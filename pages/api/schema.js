import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  deck1: {
    type: String,
    required: true,
  },
  deck2: {
    type: String,
    required: true,
  },
  deck1Wins: {
    type: Number,
    required: true,
  },
  deck2Wins: {
    type: Number,
    required: true,
  },
});

export default RecordSchema;
