const db = require("./db");
const helper = require("../helper");

async function getMultiple(page = 1) {
  const rows = await db.query(
    "SELECT id, title, sync_state, sync_message, sync_date FROM client"
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

function validateCreate(client) {
  let messages = [];

  console.log(client);

  if (!client) {
    messages.push("No object is provided");
  }

  if (!client.title) {
    messages.push("Title is empty");
  }

  if (!client.sync_state) {
    messages.push("SyncState is empty");
  }

  if (!client.sync_message) {
    messages.push("SyncMessage is empty");
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

async function create(client) {
  validateCreate(client);

  const rows = await db.query("SELECT * FROM client WHERE title = $1", [
    client.title
  ]);

  const data = helper.emptyOrRows(rows);

  if (data.length) {
    const result = await db.query(
      "UPDATE client SET sync_state = $1, sync_message = $2, sync_date = GETDATE() WHERE title = $3",
      [client.sync_state, client.sync_message, client.title]
    );

    let message = "result";

    if (result.length) {
      message = "result";
    }

    return { message };
  }

  const result = await db.query(
    "INSERT INTO client (title, sync_state, sync_message) VALUES ($1, $2, $3) RETURNING *",
    [client.title, client.sync_state, client.sync_message]
  );
  let message = "Error in creating client";

  if (result.length) {
    message = "Client created successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create
};
