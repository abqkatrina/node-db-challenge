
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("resources").del()
    .then(function () {
      // Inserts seed entries
      return knex("resources").insert([
        {ResourceName: "computer", Description: "laptop"},
        {ResourceName: "sewing machine", Description: ""},
        {ResourceName: "electricity", Description: ""},
        {ResourceName: "washing machine", Description: ""},
        {ResourceName: "fabric", Description:"cotton cloth"},
        {ResourceName: "internet access", Description:""}
      ]);
    });
};
