const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);


module.exports =
{
    findProjects,
    findProjectById,
    findResources,
    findTasks,

    addProject,
    addResource,
    addTask,

    updateProject,
    updateResource,
    updateTask,
    
    removeProject,
    removeResource,
    removeTask
};

function findProjects() {
    return db('projects');
};

function findProjectById(id) {
    return db('projects')
    .where({ id })
    .first();
};

function findResources(ProjectID) {
    return db('resources')
    .where({ ProjectID })
    .orderBy('resources.ResourceName');
};

function findTasks(ProjectID) {
    return db('tasks')
    .where({ ProjectID })
    .orderBy('tasks.StepNumber');
};

function addProject(project){
    return db('projects')
    .insert(project)
    .then(project => {
        return(project)
    });
};

function addResource(resource){
    return db('resources')
    .insert(resource)
    .then(resource => {
        return(resource)
    });
};

function addTask(task){
    return db('tasks')
    .insert(task)
    .then(task => {
        return(task)
    });
};

function updateProject(changes, id) {
    return db('projects')
    .where({ id })
    .update(changes);
};

function updateResource(changes, id) {
    return db('resources')
    .where({ id })
    .update(changes);
};

function updateTask(changes, id) {
    return db('tasks')
    .where({ id })
    .update(changes);
};

function removeProject(id){
    return db('projects')
    .where({ id })
    .del();
};

function removeResource(id){
    return db('resources')
    .where({ id })
    .del();
};

function removeTask(id){
    return db('tasks')
    .where({ id })
    .del();
};