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

// Creating the customers
app.post('/createcustomer',(req,res)=>{
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let number = req.body.number;

    let qr = `insert into customers(firstname,lastname,number,email)
                    values('${firstname}','${lastname}','${number}','${email}')`

    db.query(qr,(err,result)=>{
        if (err) {
            console.log(err)
        }
        res.send({
            message:'data inserted'
        })
})
});

// Updating th customer
app.put('/updatecustomer/:id',(req,res)=>{
    let id = req.params.id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let number = req.body.number;
    

    let qr = `update customers 
                    set firstname = '${firstname}',lastname = '${lastname}',number='${number}',email='${email}'
                    where id = ${id}`;

    db.query(qr,(err,result)=>{
        if (err) {
            console.log(err)
        }
        res.send({
            message:'data updated'
        });

    });
})

// Delete the customer
app.delete('/deletecustomer/:id',(req,res)=>{
    let id = req.params.id
    let qr = `delete from customers 
                where id = '${id}'`;

        db.query(qr,(err,result)=>{
        if (err) {
        console.log(err)
        }
        res.send({
        message:'data deleted'
        });

});

})

app.listen(3000,()=>{
    console.log('server running')
})