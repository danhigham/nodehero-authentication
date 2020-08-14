const config = {}

config.redisStore = {
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  secret: process.env.REDIS_STORE_SECRET
}

config.google = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  secret: process.env.GOOGLE_CLIENT_SECRET,
  callback: process.env.GOOGLE_CALLBACK
}

module.exports = config
