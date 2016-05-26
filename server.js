/*** Created by Personal on 05/05/2016. */
(function(){
    var express = require('express');
    var bodyParser = require('body-parser');
    var morgan = require('morgan');
    var mysql = require('mysql');
    var Sequelize = require('sequelize');
	var cors = require('cors');

    var sequelize = new Sequelize('db_turismo','root','',{
        host: 'localhost',
        dialect: 'mysql',
        pool:{
            max: 20,
            min: 0
        }
    });

    /* Declaracion de modelos*/

    var Rol = sequelize.define('rol',{
        id_rol:{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true},
        nombre:{ type: Sequelize.STRING, allownull:false}
    });

    var Usuario = sequelize.define('usuario',{
        id_usuario:{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        nombre:{ type: Sequelize.STRING, allownull:false},
        correo:{ type: Sequelize.STRING, allownull:false },
        nick:{ type: Sequelize.STRING, allownull:false},
        password:{ type: Sequelize.STRING, allownull:false}
    });

    var Departamento = sequelize.define('departamento',{
        id_departamento:{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true},
        nombre:{ type: Sequelize.STRING, allownull: false}
    });

    var Ubicacion = sequelize.define('ubicacion',{
        id_ubicacion:{ type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
        latitud:{ type: Sequelize.STRING, allownull: true},
        longitud:{ type: Sequelize.STRING, allownull: true}
    });

    var SitioTuristico = sequelize.define('sitioturistico',{
        id_sitioTuristico:{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: { type: Sequelize.STRING, allownull: false},
        descripcion: { type: Sequelize.STRING, allownull: false}
    });

    var Hotel = sequelize.define('hotel',{
        id_hotel:{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: { type: Sequelize.STRING, allownull:false},
        descripcion: { type: Sequelize.STRING, allownull:false}
    });

    var Comentario = sequelize.define('comentario',{
        id_comentario: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true},
        comentario:{ type: Sequelize.STRING, allownull: false}
    });

    Rol.hasMany(Usuario, {constraints:true});
    Usuario.belongsTo(Rol, {constraints:true});
    Departamento.hasMany(SitioTuristico, {constraints:true});
    SitioTuristico.belongsTo(Departamento, {constraints:true});
    Ubicacion.hasMany(SitioTuristico, {constraints:true});
    SitioTuristico.belongsTo(Ubicacion, {constraints:true});
    Comentario.belongsTo(Usuario, {constraints:true});
    Comentario.belongsTo(SitioTuristico, {constraints:true});
    Usuario.hasMany(Comentario, {constraints:true});
    SitioTuristico.hasMany(Comentario, {constraints:true});
    Hotel.belongsTo(Ubicacion, {constraints:true});
    Hotel.belongsTo(Departamento, {constraints:true});
    Ubicacion.hasMany(Hotel, {constraints:true});
    Departamento.hasMany(Hotel, {constraints:true});

    sequelize.sync({ force: false});
    var puerto = 3000;
    var conf=require('./config');
    var app=express();
    app.set('sequelize',sequelize);
    app.set('rol',Rol);
    app.set('usuario',Usuario);
    app.set('departamento',Departamento);
    app.set('ubicacion',Ubicacion);
    app.set('sitioTuristico',SitioTuristico);
    app.set('hotel',Hotel);
    app.set('comentario', Comentario);
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use('/api/v1',require('./routes')(app));
    app.listen(puerto,function(){
        console.log("servidor iniciado en el puerto: "+puerto)
        console.log("Debug del servidor: ")
    });
})();