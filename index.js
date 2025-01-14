import express from "express";
import users from "./MOCK_DATA.json" assert { type: 'json' };;
import fs from "fs";
import { json } from "stream/consumers";
const app = express();
const port = 1100;
app.use(express.urlencoded({extended: false}));
app.get("/",(req,res)=>{
    res.send("Hello it is an home page! ");
})

app.get("/about",(req,res)=>{
    res.send("hello this is an about page! ");
})

app.get("/users",(req,res)=>{
    const html = `
    <ul>
        ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})

app.get("/users/:id",(req,res)=>{
    const id = req.params.id
    // console.log(req.params.id)
    const user = users.find((user)=> user.id==id)
    res.send(user);
})

app.post("/users",(req,res)=>{
    const body = req.body;
    // console.log(req.body)
    users.push({id: users.length+1 ,...body});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err, data)=>{
        return res.json({status: "success"});
        })
})

app.listen(port,()=>{
    console.log(`Server is running in port number ${port}`)
})