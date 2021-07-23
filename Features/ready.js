const { stripIndents } = require('common-tags');
const prefix = '?'

module.exports = (client) => {
    const date = new Date()
    console.log(stripIndents`${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear().toString().padStart(4, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`);

    client.user.setActivity(`${prefix}help`, { type: "WATCHING" })
}

module.exports.config = {
    displayName: 'Ready', // Can be changed any time
    dbName: 'FridaysMongoDB', // Should be unique and NEVER be changed once set
    loadDBFirst: false, // Wait for the database connection to be present
  }