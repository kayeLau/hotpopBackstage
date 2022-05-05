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

function getTimeStamp(flag) {
    let startTime;
    let time = new Date();
    if (flag === "month") {
      time.setDate(1);
    } else {
      time.setDate(time.getDate() - time.getDay());
    }
    time.setHours(0);
    startTime = time.getTime() + "000";
    startTime = startTime.slice(0, 10) + "." + startTime.slice(10);
    return startTime;
  }

  async function getChannelsList() {
    let channelsList = {}
    await slack.get("/conversations.list").then(res => {
      res.data.channels.forEach(item => {
        channelsList[item.name] = item.id;
      });
    });
    return channelsList
  }

  async function getHistoryMsg(option) {
    let historyMsg = [];
    let historyMsgInPay = [];
    let startTime = option.range === "week" ? getTimeStamp("week") : getTimeStamp("month");
    let channel = await getChannelsList();
    await slack
      .get(
        `/conversations.history?channel=${channel[option.shop]}&pretty=1&oldest=${startTime}`
      )
      .then(res => {
        res.data.messages.forEach(item => {
          item.subtype === "bot_message" ? historyMsg.push(item) : null;
          item.subtype === "bot_message";
          item.reactions ? historyMsgInPay.push(item) : null;
        });
      })
      .catch(err => {
        console.log(err);
      });
      return [historyMsg, historyMsgInPay]
  }

export { slack, getHistoryMsg}