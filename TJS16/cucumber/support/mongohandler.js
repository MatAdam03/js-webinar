const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const database = "cucumbertest";
const collection = "testdata"
async function GetData(n) {     
    const query =  await client.db(database).collection(collection).find({Datanumber:parseInt(n)}).toArray(); 
    const data = query.reduce(
        (result, ps) => {
            result = ps;
            return result;
        },
        {});
    return data;
};
async function MongoConnect() {
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    }
}
async function MongoClose() {
    try {
        await client.close();
    } catch (e) {
        console.error(e);
    }
}

module.exports={MongoClose,MongoConnect,GetData}