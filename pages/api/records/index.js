import { ddb } from "../aws";

export default (req, res) => {
  const params = {
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
