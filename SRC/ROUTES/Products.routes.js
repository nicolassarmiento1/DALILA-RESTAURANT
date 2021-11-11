const express = require('express');
const router = express.Router();
const authJwt = require('../MIDDLEWARES/authJwt');

const mysqlConnection = require('../database');

router.get('/products',[authJwt.verifyToken],(req,res)=>{
    mysqlConnection.query('SELECT * FROM Products',(err,rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/products/:id',[authJwt.verifyToken], (req,res)=> {
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM Products WHERE id = ?',[id], (err,rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.post('/products/add',[authJwt.verifyToken,authJwt.isAdminModerator],(req,res)=>{
    const {id,nombre,precio} = req.body;
    mysqlConnection.query('INSERT INTO Products VALUES (?,?,?);',[
        id,nombre,precio
    ],(err,rows,fields)=>{
        if(!err){
            res.status(200).json(rows[0]);
        }else{
            console.log(err);
        }        
    });
});

router.put('/products/:id',[authJwt.verifyToken,authJwt.isAdminModerator],(req,res)=>{
    const {nombre,precio} = req.body;
    const {id} = req.params;
    mysqlConnection.query( `
    UPDATE Products
    SET nombre = ?,
    precio = ?
    WHERE id = ?
    `,[
        nombre,precio,id
    ],(err,rows,fields)=>{
        if(!err){
            res.status(200).json(rows[0]);
        }else{
            console.log(err);
        } 
    });
});

router.delete('/products/:id',[authJwt.verifyToken,authJwt.isAdminModerator],(req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM Products WHERE id = ?',[id],(err,rows,fields)=>{
        if(!err){
            res.status(200).json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

module.exports = router;