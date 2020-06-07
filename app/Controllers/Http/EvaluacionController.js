'use strict'

const Proyecto = use('App/Models/Proyecto');
const Evaluacion = use('App/Models/Evaluacion');
const Tarea = use('App/Models/Tarea');
const AutorizacionService = use('App/Services/AutorizacionService');

class EvaluacionController {

    async index({ auth, params}){
        const user  = await auth.getUser();
        const {id} = params;
        const proyecto = await Proyecto.find(id);
        const tareas = await Tarea.find(id);
        //AutorizacionService.verificarPermiso(proyecto, user);
        return await tareas.evaluacions().fetch(); 
    }

    async create({auth, request, params}){
        const user = await auth.getUser();
        const {description} = request.all();
        const {id} = params;
        const proyecto = await Proyecto.find(id);
        const tareas = await Tarea.find(id);
        //AutorizacionService.verificarPermiso(proyecto, user);
        const evaluacion = new Evaluacion();
        evaluacion.fill({
            description
        });
        await tareas.evaluacions().save(evaluacion);
        return evaluacion;

    /*async create({ auth, request, params }){
        const user = await auth.getUser();
        const { description } = request.all();
        const { aprobada } = request.all();
        const { id } = params;
        const tarea = await Tarea.find(id);
        //AutorizacionService.verificarPermiso(tarea, user);
        const evaluacion = new Evaluacion();
        evaluacion.fill({
            description,
            aprobada
        });
        await tarea.tareas().save(evaluacion);
        return evaluacion;
    */
    }

    async update({auth, params, request}){
        const user = await auth.getUser();
        const {id} = params;
        const evaluacion = await Evaluacion.find(id);
        const tarea = await evaluacion.tareas().fetch();
        const proyecto = await tarea.proyecto().fetch();
        //AutorizacionService.verificarPermiso(proyecto, user);
        evaluacion.merge(request.only([
            'description',
            'aprobada'
            ]))
        await evaluacion.save();
        return evaluacion;
    }

    async destroy({auth, params}){
        const user = await auth.getUser();
        const {id} = params;
        const evaluacion = await Evaluacion.find(id);
        const tarea = await evaluacion.tareas().fetch();
        const proyecto = await tarea.proyecto().fetch();
        //AutorizacionService.verificarPermiso(proyecto, user);
        await evaluacion.delete();
        return evaluacion;
    }


}

module.exports = EvaluacionController
