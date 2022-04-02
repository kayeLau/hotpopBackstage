import axios from 'axios'
// const slackToken = 'you token here'
const slackToken = process.env.VUE_APP_NOT_SECRET_CODE
console.log(slackToken)


axios.defaults.timeout = 50000;
const headers = {
    "Authorization":'Bearer' + ' ' + slackToken,
    'Content-Type': 'application/x-www-form-urlencoded'
}

export class RequireApi{
    static getHttp(url){
        return axios.get(
        url,
        { headers }
        )
    }
}