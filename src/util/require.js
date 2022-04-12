import axios from 'axios'
// const slackToken = 'you token here'
const slackToken = process.env.VUE_APP_NOT_SECRET_CODE

const headers = {
    "Authorization":'Bearer' + ' ' + slackToken,
    'Content-Type': 'application/x-www-form-urlencoded'
}

const slack = axios.create({
    baseURL:"/api",
    timeout: 50000,
    headers
})

export { slack }