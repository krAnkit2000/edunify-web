const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      user: "root",
      password: "",
      database: "SCHOOL",
      connectTimeout: 600000
    },
    listPerPage: 10,
  };
  module.exports = config;