const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
module.exports.startConnection = () => {

dotenv.config({ path:'./../config.env' });

const DB=process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex: true,
  useFindAndModify:false
}).then(con =>{
  console.log(con.connections);
  console.log('DB connection successful');
});
//connect fn will return method con
//so we use returned con to print
}

