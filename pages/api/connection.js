import mongoose from "mongoose";
import RecordSchema from "./schema";

export const connectToMongo = async () => {
  // const password = process.env.MONGO_DB_PASSWORD;
  const connection = await mongoose.createConnection(
    `mongodb+srv://readuser:gW93ULoQPCrSCwAmV8L5@cluster0.fvkqk.mongodb.net/yugi-winrates?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useUnifiedTopology: true,
    }
  );
  const Record = connection.model("Record", RecordSchema);
  return {
    connection,
    models: {
      Record,
    },
  };
};

export const apiHandler = (res, method, handlers) => {
  if (!Object.keys(handlers).includes(method)) {
    res.setHeader("Allow", Object.keys(handlers));
    res.status(405).end(`Method ${method} Not Allowed`);
  } else {
    handlers[method](res);
  }
};

export const mongoMiddleware = (handler) => async (req, res) => {
  const { connection, models } = await connectToMongo();
  try {
    await handler(req, res, connection, models);
  } catch (e) {
    connection.close();
    res.status(500).json({ error: e.message || "something went wrong" });
  }
};
