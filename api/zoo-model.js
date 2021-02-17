const db = require("../data/db-config");

module.exports = {
  findAnimals,
};

function findAnimals(zooId) {
  return (
    //left table to start

    db("zoos_animals as za")
      //next, join za to z
      //Our 3 parameters:
      //1. the table I'm joining to za
      //2. the point to which I'm joining z to za
      //3. za joining point to z
      //you're basically joining zoo and zoo animals at the zoo id
      //and the zoo animal id
      .join("zoos as z", "z.id", "za.zoo_id")
      .join("animals as a", "a.id", "za.animal_id")
      //filter based on the zooId
      //   .where("za.zoo_id", zooId)
      //or
      .where("z.id", zooId)
      //select specif columsn to show
      .select("a.*", "z.zoo_name")
  );
}
