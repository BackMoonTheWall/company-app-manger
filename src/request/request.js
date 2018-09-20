import axios from "axios";
import { message } from "antd";
import { browserHistory } from 'react-router';
import querystring from 'query-string';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const request = {
  handleData: function (res, resolve, reject) {
    let data = res.data;
    if (data.head && data.head.status === "Y") {
      resolve(data.body);
    }else {
      message.destroy();
      let code = data.head.code,
        errorInfo = data.head.msg;
      if (code === "11111114") {
        message.error(errorInfo, 2, () => {
          let redirect = this.props.location.pathname;
          browserHistory.push({
            pathname: '/login',
            search: `?redirect=${encodeURIComponent(redirect)}`
          });
          localStorage.clear();
        })
        return;
      }
      message.error(errorInfo, 3);
      reject && reject(data);
    }
  },
  post: function (url, params, type) {
    let _this = this,
      config = {};
    if (type && type == "json") {
      config = {
        headers: {
          post: {
            'Content-Type': 'application/json'
          }
        }
      }
    } else if (type && type == "file") {
      config = {
        headers: {
          post: {
            'Content-Type': 'multipart/form-data'
          }
        }
      }
    } else {
      params = querystring.stringify(params);
    }
    return new Promise((resolve, reject) => {
      axios.post(url, params, config).then((res) => {
        _this.handleData(res, resolve, reject);
      })
    })
  },
  get: function (url) {
    let _this = this;
    return new Promise((resolve, reject) => {
      axios.get(url).then((res) => {
        _this.handleData(res, resolve, reject);
      })
    })
  }
};

export default request;