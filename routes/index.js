/**
 * Created by Personal on 05/05/2016.
 */
var ruta=require('express').Router();
module.exports = (function ( app) {
    var usuario=require('../controllers/usuarioController.js')(app);
    var departamento=require('../controllers/departamentoController.js')(app);
    var rol=require('../controllers/rolController.js')(app);
    var hotel=require('../controllers/hotelController.js')(app);
    var ubicacion=require('../controllers/ubicacionController.js')(app);
    var comentario=require('../controllers/comentarioController.js')(app);
    var sitioTuristico=require('../controllers/sitioTuristicoController.js')(app);

	 ruta.get('/',function (peticion,respuesta) {
	 respuesta.send("Servicio Iniciado")
	 }); 
    
	ruta.get('/sitioturistico', sitioTuristico.list);
	 
    /*rutas para los usuarios*/
    ruta.post('/usuario/login', usuario.login);
    ruta.post('/usuario/registro', usuario.registro);

	ruta.get('/token',usuario.tokenGenerator);
	
	ruta.use(usuario.tokenMiddleware);
		
    /*rutas para los roles*/
    ruta.get('/rol', rol.list);
    ruta.post('/rol', rol.add);
    ruta.put('/rol', rol.edit);
    ruta.delete('/rol', rol.delete);

    /*rutas para los departamentos*/
    ruta.get('/departamento', departamento.list);
    ruta.post('/departamento', departamento.add);
    ruta.put('/departamento', departamento.edit);
    ruta.delete('/departamento', departamento.delete);
	
	/*rutas para los sitios*/
    
    ruta.post('/sitioturistico', sitioTuristico.add);
    ruta.put('/sitioturistico', sitioTuristico.edit);
    ruta.delete('/sitioturistico', sitioTuristico.delete);

    /*rutas para los hoteles*/
    ruta.get('/hotel', hotel.list);
    ruta.post('/hotel', hotel.add);
    ruta.put('/hotel', hotel.edit);
    ruta.delete('/hotel', hotel.delete);

    /*rutas para las ubicaciones*/
    ruta.get('/ubicacion', ubicacion.list);
    ruta.post('/ubicacion', ubicacion.add);
    ruta.put('/ubicacion', ubicacion.edit);
    ruta.delete('/ubicacion', ubicacion.delete);

    /*rutas para los comentarios*/
    ruta.get('/comentario', comentario.list);
    ruta.post('/comentario', comentario.add);
    ruta.put('/comentario', comentario.edit);
    ruta.delete('/comentario', comentario.delete);

    return ruta;
});