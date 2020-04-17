
exports.up = function(knex) {
    return knex.schema
    .createTable('project_resources', tbl => {
      tbl.integer('ProjectID')    
          .notNullable()
          .references('ID')
          .inTable('projects');
      tbl.integer('ResourceID')
         .notNullable()
         .references('ID')
         .inTable('resources');
      tbl.primary(['ProjectID', 'ResourceID']);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('project_resources');
};
