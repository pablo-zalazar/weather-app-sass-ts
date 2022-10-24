import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  try {
    const db = await mongoose.connect(`${process.env.MONGO_DB}`);
    console.log("database is coneccted to: " + db.connection.name);
  } catch (e) {
    console.error(e);
  }
})();
