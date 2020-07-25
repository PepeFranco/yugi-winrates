import { mongoMiddleware, apiHandler } from "../connection";

export default mongoMiddleware(async (req, res, connection, models) => {
  const { method } = req;
  apiHandler(res, method, {
    GET: (response) => {
      models.Record.find({}, (error, record) => {
        if (error) {
          connection.close();
          response.status(500).json({ error });
        } else {
          response.status(200).json(record);
          connection.close();
        }
      });
    },
  });
});
