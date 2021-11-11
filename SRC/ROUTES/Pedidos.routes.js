const express = require('express');
const router = express.Router();
const authJwt = require('../MIDDLEWARES/authJwt');

const mysqlConnection = require('../database');

router.get('/pedidos',[authJwt.verifyToken], (req,res)=>{
    mysqlConnection.query('SELECT * FROM Pedidos',(err,rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/pedidos/:id',[authJwt.verifyToken], (req,res)=> {
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM Pedidos WHERE id = ?',[id], (err,rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.post('/pedidos/add',[authJwt.verifyToken,authJwt.isAdminModerator],(req,res)=>{
    const {id,total,estado,IdUsuario,IdProducto} = req.body;
    mysqlConnection.query('INSERT INTO Pedidos VALUES (?,?,?,?,?);',[
        id,total,estado,IdUsuario,IdProducto
    ],(err,rows,fields)=>{
        if(!err){
            res.status(200).json(rows[0]);
        }else{
            console.log(err);
        }        
    });
});

router.put('/pedidos/:id',[authJwt.verifyToken,authJwt.isAdminModerator],(req,res)=>{
    const {total,estado,IdUsuario,IdProducto} = req.body;
    const {id} = req.params;
    mysqlConnection.query( `
    UPDATE Pedidos
    SET total = ?,
    estado = ?,
    IdUsuario = ?,
    IdProducto = ?
    WHERE id = ?
    `,[
        total,estado,IdUsuario,IdProducto,id
    ],(err,rows,fields)=>{
        if(!err){
            res.status(200).json(rows[0]);
        }else{
            console.log(err);
        } 
    });
});

router.delete('/pedidos b/:id',[authJwt.verifyToken,authJwt.isAdminModerator],(req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM Pedidos WHERE id = ?',[id],(err,rows,fields)=>{
        if(!err){
            res.status(200).json(rows[0]);
        }else{
            console.log(err);
        }
    });
});


module.exports = router;