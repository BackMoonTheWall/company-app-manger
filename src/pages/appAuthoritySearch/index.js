/**
 * Created by BKMR on 2017-9.
 */
import React, { Component } from 'react';
import { DatePicker, MPagination } from "zcmui"
import { Breadcrumb ,Form,Input, Button,Table} from 'antd';
import './index.less';
import axios from "axios/index";

const FormItem = Form.Item;
class AppAuthoritySearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            tableValue:[],

        }
    }
    componentDidMount(){
        axios.get('./data/whitelist.json').then(result => {
            if(result.data.head.code === '00000000'){
                this.setState({tableValue:result.data.body})
            }
        })
    }
    render() {
        const columns = [
            {
                title: '编号',
                dataIndex: 'number',
                width: '10%',
                align:"center",
            }, {
                title: 'App Code',
                dataIndex: 'appcode',
                width: '10%',
                align:"center",
            }, {
                title: '应用名',
                dataIndex: 'appname',
                width:"30%",
                align:"center",
            }, {
                title: '部门',
                dataIndex: 'department',
                width: '10%',
                align:"center",
            }, {
                title: '相关人员',
                dataIndex: 'person',
                width: '10%',
                align:"center",
            }, {
                title: '人员与应用关系',
                dataIndex: 'relation',
                width: '10%',
                align:"center",
            }

        ];
        const footer = () => (<MPagination
            defaultCurrent={1}
            total={50}
            showQuickJumper={true}
            showSizeChanger={true}
        />);
        return (
            <div className="app-search-content">
              <div className="app-search-header" style={{marginLeft:"20px"}}>
                  <h1>应用数据权限查找</h1>
                  <Breadcrumb>
                      <Breadcrumb.Item>数据权限管理</Breadcrumb.Item>
                      <Breadcrumb.Item><a href="">应用数据权限查询</a></Breadcrumb.Item>
                  </Breadcrumb>
                  <div className="add-search-input" style={{marginTop:"30px"}}>
                      <span>请输入应用AppCode或员工姓名查找相关权限</span>
                      <Form layout="inline" className="login-form" >
                          <FormItem
                              label="AppCode"
                              hasFeedback
                              validateStatus="success"
                          >
                              <Input placeholder="I'm the content" id="success" />
                          </FormItem>

                          <FormItem
                              label="员工姓名"
                              hasFeedback
                              validateStatus="error"
                          >
                              <Input placeholder="I'm the content" id="error" />
                          </FormItem>
                          <div style={{textAlign:"center",marginTop:"42px"}}>
                              <Button type="primary" htmlType="submit" className="login-form-button">
                                  搜寻
                              </Button>
                          </div>
                      </Form>
                  </div>
              </div>
              <div className="app-search-table">
                <h1>-查询结果-</h1>
                <Table
                    columns={columns}
                    dataSource={this.state.tableValue}
                    pagination={false}
                    footer={footer}
                />
              </div>

            </div>
        )
    }
}

export default AppAuthoritySearch;