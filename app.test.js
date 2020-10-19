const {
  readCustomers,
  withinKms,
} = require("./app.js");

//Test Data
const dublinOffice = {
  latitude: "53.339428",
  longitude: "-6.257664",
};

const customerWithin100KM = {
  latitude: "53.2451022",
  longitude: "-6.238335",
};

const customerOutside100KM = {
  latitude: "51.92893",
  longitude: "-10.27699",
};

const readCustomerOutPut = [
  {
    latitude: "52.986375",
    longitude: "-6.043701",
    name: "Christina McArdle",
    user_id: 12,
  },
  {
    latitude: "51.92893",
    longitude: "-10.27699",
    name: "Alice Cahill",
    user_id: 1,
  },
];

//Check customers are within 100km
test("User is within 100km", () => {
  expect(withinKms(dublinOffice, 100)(customerWithin100KM)).toBe(true);
});

test("User is not within 100km", () => {
  expect(withinKms(dublinOffice, 100)(customerOutside100KM)).toBe(false);
});

//check data is parsed correctly
test("User data is parsed correctly", () => {
  expect(readCustomers("./inputTest.txt")).toStrictEqual(readCustomerOutPut);
});

