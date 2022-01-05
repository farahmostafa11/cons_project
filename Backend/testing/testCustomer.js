
const Customer = require('../models/customerModel');
const con=require('./testConnection.js')

con.startConnection();
const customer1=new Customer({
    firstName:'Basant',
    lastName:'Loay',
    username:'basantloay9',
    email:'basantloay2012@gmail.a',
    password:'Abcd123456'
});
console.log('Laaaaaaaaa');
customer1.save().then(doc=>{
    console.log(doc);
}).catch(err=>{
console.log("ERRRROOORRRR : ",err);
});