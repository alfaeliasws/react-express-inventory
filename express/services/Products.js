const db = require("./db");
const helper = require("../helper");

function variableInitiator () {
    let success = 0;
    let message = "Data not found";
    let status = 204;
    let jobs = [];
    
    return {success, message, status, jobs}
}
async function getAll() {

  let {success, message, status, products}  = variableInitiator()

  const result = await db.query(`SELECT * FROM inventory WHERE deleted_at IS NULL`)
  products = helper.emptyOrRows(result);

  
  if ((result?.length ?? 0) > 0) {
    success = 1;
    status = 200;
    message = "Fetch Success";
    tasks = result.slice(0,10);
  }

  return {
    success,
    status,
    message,
    products
  };
}

async function getById(id) {
    let {success, message, status, products}  = variableInitiator()
    const result = await db.query(`SELECT * FROM inventory WHERE deleted_at IS NULL AND id = ?`, [id])
    tasks = helper.emptyOrRows(result);

    if (result) {
      success = 1;
      status = 200;
      message = "Data found";
      products = result;
    }

    return {
        success,
        status,
        message,
        products,
    };

}
async function create(body) {
  let {success, message, status, products}  = variableInitiator()

  const result = await db.query(`INSERT INTO inventory (name, stock) VALUES (? , ?)`, [body.name, body.stock])
  products = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Add Success";
    products = result;
  }

  return {
      success,
      status,
      message,
      products,
  };

}

async function update(id, body) {

  console.log(id, body)

  let {success, message, status, products}  = variableInitiator()
  const result = await db.query(`UPDATE inventory set name = ?, stock = ? WHERE id = ? AND deleted_at IS NULL`, [body.name, body.stock, id])
  products = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Update Success";
    products = result;
  }

  return {
      success,
      status,
      message,
      products,
  };

}

async function remove(id) {
  let {success, message, status, products}  = variableInitiator()
  
  const result = await db.query(`UPDATE inventory set deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL`, [id]);
  
  products = helper.emptyOrRows(result);

  if (result) {
    success = 1;
    status = 200;
    message = "Remove Success";
    products = result;
  }

  return {
      success,
      status,
      message,
      products,
  };
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
