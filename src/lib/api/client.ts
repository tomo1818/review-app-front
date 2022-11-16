import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true,
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    // baseURL: 'https://restless-glitter-6164.fly.dev/api/v1',
    // 必要ないかも
    // headers: {
    //   "Content-Type": "multipart/form-data" // 画像ファイルを取り扱うのでform-dataで送信
    // }
  }),
  options,
)

export default client
