import React, { Component } from 'react';
import { DatePicker, MPagination } from "zcmui"
import { Breadcrumb ,Input,Form,Button,Icon,TreeSelect,Table } from 'antd';
import axios from 'axios'
import './index.less'
import Requests from '../../request/index'
const Search = Input.Search;
const FormItem = Form.Item;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
class AppWhiteListConfig1 extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            tablevalue:[],
            visible: false,
            value: [],
            treeData: [{
                title: 'Node1',
                value: '0-0',
                key: '0-0',
            }, {
                title: 'Node2',
                value: '0-1',
                key: '0-1',

            }],

         }
    }
    componentDidMount(){
        Requests.login().then(res =>{
            console.log(res)
            this.setState({tablevalue:res})
        })
    }
    add = () => {
       this.setState({visible:true});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleReset = () => {
        this.setState({value:[]})
    }
    onChange = (value) => {
        console.log('onChange ', value);
        this.setState({ value });
    }
    render() {

        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };

        const tProps = {
            treeData:this.state.treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
                width: '50%',
            },
        };
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
        return (
            <div className="app-whitelist-centent">
                <div className="app-whitelist-header" style = {{marginLeft:"20px"}}>
                    <h1>应用白名单权限管理</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item>数据权限管理</Breadcrumb.Item>
                        <Breadcrumb.Item><a href=""> 应用白名单权限管理</a></Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="app-whitelist-input" style={{marginTop:"15px",textAlign:"center"}}>
                        <Search
                            placeholder="请输入应用AppCode"
                            onSearch={value => console.log(value)}
                            enterButton="搜索"
                        />
                        <br/>
                        <span className="app-whitelist-undertext">此部分管理功能仅能增加「可浏览」权限，无法针对其他权限进行管理。</span>
                    </div>
                </div>
                <div className="app-whitelist-table" >
                    <h1>-查询结果-</h1>
                    <Table
                        columns={columns}
                        dataSource={this.state.tablevalue}
                    />
                </div>
                <div className="app-whitelist-form" style={{textAlign:"center"}}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayoutWithOutLabel}>
                            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                                <Icon type="plus" /> 添加可浏览人员
                            </Button>
                        </FormItem>
                            {this.state.visible?<div>可添加人员：<TreeSelect {...tProps} /></div>:null}

                        <FormItem {...formItemLayoutWithOutLabel} style={{marginTop:"30px"}}>
                            <Button className="app-btn-cancle" onClick={this.handleReset} style={{marginRight:"10px"}}>取消</Button>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </FormItem>

                    </Form>
                </div>
                {/*<footer>*/}
                    {/*copyright 2018 亿企赢网络科技有限公司杭州研发分公司 B端技术委员会*/}
                {/*</footer>*/}
            </div>
        )
    }
}
const AppWhiteListConfig = Form.create()(AppWhiteListConfig1);
export default AppWhiteListConfig;