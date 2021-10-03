const _ = require("lodash");

const newCollection = require("./new-collection.json");
const oldCollection = require("./old-collection.json");

const newSimple = newCollection.map((c) => c["Name"]);

const oldSimple = oldCollection.map((c) => c["Name"]);

console.log("new: ", newSimple.length);
console.log("old: ", oldSimple.length);

const diff = _.difference(oldSimple, newSimple);

console.log(diff.length);
console.log(diff);
// const diffInOld = oldCollection.filter((c) => {
//   console.log(c["Name"]);
//   return diff.findIndex((d) => d["Name"] === c["Name"]) >= 0;
// });
// console.log(diffInOld);
