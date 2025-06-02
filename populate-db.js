const mongoose = require("mongoose");
const { connectDatabase } = require("./build/database.js");
const { model: Manufacturer } = require("./build/modules/manufacturers/model.js");
const { model: Dealer } = require("./build/modules/dealers/model.js");
const { model: Car } = require("./build/modules/cars/model.js");

(async () => {
    connectDatabase();

    const manufacturers = [
      {
        _id: new mongoose.Types.ObjectId("683c78fc5c139f993d03c774"),
        make: "BMW",
        dealerIds: [
          "683c784e8f9b93aaec4558ca",
          "683c79735c139f993d03c776"
        ],
        supportedModelIds: [
          "683c7dc6a3f4f9b306341c02",
          "683c7e0ba3f4f9b306341c06",
          "683c7e1aa3f4f9b306341c0a"
        ]
      }
    ];

    const dealers = [
      {
        _id: new mongoose.Types.ObjectId("683c784e8f9b93aaec4558ca"),
        name: "Krasta Auto",
        manufacturerId: "683c78fc5c139f993d03c774",
        carIds: []
      },
      {
        _id: new mongoose.Types.ObjectId("683c79735c139f993d03c776"),
        name: "Another Dealer",
        manufacturerId: "683c78fc5c139f993d03c774",
        carIds: []
      }
    ];

    const cars = [
      {
        _id: new mongoose.Types.ObjectId("683c7dc6a3f4f9b306341c02"),
        status: "SUPPORTED",
        dealerId: null,
        manufacturerId: "683c78fc5c139f993d03c774",
        model: "e36"
      },
      {
        _id: new mongoose.Types.ObjectId("683c7e0ba3f4f9b306341c06"),
        status: "SUPPORTED",
        dealerId: null,
        manufacturerId: "683c78fc5c139f993d03c774",
        model: "e46"
      },
      {
        _id: new mongoose.Types.ObjectId("683c7e1aa3f4f9b306341c0a"),
        status: "SUPPORTED",
        dealerId: null,
        manufacturerId: "683c78fc5c139f993d03c774",
        model: "e90"
      },
    ];

    async function main() {
      const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/YOUR_DB_NAME";
      await mongoose.connect(MONGODB_URI);

      // Clear existing data
      await Manufacturer.deleteMany({});
      await Dealer.deleteMany({});
      await Car.deleteMany({});

      // Insert new data
      await Manufacturer.insertMany(manufacturers);
      await Dealer.insertMany(dealers);
      await Car.insertMany(cars);

      console.log("Database populated!");
      await mongoose.disconnect();
    }

    main().catch(err => {
      console.error(err);
      process.exit(1);
    });

})();
