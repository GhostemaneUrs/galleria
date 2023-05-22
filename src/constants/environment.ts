export const URL_GATEWAY =
  process.env.NEXT_APP_URL_PROTOCOL +
  (process.env.NEXT_APP_URL_BASE != null ? process.env.NEXT_APP_URL_BASE : '') +
  process.env.NEXT_APP_URL_PORT
