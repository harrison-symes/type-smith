import * as knex from "knex";

const knexfile = require("../../knexfile")
const env = process.env.NODE_ENV || "development"
const config = knexfile[env]

export default knex(config)