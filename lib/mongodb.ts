import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string; // your mongodb connection string
const options = {};

let client;
let mongoClientConnection: Promise<MongoClient>;

declare global {
  var _mongoClientConnection: Promise<MongoClient>;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientConnection) {
    client = new MongoClient(uri, options);
    global._mongoClientConnection = client.connect();
  }
  mongoClientConnection = global._mongoClientConnection;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  mongoClientConnection = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default mongoClientConnection;
