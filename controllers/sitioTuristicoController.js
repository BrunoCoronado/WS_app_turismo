/**
 * Created by informatica on 06/05/2016.
 */
module.exports = function (app) {
    return{
        add:function (req,res) {
            var SitioTuristico = app.get('sitioTuristico');
            SitioTuristico.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                departamentoIdDepartamento: req.body.id_departamento,
                ubicacionIdUbicacion: req.body.id_ubicacion
            }).then(function (sitio) {
                res.json(sitio)
            })
        },
        list:function (req,res) {
            var SitioTuristico = app.get('sitioturistico');
            SitioTuristico.findAll().then(function (sitios) {
                res.json(sitios)
            })
        },
        edit:function (req,res) {
            var SitioTuristico = app.get('sitioturistico');
            SitioTuristico.findOne({
                where:{
                    id_sitioTuristico: req.body.id_sitioTuristico
                }
            }).then(function (sitio) {
                if(sitio){
                    sitio.updateAttributes({
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion,
                        departamentoIdDepartamento: req.body.departamentoIdDepartamento,
                        ubicacionIdUbicacion: req.body.ubicacionIdUbicacion
                    })
                }else{
                    res.status(404).send({messages: "sitio turistico no encotrado"})
                }
            })
        },
        delete:function (req,res) {
            var SitioTuristico = app.get('sitioturistico');
            SitioTuristico.destroy({
                where:{
                    id_sitioTuristico: req.body.id_sitioTuristico
                }                
            }).then(function (sitio) {
                res.json(sitio)
            })
        }
    }
}
