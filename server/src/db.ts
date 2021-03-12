import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        `mongodb://user:user@cluster0-shard-00-00.nqovj.mongodb.net:27017,cluster0-shard-00-01.nqovj.mongodb.net:27017,cluster0-shard-00-02.nqovj.mongodb.net:27017/react-chat-app_dev?ssl=true&replicaSet=atlas-3xg8mh-shard-0&authSource=admin&retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export default connectToDB;
