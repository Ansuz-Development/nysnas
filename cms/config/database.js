const path = require("path");

module.exports = ({env}) => ({
  connection: {
    client: env("DATABASE_DIALECT", "sqlite"),
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME"),
      user: env("DATABASE_USERNAME"),
      password: env("DATABASE_PASSWORD"),
      ssl: env.bool("DATABASE_SSL", false),
      filename: path.join(__dirname, "..", env("DATABASE_FILENAME", ".tmp/data.db")),
    },
    useNullAsDefault: true,
  },
});
