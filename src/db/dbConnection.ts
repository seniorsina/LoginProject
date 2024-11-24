import mongoose from "mongoose";
import config from "config";


const connectDB = (): void => {
  const uri: string = config.get<string>("db.connectionString");
  console.log(uri);
  mongoose
    .connect(uri)
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((error) => {
      console.error("Error connecting to mongodb", error);
      process.exit(1);
    });
};

export default connectDB;
