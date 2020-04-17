
exports.up = function(knex) {
  return knex.schema
  .createTable('projects', tbl => {
    tbl.increments();
    tbl.text('Name', 100)    
        .unique()
        .notNullable();
    tbl.text('Description', 255);
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
            .notNullable()
            .references('ID')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.integer('StepNumber');
        tbl.text('Notes', 255);
        tbl.boolean('Completed')
            .notNullable()
            .defaultTo(false);
    })
};


exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('projects')
      .dropTableIfExists('resources')
      .dropTableIfExists('tasks');
  };
  
