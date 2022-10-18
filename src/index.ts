import * as dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./data-source";
import express from "express";

const app = express();
app.use(express.json());

console.log("hi");

AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.PORT || 5000, () => console.log("Server Started"));
    // const user = new User();

    // user.name = "Michael Akingbade";
    // user.email = "akingbademichael7@gmail.com";
    // user.role = "admin";

    // await user.save();

    // console.log("User created");
  })
  .catch((error) => console.log(error));
