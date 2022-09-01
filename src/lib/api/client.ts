import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true,
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:3000/api/v1',
  }),
  options,
)

export default client
