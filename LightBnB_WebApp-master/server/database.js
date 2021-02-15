//DB HELPERSSS

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
  //store parameters here
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `

  if(options.city){
    queryParams.push(`${options.city}`);
    queryString += `WHERE city LIKE $${queryParams.length}`;

  } 
  
  if (options.id){
    //check if params exist yet or not
    if(queryPrams.length === 0){
      //no params yet - start where clause
      queryParams.push(`${options.id}`);
      queryString += `WHERE owner_id = $${queryPrams.length}`;
    } else {
      //params exist - add to where clause with AND
      queryParams.push(`${options.id}`);       
      queryString += `AND owner_id = $${queryPrams.length}`;
    }

  }

  if ((options.minimum_price_per_night) && (options.maximum_price_per_night)) {

    if(queryPrams.length === 0){
      //no params exist
      queryParams.push(`${options.minimum_price_per_night}`);
      queryParams.push(`${options.maximum_price_per_night}`);
  
      queryString += `WHERE cost_per_night BETWEEN $${(queryParams.length - 1)} AND $${(queryParams.length)}`;
  
    } else {
      // params exist
      queryParams.push(`${options.minimum_price_per_night}`);
      queryParams.push(`${options.maximum_price_per_night}`);
  
      queryString += `AND cost_per_night BETWEEN $${(queryParams.length - 1)} AND $${(queryParams.length)}`;
  
    }

  }

  if (options.minimum_rating) {

    if(queryPrams.length === 0){

      queryPrams.push(`${options.minimum_rating}`);
      queryString += `WHERE property_reviews.rating >= $${queryParams.length}`;

    } else {

      queryPrams.push(`${options.minimum_rating}`);
      queryString += `AND property_reviews.rating >= $${queryParams.length}`;

    }

  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
 
  
  //OLD RETURN
  // return pool.query(`SELECT properties.*, avg(property_reviews.rating) as average_rating
  // FROM properties
  // JOIN property_reviews ON properties.id = property_id
  // WHERE city LIKE '%ancouv%'
  // GROUP BY properties.id
  // HAVING avg(property_reviews.rating) >= 4
  // ORDER BY cost_per_night
  // LIMIT 10;
  // `, [limit])
  // .then(res => res.rows);
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
