/**
 * Created by informatica on 06/05/2016.
 */
module.exports=function (app) {
    return{
        add:function (req,res) {
            var Departamento = app.get('departamento');
            Departamento.create({
                nombre: req.body.nombre
            }).then(function (departamento) {
               res.json(departamento);
            });
        },
        list:function (req,res) {
            var Departamento = app.get('departamento');
            Departamento.findAll().then(function (departamentos) {
                res.json(departamentos)
            });
        },
        edit:function (req,res) {
            var Departamento = app.get('departamento');
            Departamento.findOne({
                where: {
                    id_departamento: req.body.id_departamento
                }
            }).then(function (departamento) {
                if(departamento){
                    departamento.updateAttributes({
                       nombre: req.body.nombre
                    }).then(function (departamento) {
                        res.json(departamento);
                    });
                }else{
                    res.status(404).send({ message: "departamento no encontrado"})
                }
            });
        },
        delete:function (req,res) {
            var Departamento = app.get('departamento');
            Departamento.destroy({
                where: {
                    id_departamento: req.body.id_departamento
                }
            }).then(function (departamento) {
                res.json(departamento);
            });
        }
    }
}

