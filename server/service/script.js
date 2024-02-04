const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getListByParams(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, address, city, state, contact,email_id,image
    FROM schools LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(SCHOOL){
  console.log(SCHOOL)
  const result = await db.querrsy(
    `INSERT INTO schools (name, address, city, state, contact, email_id, image) values 
    ( '${SCHOOL.name}', '${SCHOOL.address}', '${SCHOOL.city}', '${SCHOOL.state}', ${SCHOOL.contact}, '${SCHOOL.email_id}', '${SCHOOL.image}')`
  );

  let message = 'Error in creating schoolinfomation';

  if (result.affectedRows) {
    console.log(result)
    message = 'School information  created successfully';
  }

  return {message};
}

async function update(id, SCHOOL ){
  const result = await db.query(
    `UPDATE schools
    SET name="${SCHOOL .name}", address=${SCHOOL .Address}, city=${SCHOOL .city}, 
    state=${SCHOOL .state}, Image=${SCHOOL .Image} ,
    Contact_Number=${SCHOOL .Contact_Number} ,emailId=${SCHOOL .emailId} 
    WHERE id=${id}` 
  );

  let message = 'Error in updating school';

  if (result.affectedRows) {
    message = 'school updated successfully';
  }

  return {message};
}









module.exports = {
  getListByParams,
  create,
  update
}