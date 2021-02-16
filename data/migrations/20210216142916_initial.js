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
    })
    .createTable("zoos_animals", (tbl) => {
      tbl.integer("zoo_id").references("id").inTable("zoos").notNullable();
      tbl
        .integer("animal_id")
        .references("id")
        .inTable("animals")
        .notNullable();
      //knex.raw will pass 'current_timestamp' without quotes,
      //meaning it's an internal SQL variable and not a
      //literal string
      tbl
        .date("from_date")
        .defaultTo(knex.raw("current_timestamp"))
        .notNullable();
      tbl.date("to_date");
      //since this table doesn't need an ID column, we can make the primary
      //key a combination of two columns rather than a single one
      tbl.primary(["zoo_id", "animal_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("zoos_animals")
    .dropTableIfExists("animals")
    .dropTableIfExists("species")
    .dropTableIfExists("zoos");
};
