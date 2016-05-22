/**
 * Created by informatica on 06/05/2016.
 */
module.exports = function (app) {
    return{
        add:function (req,res) {
            var Hotel = app.get('hotel');
            Hotel.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                ubicacionIdUbicacion: req.body.id_ubicacion,
                departamentoIdDepartamento: req.body.id_departamento
            }).then(function (hotel) {
                res.json(hotel)
            })
        },
        list:function (req,res) {
            var Hotel = app.get('hotel');
            Hotel.findAll().then(function (hoteles) {
                res.json(hoteles)
            })
        },
        edit:function (req,res) {
            var Hotel = app.get('hotel');
            Hotel.findOne({
                where:{
                    id_hotel: req.body.id_hotel
                }
            }).then(function (hotel) {
                if(hotel){

                }else{
                    res.status(404).send({message: "hotel no encontrado"})
                }
            })
        },
        delete:function (req,res) {
            var Hotel = app.get('hotel');
            Hotel.destroy({
                where:{
                    id_hotel: req.body.id_hotel
                }
            }).then(function (hotel) {
                res.json(hotel)
            })
        }
    }
}