
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("resources").del()
    .then(function () {
      // Inserts seed entries
      return knex("resources").insert([
        {ResourceName: "computer", Description: "laptop", ProjectID: 1},
        {ResourceName: "sewing machine", Description: "", ProjectID: 2},
        {ResourceName: "electricity", Description: "", ProjectID: 1},
        {ResourceName: "electricity", Description: "", ProjectID: 2},
        {ResourceName: "electricity", Description: "", ProjectID: 3},
        {ResourceName: "washing machine", Description: "", ProjectID: 3},
        {ResourceName: "fabric", Description:"cotton cloth", ProjectID: 2},
        {ResourceName: "internet access", Description:"", ProjectID: 1},
        {ResourceName: "internet access", Description:"", ProjectID: 2}
      ]);
    });
};
