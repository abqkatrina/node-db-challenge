
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tasks").del()
    .then(function () {
      // Inserts seed entries
      return knex("tasks").insert([
        {TaskDescription: "fork and clone repo", ProjectID: 1, Notes: "", Completed: true},
        {TaskDescription: "create database and endpoints", ProjectID: 1, Notes: "", Completed: false},
        {TaskDescription: "commit, push and request pull", ProjectID: 1, Notes: "add TL to review", Completed: false},
        {TaskDescription: "cut fabric", ProjectID: 2, Notes: "2 10x6in rectangles, 4 12in straps per mask", Completed: true},
        {TaskDescription: "sew together", ProjectID: 2, Notes: "remember to sew three sides inside-out first", Completed: true},
        {TaskDescription: "wash", ProjectID: 3, Notes:"mix laundry, hot water, and detergent in machine", Completed: false}
      ]);
    });
};
