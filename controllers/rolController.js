/**
 * Created by informatica on 06/05/2016.
 */
module.exports=function (app) {
    return{
        add:function (req,res) {
            var Rol = app.get('rol');
            Rol.create({
                nombre: req.body.nombre
            }).then(function (rol) {
                res.json(rol)
            })
        },
        edit:function (req,res) {
            var Rol = app.get('rol');
            Rol.find({
                where: {
                    id_rol: req.body.id_rol
                }
            }).then(function (rol) {
                if(rol){
                    rol.updateAttributes({
                        nombre: req.body.nombre
                    }).then(function (rol) {
                        res.json(rol)
                    });
                }else{
                    res.status(404).send({message: "rol no encontrado"})
                }
            })
        },
        delete:function (req,res) {
            var Rol = app.get('rol');
            Rol.destroy({
               where: {
                   id_rol: req.body.id_rol
               }
            }).then(function (rol) {
                res.json(rol);
            })
        },
        list:function (req,res) {
            var Rol = app.get('rol');
            Rol.findAll().then(function (rol) {
                res.json(rol)
            })
        }
    }
}
