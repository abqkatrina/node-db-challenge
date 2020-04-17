
exports.up = function(knex) {
  return knex.schema
  .createTable('projects', tbl => {
    tbl.increments();
    tbl.text('ProjectName', 100)    
        .unique()
        .notNullable();
    tbl.text('ProjectDescription', 255);
    tbl.boolean('Completed')
        .notNullable()
        .defaultTo(false);
  })
  .createTable('resources', tbl => {
    tbl.increments();
    tbl.text('ResourceName', 100)    
        .unique()
        .notNullable();
    tbl.text('Description',255);
    })
    .createTable('tasks', tbl => {
        tbl.increments();
        tbl.text('TaskDescription', 255)
            .notNullable();
        tbl.integer('ProjectID')
            .notNullable
            .references('ID')
            .inTable('projects');
        tbl.integer('StepNumber');
        tbl.text('TaskNotes', 255);
        tbl.boolean('Completed')
            .notNullable()
            .defaultTo(false);
    })
};

exports.down = function(knex) {
  
};
