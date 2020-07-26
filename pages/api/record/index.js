import { ddb } from "../aws";

export default (req, res) => {
  const { body, method } = req;
  if (method !== "POST") {
    res.statusCode = 404;
    res.end();
  }

  const params = {
    Item: {
      winner: {
        S: body.winner,
      },
      loser: {
        S: body.loser,
      },
      id: {
        S: Date.now().toString(),
      },
    },
    TableName: "yugi-winrates",
  };

  ddb.putItem(params, (error, data) => {
    if (error) {
      res.statusCode = 500;
      res.end();
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    }
  });
};
