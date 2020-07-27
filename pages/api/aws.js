import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

var docClient = new AWS.DynamoDB.DocumentClient();

export { docClient };
