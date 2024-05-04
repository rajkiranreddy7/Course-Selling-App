const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(express.json());

let ADMIN_LIST  = 
  [
    { username: 'aad', password: '123' }, 
    { username: 'aadi', password: '1234' }, 
  ];
let user_list = [];

const adminAuthentication = (req, res, next) => {
    const { username, password } = req.headers;
    // const username = req.headers.username;
    // const password = req.headers.password;
    // both are same 
    const admin = ADMIN_LIST.find((entry) => entry.username === username && entry.password === password); 
    if(admin) {
        next()
    } else {
        res.status(403).json({ message: "Invalid login credentials" });
    }
}

const userAuthentication = (req,res, next) => {
    const { username, password} = req.headers;
    const user = user_list.find(entry => entry.username == username && entry.password == password );
    if(user) {
        req.user = user; // in middlewares we can add adiitional data to request. Here we added user to request .
        next();
    } else {
        res.status(403).json({ message: "Invalid user login credentials"});
    }
}

app.post('/admin/signup', (req, res) => {
    const { username, password } = req.headers;
    const admin = req.headers;
    const isExistingAdmin = ADMIN_LIST.find(entry => entry.username === admin.username);
    if(isExistingAdmin) {
        res.status(403).json({meaasge : "Admin / username exists already" });
    } else {
        ADMIN_LIST.push(admin);
    }
    console.log(username, password);
    res.json({ message: 'Admin created successfully' });
});

app.listen(port, () => {
    console.log("Server started listening on port 3000");
});

