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

export default async (req, res) => {
  const password = process.env.MONGO_DB_PASSWORD;
  const connection = await mongoose.createConnection(
    `mongodb+srv://pepe:${password}@cluster0.fvkqk.mongodb.net/yugi-winrates?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useUnifiedTopology: true,
    }
  );
  try {
    const Record = connection.model("Record", RecordSchema);
    const {
      query: { deck1, deck2, deck1Wins, deck2Wins },
      method,
    } = req;
    switch (method) {
      case "POST":
        Record.create(
          { deck1, deck2, deck1Wins, deck2Wins },
          (error, record) => {
            if (error) {
              connection.close();
              res.status(500).json({ error });
            } else {
              res.status(200).json(record);
              connection.close();
            }
          }
        );
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    connection.close();
    res.status(500).json({ error: e.message || "something went wrong" });
  }
};
