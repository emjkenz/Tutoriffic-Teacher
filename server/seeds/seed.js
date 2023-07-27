const db = require('../config/connection');
const { Student } = require('../models/Student');

const studentData = require('./techData.json');

db.once('open', async () => {
  await Student.deleteMany({});

  const Students = await Student.insertMany(studentData);

  console.log('Students seeded!');
  process.exit(0);
});
