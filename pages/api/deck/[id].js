import { mongoMiddleware, apiHandler } from "../connection";

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { id },
    method,
  } = req;
  apiHandler(res, method, {
    GET: (response) => {
      models.Record.find({ deck1: id }, (error, records) => {
        const result = {};
        if (error) {
          connection.close();
          response.status(500).json({ error });
        } else {
          records.map(
            (record) =>
              (result[record.deck2] = {
                wins: result[record.deck2]
                  ? result[record.deck2].wins + record.deck1Wins
                  : record.deck1Wins,
                losses: result[record.deck2]
                  ? result[record.deck2].losses + record.deck2Wins
                  : record.deck2Wins,
              })
          );
          models.Record.find({ deck2: id }, (error, records) => {
            if (error) {
              connection.close();
              response.status(500).json({ error });
            } else {
              records.map(
                (record) =>
                  (result[record.deck1] = {
                    wins: result[record.deck1]
                      ? result[record.deck1].wins + record.deck2Wins
                      : record.deck2Wins,
                    losses: result[record.deck1]
                      ? result[record.deck1].losses + record.deck1Wins
                      : record.deck1Wins,
                  })
              );
              response.status(200).json(result);
              connection.close();
            }
          });
        }
      });
    },
  });
});
