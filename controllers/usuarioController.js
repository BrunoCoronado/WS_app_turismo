
/**
 * Created by Personal on 05/05/2016.
 */
module.exports=function (app) {
    return{
        registro:function(req,res){
            var Usuario = app.get('usuario');
            Usuario.create({
                nombre: req.body.nombre,
                correo: req.body.correo,
                nick: req.body.nick,
                password: req.body.password,
                rolIdRol: req.body.id_rol
            }).then(function (usuario) {
                res.json(usuario)
            })
        },
        login:function (req,res) {
            var Sequelize = app.get('sequelize');
            Sequelize.query("CALL sp_autenticarUsuario('"+req.body.correo+"','"+req.body.password+"');").then(function (response) {
                if(response.length > 0){
                    res.status(200).send(response);
                }else{
                    res.status(404).send({message: "credenciales invalidas"});
                }
            }).error(function (err) {
                res.json(err)
            });
        }
    }
}