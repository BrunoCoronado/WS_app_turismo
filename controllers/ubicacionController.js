/**
 * Created by informatica on 06/05/2016.
 */
module.exports=function (app) {
    return{
        add:function (req,res) {
            var Ubicacion = app.get('ubicacion');
            Ubicacion.create({
                latitud: req.body.latitud,
                longitud: req.body.longitud
            }).then(function (ubicacion) {
                res.json(ubicacion)
            })
        },
        list:function (req,res) {
            var Ubicacion = app.get('ubicacion');
            Ubicacion.findAll().then(function (ubicaciones) {
                res.json(ubicaciones)
            })
        },
        edit:function (req,res) {
            var Ubicacion = app.get('ubicacion');
            Ubicacion.findOne({
                where: {
                    id_ubicacion: req.body.id_ubicacion
                }
            }).then(function (ubicacion) {
                if(ubicacion){
                    ubicacion.updateAttributes({
                        latitud: req.body.latitud,
                        longitud: req.body.longitud
                    }).then(function (ubicacion) {
                        res.json(ubicacion)
                    })
                }else{
                    res.status(404).send({message: "ubicacion no encontrada"})
                }
            })
        },
        delete:function (req,res) {
            var Ubicacion = app.get('ubicacion');
            Ubicacion.destroy({
                where: {
                    id_ubicacion: req.body.id_ubicacion
                }
            }).then(function (ubicacion) {
                res.json(ubicacion)
            })
        }
    }
}
