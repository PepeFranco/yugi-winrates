import { mongoMiddleware, apiHandler } from "../connection";

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { deck1, deck2, deck1Wins, deck2Wins },
    method,
  } = req;
  apiHandler(res, method, {
    POST: (response) => {
      models.Record.create(
        { deck1, deck2, deck1Wins, deck2Wins },
        (error, record) => {
          if (error) {
            connection.close();
            response.status(500).json({ error });
          } else {
            response.status(200).json(record);
            connection.close();
          }
        }
      );
    },
  });
});
