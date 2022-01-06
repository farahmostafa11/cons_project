
const Customer = require('../models/customerModel');
const con=require('./testConnection.js')

con.startConnection();
const customer1=new Customer({
    firstName:'Basant',
    lastName:'Loay',
    username:'basant1',
    email:'basantloay2012@gmail.a',
    password:'Abcd123456'
});
console.log('Laaaaaaaaa');
customer1.save().then(doc=>{
    console.log(doc);
}).catch(err=>{
console.log("ERRRROOORRRR : ",err);
});

const customer2=new Customer({
    firstName:'Basant',
    lastName:'Loay',
    username:'basantloay9',
    email:'basa2012@gmail.com',
    password:'Abcd123456'
});
console.log('Laaaaaaaaa');
customer2.save().then(doc=>{
    console.log(doc);
}).catch(err=>{
console.log("ERRRROOORRRR : ",err);
});

const customer3=new Customer({
    firstName:'Basant',
    lastName:'Loay',
    username:'basssant99',
    email:'basant@gmail.com',
    password:'Abcd123456'
});
console.log('Laaaaaaaaa');
customer3.save().then(doc=>{
    console.log(doc);
}).catch(err=>{
console.log("ERRRROOORRRR : ",err);
});