const mysqlConnection = require("../database");
const authCtrl = {};
const jwt = require("jsonwebtoken");

authCtrl.signUp = async (req, res) => {
  const { id, usuario, nombre, correo, celular, direccion, contrasena } =
    req.body;
  const rol = 3;
  mysqlConnection.query(
    "INSERT INTO Users VALUES (?,?,?,?,?,?,?,?);",
    [id, usuario, nombre, correo, celular, direccion, contrasena, rol],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );

  const token = jwt.sign({ id: id }, 'product-api', {
    expiresIn: 86400, // 24 horas
  });
};
authCtrl.signIn = async (req, res) => {
  const { correo, contrasena } = req.body;
  mysqlConnection.query("SELECT correo FROM Users WHERE correo = ?", [
      correo
    ], (err, rows, fields) => {
    if (!err) {
      if(rows[0] == null){
        res.status(400).json({message: 'No existe el correo'});        
      }else{ 
        mysqlConnection.query("SELECT * FROM Users WHERE correo = ?",[correo],(err,rows,fields)=>{            
            if (!err) {
                if(rows[0].contrasena == contrasena){
                    const token = jwt.sign({id: rows[0].id},'product-api',{
                        expiresIn: 86400
                    });
                    res.json({token});
                }else{
                    res.status(401).json({message:'Contraseña equivocada'});
                }
              } else {
                console.log(err);
              }            
        });
      }
    } else {
      console.log(err);
    }
  });
  
};

module.exports = authCtrl;
