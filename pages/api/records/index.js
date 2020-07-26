import AWS from "aws-sdk";

export default (req, res) => {
  AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  const ddb = new AWS.DynamoDB({
    apiVersion: "2012-08-10",
  });

  const params = {
    // ExpressionAttributeValues: {},
    TableName: "yugi-winrates",
  };

  ddb.scan(params, (err, data) => {
    if (err) {
      console.log("Error", err);
      res.statusCode = 500;
      res.end();
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    }
  });
};
