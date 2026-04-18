const db = require('../db/db');

exports.addSchool = (data, callback) => {
  const query = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, data, callback);
};

exports.getAllSchools = (callback) => {
  db.query("SELECT * FROM schools", callback);
};