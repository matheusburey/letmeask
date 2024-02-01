const settings = {
  databaseUrl: process.env.DATABASE_URL ?? 'mongodb://mongo',
  databaseName: process.env.DATABASE_NAME ?? 'cruel-doubt'
}
export default  settings