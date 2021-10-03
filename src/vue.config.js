module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/cron-generator-vue/'
      : '/'
  }