
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects").del()
    .then(function () {
      // Inserts seed entries
      return knex("projects").insert([
        {Name:"sprint challenge", Description: "pass this week's test", Completed: false},
        {Name:"make masks", Description: "sew face masks", Completed: false},
        {Name:"laundry", Description: "", Completed: true}
      ]);
    });
};
