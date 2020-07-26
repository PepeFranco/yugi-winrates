import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const ddb = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
});

var docClient = new AWS.DynamoDB.DocumentClient();

export { ddb, docClient };
