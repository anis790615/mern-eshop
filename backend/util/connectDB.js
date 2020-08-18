import mongoose from "mongoose";

export const connectDB = (config) => {
  const dbURL = `mongodb+srv://${config.dbUser}:${config.dbPassword}@anistation-mxt3x.azure.mongodb.net/${config.dbName}?retryWrites=true&w=majority`;
  const connectionConfig = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(dbURL, connectionConfig);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};
