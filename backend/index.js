const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')


const app = express();

app.use(cors());
app.use(bodyparser.json());

// Database connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'customer',
    port:3307
});

// Check DB
db.connect(err=>{
    if (err) {
        console.log(err)
    }
    console.log('Database connected')
})

// Get All Customers
app.get('/getallcustomer',(req,res)=>{
    let qr = 'select * from customers'
    db.query(qr,(err,result)=>{
        if (err) {
            console.log(err,'errs');
        }
        if (result.length>0) {
            res.send({
                message : 'all customer data',
                data:result
            });
        }
    })
})

app.listen(3000,()=>{
    console.log('server running')
})