import AWS from "aws-sdk";

export default (req, res) => {
  const { body, method } = req;
  if (method !== "POST") {
    res.statusCode = 404;
    res.end();
  }

  AWS.config.update({
    region: "us-east-1",
    accessKeyId: body.key,
    secretAccessKey: body.secret,
  });

  const ddb = new AWS.DynamoDB({
    apiVersion: "2012-08-10",
  });

  const tables = { structure: "yugi-winrates", speed: "yugi-winrates-speed" };
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
    TableName: tables[body.type],
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
