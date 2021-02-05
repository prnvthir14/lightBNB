const properties = require('./json/properties.json');
const users = require('./json/users.json');

//establish postgres connection with lightbnb db
const { Pool, Client } = require('pg')

const pool = new Pool({

  user:'vagrant',
  password: 123,
  host:'localhost',
  database:'lightbnb',
  //port that postgres is running on
  port:5432
});

pool.connect( (err)=> {
  if(err) throw new Error(err);
  console.log('connected to DB')
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return pool.query(
  "SELECT * FROM users WHERE users.email = $1;", [email])
  .then(res => res.rows[0])
  

}

exports.getUserWithEmail = getUserWithEmail;

// let user;
// for (const userId in users) {
//   user = users[userId];
//   if (user.email.toLowerCase() === email.toLowerCase()) {
//     break;
//   } else {
//     user = null;
//   }
// }
// return Promise.resolve(user);

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  return pool.query(
    "SELECT * FROM users WHERE users.id = $1;", [id])
    .then(res => res.rows[0])
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const genInserItems = function (userObject) {
  //store and return items in this
  let varsForQuery = [];
 
  for (let value in userObject){
    
    varsForQuery.push(userObject[value])

  }

  return varsForQuery;

} 

 const addUser =  function(user) {

  //need to store values in user object to pass to my query ($placeholders)

  return pool.query(
  "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;",genInserItems(user))
  // .then(res => console.log(res.rows[0]))  

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const itemsToPass = [guest_id, limit]

  return pool.query(`
    SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS  "average_rating"  
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;
  `, itemsToPass)
  .then(res => {res.rows
    console.log(res.rows.length)
  });

}
exports.getAllReservations = getAllReservations;
//appple barn id = 931;
/// Properties
//tristanjacobs@gmail.com
/**
 * Get all properties.
 * @param {{`SELECT * FROM `}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  return pool.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
  .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
