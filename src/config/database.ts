import { MongoClient, Db } from 'mongodb'
import settings from './settings'

const client = new MongoClient(settings.databaseUrl)

export class Database {
   async connect() {
      const conn = await client.connect()
      const db = conn.db(settings.databaseName)
      return { conn, db }
   }
}