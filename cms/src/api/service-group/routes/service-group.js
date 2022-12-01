/**
 * service-group router
 */

const {createCoreRouter} = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::service-group.service-group");
