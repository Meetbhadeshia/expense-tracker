import { MongoClient } from 'mongodb';

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient>; // or the correct type if different
}

// This file needs to be treated as a module
export { };