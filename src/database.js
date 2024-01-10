// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// const mongoConnect = (callback) => {
//     MongoClient.connect('mongodb+srv://Long:Long10092003@cluster0.d11y1nf.mongodb.net/?retryWrites=true&w=majority')

//     .then(client => {
//         console.log('Connected!');
//     })
//     .catch(err => {
//         console.log(err);
//     });
// };

// module.exports = mongoConnect;

const mongoose = require('mongoose')
const URL = 'mongodb+srv://Long:Long10092003@cluster0.d11y1nf.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    await mongoose.connect(
      URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    console.log('Connected to mongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB;
