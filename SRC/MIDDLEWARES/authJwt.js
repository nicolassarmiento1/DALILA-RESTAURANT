const jwt = require("jsonwebtoken");
const mysqlConnection = require("../database");

const authJwt = {};

authJwt.verifyToken = async (req,res,next)=>{
    try {
        const token = req.headers['x-access-token'];
        if(!token) return res.status(403).json({message: 'No ha ingresado el token'});
        const decoded = jwt.verify(token,'product-api');
        req.userId = decoded.id;
        mysqlConnection.query('SELECT * FROM Users WHERE id = ?',[decoded.id],(err,rows,fields)=>{
            if (!err) {
                if(rows[0]==null){
                    return res.status(404).json({message:'No se encuentra el usuario'});
                }else{
                    next();
                }
            } else {
                console.log(err);
            }
        });        
    } catch (error) {
        return res.status(401).json({message: 'No esta autorizado'});
    }
}

authJwt.isModerator = async (req,res,next)=>{
    mysqlConnection.query('SELECT * FROM Users WHERE id = ?',[req.userId],(err,rows,fields)=>{
        if (!err) {
            if(rows[0].rol == 2){
                next();
                return;
            }else{
                return res.status(403).json({message: 'Requiere rol de moderador'});
            }
          } else {
            console.log(err);
          }        
    });
}

authJwt.isAdmin = async (req,res,next)=>{
    mysqlConnection.query('SELECT * FROM Users WHERE id = ?',[req.userId],(err,rows,fields)=>{
        if (!err) {
            if(rows[0].rol == 1){
                next();
                return;
            }else{
                return res.status(403).json({message: 'Requiere rol de administrador'});
            }
            console.log(rows[0]);
          } else {
            console.log(err);
          }        
    });
    
}

authJwt.isAdminModerator = async (req,res,next)=>{
    mysqlConnection.query('SELECT * FROM Users WHERE id = ?',[req.userId],(err,rows,fields)=>{
        if (!err) {
            if(rows[0].rol == 1 || rows[0].rol == 2){
                next();
                return;
            }else{
                return res.status(403).json({message: 'Requiere rol de administrador o moderador'});
            }
          } else {
            console.log(err);
          }        
    });
}

module.exports = authJwt;