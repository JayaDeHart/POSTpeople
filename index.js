const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const personSchema = new dynamoose.Schema({
  primarykey: String,
  name: String,
  age: Number,
  nickName: String,
});

const Person = dynamoose.model('lab-18-people', personSchema);

exports.handler = async (event) => {
  const { name, age, nickName } = JSON.parse(event.body);

  try {
    let newPerson = await Person.create({
      primarykey: uuidv4(),
      name,
      age,
      nickName,
    });
    return {
      message: 'created',
      person: JSON.stringify(newPerson),
    };
  } catch (err) {
    return {
      err: err,
      message: 'There was an error',
    };
  }
};
