import axios from 'axios'

const isDevelopment =
  await window
    .mainProcess
    .sendAsyncCommand(
      'check-if-is-development'
    )

const developmentBaseUrl =
  'http://localhost:4000'

const productionBaseUrl =
  'https://178-79-138-81.ip.linodeusercontent.com'

const serverBaseUrl = isDevelopment
  ? developmentBaseUrl
  : productionBaseUrl

const serverUrl = `${serverBaseUrl}/api/`

export default function () {
  axios.defaults.baseURL = serverUrl
}
