/**
 * entryList默认会有一个index入口，如项目中没有index.js，可将它移除，加上你自己的入口配置
 * path是在src目录下的，templatePath是在public目录下
 */
module.exports = {
    // 多入口配置
    entryList: [
        {
            name: "index",
            path: "index.js",
            templatePath: "index.html"
        }
    ],
    // 起别名
    alias: {

    },
    // webpack分析器，默认关闭
    analyzerWebpack: {
        turn: "off",  // 开启的话，属性为on
        port: 11111
    },
    // 用来配置antd样式的less变量
    theme: {

    }
}