const mysql = require("mysql2");

const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname ,"/views"));

let createRandomUser = () => {
    return [
        faker.string.alphanumeric(10),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password()
    ];
};



const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "Delta",
    password: "biswajit12"
});
// Home Page-------->
app.get("/" , (req,res)=>{
   let q = `SELECT COUNT(*) FROM user;`;
   connection.query(q , (err, result) => {
    if (err) {
        console.log("Error:", err);
    } else {
        let count = result[0]["COUNT(*)"];
        console.log(count);
        res.render("home.ejs" , {count});
    }
});
});

// User page ------>
app.get("/users" , (req,res)=>{
    let q = `SELECT * FROM user`;
     connection.query(q , (err, data) => {
    if (err) {
        console.log("Error:", err);
    } else {
         res.render("user.ejs" , {data});
    }
});
  
});

//Edit route ------>
app.get("/users/:id/edit" , (req,res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    connection.query(q , (err, result) => {
    if (err) {
        console.log("Error:", err);
    } else {
        let user = result[0];
         res.render("edit.ejs" , {user});
         console.log(user.password);
         
    }
});
   
});

//Updated Route------->

app.patch("/users/:id",(req,res)=>{
    let {id} = req.params;
    let {password: formpass , username: newUsername} = req.body;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    connection.query(q , (err, result) => {
    if (err) {
        console.log("Error:", err);
    } else {
        let user = result[0];
        if(formpass != user.password){
            res.send("Wrong password");
        } else{
            let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
            connection.query(q2 , (err, result) => {
    if (err) {
        console.log("Error:", err);
        }
         else{
            res.redirect("/users");
         }
         
    });
        }
    }
});
});

app.listen(8080,()=>{
    console.log("Listening to the port 8080");
});