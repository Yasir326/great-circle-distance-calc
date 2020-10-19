const fs = require("fs");
const { greatCircleDistanceCalc } = require("./greatCircleDistanceCalc.js");

const customerFile = fs.readFileSync("./customers.txt", "utf-8"); //Read in file
const customerArr = customerFile.split("\n").map((s) => JSON.parse(s)); //Convert file into array of objects

const dublinOffice = {
  latitude: "53.339428",
  longitude: "-6.257664",
};

const invitedArr = [];

//Sort data in ascending order
const sortedCustomers = customerArr.sort((a, b) => {
  return a.user_id - b.user_id;
});

const closestCustomers = (sortedCustomers, arr) => {
  for ({ latitude, longitude, user_id, name } of sortedCustomers) {
    if (
      greatCircleDistanceCalc(
        dublinOffice.latitude,
        dublinOffice.longitude,
        latitude,
        longitude
      ) <= 100
    ) {
      invitedArr.push(`${name}:${user_id}`);
    }
  }
  writeInvitedCustomer(arr);
};

const writeInvitedCustomer = (arr) => {
  const writeStream = fs.createWriteStream("Output.txt");
  const pathName = writeStream.path;

  arr.forEach((value) => writeStream.write(`${value}\n`));
  writeStream.on("finish", () => {
    console.log(`wrote all the array data to file ${pathName}`);
  });

  writeStream.on("error", (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`);
  });

  writeStream.end();
};

closestCustomers(sortedCustomers, invitedArr);
