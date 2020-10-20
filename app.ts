const fs = require("fs");
const { greatCircleDistanceCalc } = require("./greatCircleDistanceCalc.ts");

const inputFileName = "./customers.txt";
const outputFileName = "./output.txt";

const maxDistance = 100;

const dublinOffice = {
  latitude: "53.339428",
  longitude: "-6.257664",
};

const invitedCustomers = readCustomers(inputFileName)
  .filter(withinKms(dublinOffice, maxDistance))
  .sort(userIdComparator)
  .map(formatCustomerForOutput);

writeInvitedCustomer(invitedCustomers, outputFileName);

function readCustomers(filename) {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .map((s) => JSON.parse(s));
}

function withinKms(location, kms) {
  return (user) =>
    greatCircleDistanceCalc(
      user.latitude,
      user.longitude,
      location.latitude,
      location.longitude
    ) <= kms;
}

function userIdComparator({ user_id: userId1 }, { user_id: userId2 }) {
  return userId1 - userId2;
}

function formatCustomerForOutput({ name, user_id }) {
  return `${name}:${user_id}`;
}

async function writeInvitedCustomer(arr, outputFileName) {
  const writeStream = fs.createWriteStream(outputFileName);
  const pathName = writeStream.path;

  arr.forEach((value) => writeStream.write(`${value}\n`));
  writeStream.end();
}

module.exports = {
  readCustomers,
  withinKms,
};

// const customerFile = fs.readFileSync("./customers.txt", "utf-8"); //Read in file
// const customerArr = customerFile.split("\n").map((s) => JSON.parse(s)); //Convert file into array of objects

// const invitedArr = [];

// //Sort data in ascending order
// const sortedCustomers = customerArr.sort((a, b) => {
//   return a.user_id - b.user_id;
// });

// const closestCustomers = (sortedCustomers, arr) => {
//   for ({ latitude, longitude, user_id, name } of sortedCustomers) {
//     if (
//       greatCircleDistanceCalc(
//         dublinOffice.latitude,
//         dublinOffice.longitude,
//         latitude,
//         longitude
//       ) <= 100
//     ) {
//       invitedArr.push(`${name}:${user_id}`);
//     }
//   }
//   writeInvitedCustomer(arr);
// };

// closestCustomers(sortedCustomers, invitedArr);

// module.exports = {
//   closestCustomers,
//   writeInvitedCustomer,
// };
