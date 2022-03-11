/*eslint-disable*/
const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // 連線別名
        target: "https://slack.com/api", // 代理對象https://slack.com/api/ conversations.list?pretty=1
        changeOrigin: true, // 是否為虛擬主機
        pathRewrite: {
          "^/api": "", // /別名 所代表的位子
        }
      }
    }
  },
};