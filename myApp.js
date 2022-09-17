require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

let personSchema  = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age:  Number,
  favoriteFoods: [String]
})

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const newPerson = new Person({name: "first Person", age: 33, favoriteFoods: ["meat", "potato"]});
  newPerson.save((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err, people) => {
    if (err) return console.log(err);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},(err, found) => {
    if (err) return console.log(err);
    done(null, found);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food},(err, found) => {
    if (err) return console.log(err);
    done(null, found);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err, found) => {
    if (err) return console.log(err);
    done(null, found);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err, found) => {
    if (err) return console.log(err);
    found.favoriteFoods.push(foodToAdd);
    found.save((err, data) => {
      if (err) return console.error(err);
      done(null, data)
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId,(err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name: nameToRemove},(err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(error, people) {
    if (error) return console.log(error);
    done(null, people);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
