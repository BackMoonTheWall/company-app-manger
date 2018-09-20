import request from "./request";
import querystring from 'query-string'
const prefix = "/还未定义";
const mockPrefix = '';
let mock = true;
let API = {
    login: prefix + '/还未定义'
};
if(mock){                 //本地mock下的请求地址 (if needed)
    API = {
        login: mockPrefix + '/',
        tableList: mockPrefix + './data/whitelist.json',
        getProductList:mockPrefix+'./data/options.json',
        saveBasicApp:mockPrefix+'/还没填写'
    }
}
 const Requests= {
   login: (params) => request.get(API.tableList + "?" + querystring.stringify(params)),
   getProductList: (params) => request.get(API.getProductList, params),
   saveBasicApp: (params) => request.post(API.saveBasicApp, params)
 };
export default Requests



