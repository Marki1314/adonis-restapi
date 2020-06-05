'use strict'

const Evaluacion = use('App/Models/Evaluacion');
const Tarea = use('App/Models/Tarea');
const AutorizacionService = use('App/Services/AutorizacionService');

class EvaluacionController {
    async index({ auth, request, params }){
        const user = await auth.getUser();
        const { id } = params;
        const evaluacion = await Evaluacion.find(id);
        AutorizacionService.verificarPermiso(evaluacion, user);
        return await evaluacion.tareas().fetch();
    }

    async create({ auth, request, params }){
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
    }
}

module.exports = EvaluacionController
