const { MongoClient } = require('mongodb');
function getMongoData(client, database, collection) {
    return client.db(database).collection(collection).find({}).toArray();
};
async function MongoConnect() {
    var uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);
    const database = "mochatest";
    const collection = "mochatestdata"
    try {
        await client.connect();
        return await getMongoData(client, database, collection);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
module.exports={MongoConnect}