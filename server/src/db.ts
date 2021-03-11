import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.nqovj.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
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
