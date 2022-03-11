import axios from 'axios'
const slackToken = 'your token'


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