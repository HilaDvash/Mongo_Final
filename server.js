const mongoose = require("mongoose");

function main() {}

function getPetsAndVets(owner) {
  mongoose.connect("mongodb://localhost:27017/Pets");

  //get all collections
  mongoose.connection.on("open", function (ref) {
    console.log("connected");
    //collections names
    // mongoose.connection.db.listCollections().toArray(function (err, names) {
    //   console.log(names);
    // });

    //find
    const collection = mongoose.connection.db.collection("Owners");
    collection.find({ firstName: owner }).toArray(function (err, data) {
      console.log("find: ");
      let animalsIds = data[0].animals;
      //console.log(animalsIds);

      //animals
      console.log("animals");
      for (let i = 0; i < animalsIds.length; i++) {
        console.log(animalsIds[i]);
        let animalId = animalsIds[i];

        const collection = mongoose.connection.db.collection("Animals");
        collection.find({ id: animalId }).toArray(function (err, data) {
          if (data && data.length > 0) console.log(data);
        });
      }

      let vetId = data[0].vetid;
      console.log("vet id: ");
      console.log(vetId);
      const collection = mongoose.connection.db.collection("Vets");
      collection.find({ id: vetId }).toArray(function (err, data) {
        console.log(data);
      });
    });
  });
}

getPetsAndVets("name1");
