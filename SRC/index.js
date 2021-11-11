const express = require('express');
const app = express();
const Users = require('./ROUTES/Users.routes');
const Pedidos = require('./ROUTES/Pedidos.routes');
const Productos = require('./ROUTES/Products.routes');
const auth = require('./ROUTES/auth.routes');

//SETTINGS
app.set('port', process.env.PORT || 3000);

//MIDDLEWARES
app.use(express.json());

//ROUTES
app.use(Users);
app.use(Pedidos);
app.use(Productos);
app.use(auth);

// STARTTING THE SERVER
app.listen(app.get('port'), () => {
    console.log('Server on port ',app.get('port'));
});