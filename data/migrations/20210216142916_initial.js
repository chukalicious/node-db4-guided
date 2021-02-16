exports.up = function (knex) {
  //the order to create tables is to start with the tables that do not
  //depend on other tables
  //zoos
  //species
  //animals
  //zoo-animals
  return knex.schema
    .createTable("zoos", (tbl) => {
      tbl.increments("id");
      tbl.text("zoo_name").notNullable();
      tbl.text("address").notNullable().unique();
    })
    .createTable("species", (tbl) => {
      tbl.increments("id");
      tbl.text("species_name").notNullable().unique();
    })
    .createTable("animals", (tbl) => {
      tbl.increments("id");
      tbl.text("animal_name").notNullable();
      //the line below creates a foreign key
      tbl.integer("species_id").references("id").inTable("species");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("animals")
    .dropTableIfExists("species")
    .dropTableIfExists("zoos");
};
