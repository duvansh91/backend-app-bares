
module.exports = {
  development: {
    username: process.env.DB_D_USERNAME,
    password: process.env.DB_D_PASSWORD,
    database: process.env.DB_D_NAME,
    host: process.env.DB_D_HOSTNAME,
    dialect: process.env.DB_D_DIALECT
  },
  test: {
    username: process.env.DB_T_USERNAME,
    password: process.env.DB_T_PASSWORD,
    database: process.env.DB_T_NAME,
    host: process.env.DB_T_HOSTNAME,
    dialect: process.env.DB_T_DIALECT
  },
  production: {
    username: process.env.DB_P_USERNAME,
    password: process.env.DB_P_PASSWORD,
    database: process.env.DB_P_NAME,
    host: process.env.DB_P_HOSTNAME,
    dialect: process.env.DB_P_DIALECT
  }
}