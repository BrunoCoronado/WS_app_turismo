/**
 * Created by informatica on 06/05/2016.
 */
module.exports = function (app) {
    return{
        add:function (req,res) {
            var Comentario = app.get('comentario');
            Comentario.create({
                comentario: req.body.comentario,
                usuarioIdUsuario: req.body.id_usuario,
                sitioturisticoIdSitioTuristico: req.body.id_sitioTuristico
            }).then(function (comentario) {
                res.json(comentario)
            })
        },
        list:function (req,res) {
            var Comentario = app.get('comentario');
            Comentario.findAll().then(function (comentarios) {
                res.json(comentarios)
            })
        },
        edit:function (req,res) {
            var Comentario = app.get('comentario');
            Comentario.findOne({
                where:{
                    id_comentario: req.body.id_comentario
                }
            }).then(function (comentario) {
                if(comentario){
                    comentario.updateAttributes({
                        comentario: req.body.comentario
                    }).then(function (comentario) {
                        res.json(comentario)
                    })
                }else{
                    res.status(404).send({message: "comentario no encontrado"})   
                }                    
            })
        },
        delete:function (req,res) {
            var Comentario = app.get('comentario');
            Comentario.destroy({
                where:{
                    id_comentario: req.body.id_comentario
                }
            }).then(function (comentario) {
                res.json(comentario)
            })
        }
    }
}
