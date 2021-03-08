const { CI_ENVIRONMENT_URL } = process.env
const baseUrl = CI_ENVIRONMENT_URL ? new URL(CI_ENVIRONMENT_URL).pathname.replace(/\/+$/g, '') + '/' : '/'

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : baseUrl
}
