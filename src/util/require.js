import axios from 'axios'
const slackToken = 'xoxb-3069594536567-3077559521446-aoXGsRV5XGEA1JySfYBqD2IY'


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