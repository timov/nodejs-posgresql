const env = process.env;

const config = {
  db: {
    /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || "hattie.db.elephantsql.com",
    port: env.DB_PORT || "5432",
    user: env.DB_USER || "gzyqhklu",
    password: env.DB_PASSWORD || "8Qriv1NJdJ8BbwvruruI2iHt72eX7utF",
    database: env.DB_NAME || "gzyqhklu"
  },
  listPerPage: env.LIST_PER_PAGE || 10
};

module.exports = config;
