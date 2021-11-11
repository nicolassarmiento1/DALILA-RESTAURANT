const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authJwt = require('../MIDDLEWARES/authJwt');

const mysqlConnection = require('../database');

router.get('/users',[authJwt.verifyToken,authJwt.isAdmin],  (req,res)=>{
    mysqlConnection.query('SELECT * FROM Users',(err,rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/users/:id',[authJwt.verifyToken,authJwt.isAdmin], (req,res)=> {
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM Users WHERE id = ?',[id], (err,rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.post('/users/add',[authJwt.verifyToken,authJwt.isAdmin],(req,res)=>{
    const {id,usuario,nombre,correo,celular,direccion,contrasena,rol} = req.body;
    if(rol<=3 && rol>=1){
        mysqlConnection.query('INSERT INTO Users VALUES (?,?,?,?,?,?,?,?);',[
            id,usuario,nombre,correo,celular,direccion,contrasena,rol
        ],(err,rows,fields)=>{
            if(!err){
                res.status(200).json(rows[0]);
            }else{
                console.log(err);
            }        
        });
        const token = jwt.sign({id:id},'product-api',{
            expiresIn: 86400 // 24 horas
        });
    
        res.status(200).json({token});
    }else{
        res.status(400).send('No existe el rol');
    }

});

router.put('/users/:id',[authJwt.verifyToken,authJwt.isAdmin],(req,res)=>{
    const {usuario,nombre,correo,celular,direccion,contrasena,rol} = req.body;
    const {id} = req.params;
    mysqlConnection.query( `
    UPDATE Users
    SET usuario = ?,
    nombre = ?,
    correo = ?,
    celular = ?,
    direccion = ?,
    contrasena = ?,
    roles = ?
    WHERE id = ?
    `,[
        usuario,nombre,correo,celular,direccion,contrasena,rol,id
    ],(err,rows,fields)=>{
        if(!err){
            res.status(200).json(rows[0]);
        }else{
            console.log(err);
        } 
    });
});

router.delete('/users/:id',[authJwt.verifyToken,authJwt.isAdmin],(req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM Users WHERE id = ?',[id],(err,rows,fields)=>{
        if(!err){
            res.status(200).json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

module.exports = router;