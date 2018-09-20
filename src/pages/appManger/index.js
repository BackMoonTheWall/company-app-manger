import React, { Component } from 'react';
import { DatePicker, MPagination } from "zcmui"
import {Breadcrumb,Button,Radio,Table,Input,Icon,Modal} from 'antd'
import CreateApp from './createApp'
import AppDetail from './appDetail'
import AppRelationConfig from './appRelationConfig'
import AppsMap from './appsMap'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const tableHeight=window.innerHeight-400;
function handleColumns(that){
  const columns=[
    {
      title: '编号',
      dataIndex: 'no',
      key: 'no',
      align:'center',
      width:'5%'
    },
    {
      title: 'AppCode',
      dataIndex: 'AppCode',
      key: 'AppCode',
      align:'center',
      width:'15%'
    },
    {
      title: '应用名',
      dataIndex: 'appName',
      key: 'appName',
      align:'center',
      width:'20%'
    },
    {
      title: '应用描述',
      dataIndex: 'description',
      key: 'description',
      align:'center',
      width:'12%'
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      align:'center',
      width:'18%'

    },
    {
      title: '操作',
      key: 'options',
      dataIndex: 'options',
      width:'40%',
      align:'center',
      render: tags => (
        <div>
          <Button onClick={()=>that.setState({switchCode:2})}>查看详情</Button>
          <Button onClick={()=>that.setState({switchCode:3})}>应用修改</Button>
          <Button onClick={()=>that.setState({switchCode:4})}>应用关系管理</Button>
          <Button onClick={()=>that.setState({visible:true})}>应用弃用</Button>
        </div>
      ),
    }
  ];
  return columns;
}
let tableSource=[];
for(let i=0;i<10;i++){
  tableSource.push({key:i,no:i+1,AppCode:'xqy-boss',appName:'运营平台',description:'我是很长长长长长长长长长一段话',department:'小企业',options:'none'})
}
class AppManger extends Component {
  constructor(props){
    super(props);
    this.state={
      switchCode:0,
      visible:false,
      appData:{"id" : "应用ID  1",
        "appName" : "应用名 亿企代帐国税",
        "appMidCode" : "应用代号 NationTax",
        "appCode" : "应用Code",
        "productCode" : "产品Code 17dz",
        "appId" : "应用唯一数字Id",
        "department" : "XQ",
        "serviceOwner" : "serviceOwner Gaoty",
        "status" : "应用状态 active/delete",
        "assembly" : "封装类型 zip/war/jar ",
        "devloper" : "开发人员",
        "minMemory" : "最小内存 默认4G",
        "sourceCode" : "源码库",
        "createTime" : "创建时间 yyyy-MM-dd HH:mm:ss ",
        "modifyTime" : "修改时间 yyyy-MM-dd HH:mm:ss "
      }
    }
  }
  changeSwitchCode(code){      //用于子组件改变父组件状态
    this.setState({switchCode:code})
  }
  submit(params){       //子组件提交表单后的参数传到父组件

  }
    render() {
    const columns=handleColumns(this);
    const {switchCode}=this.state;
        return (
            <div>
              {switchCode===0&&
              <div>
                <div className='appHeader'>
                  <h1>应用管理列表</h1>
                  <div style={{float:'right',marginTop:'-48px'}}>
                    <Icon type="search" />
                    <Input
                      style={{width:'150px',marginLeft:'5px',marginRight:'5px'}}
                      placeholder='输入应用关键字'
                    />
                    <Button type='primary'>搜索</Button>

                  </div>

                  <Breadcrumb>
                    <Breadcrumb.Item>资产管理</Breadcrumb.Item>
                    <Breadcrumb.Item><a onClick={()=>{this.props.history.push('/home/appManger')}}>应用管理列表</a></Breadcrumb.Item>
                  </Breadcrumb>
                  <div style={{marginTop:'15px',marginBottom:'15px'}}>
                    <Button
                      type='primary'
                      className='buttonCommon'
                      onClick={()=>this.setState({switchCode:1})}
                    >+ 创建应用</Button>
                    <Button onClick={()=>this.setState({switchCode:5})}  type='primary' className='buttonCommon'>应用调用关系总览</Button>
                    <div style={{float:'right'}}>
                      <span style={{marginRight:'5px'}}>上下线筛选</span>
                      <RadioGroup defaultValue="a" >
                        <RadioButton value="a">全部</RadioButton>
                        <RadioButton value="b">使用中</RadioButton>
                        <RadioButton value="c">已停用</RadioButton>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className='appBody' style={{textAlign:'center'}}>
                  <Table
                    columns={columns}
                    dataSource={tableSource}
                    pagination={false}
                    scroll={{y: tableHeight}}
                  />
                  <MPagination
                    defaultCurrent={1}
                    total={50}
                    showQuickJumper={true}
                    showSizeChanger={true}
                  />
                </div>
                <Modal
                  title="警告"
                  mask
                  visible={this.state.visible}
                  onOk={()=>this.setState({visible:false})}
                  onCancel={()=>this.setState({visible:false})}
                >
                  <p style={{textAlign:'center'}}> 确定停用该应用?<br/>
                    注：停用该应用，将会解除应用调用和被调用关系。
                    调用该应用的ServiceOwner将会收到通知</p>
                </Modal>
              </div>
              }
              {switchCode===1&&
                <div>
                  <CreateApp changeSwitchCode={this.changeSwitchCode.bind(this)}/>
                </div>
              }
              {switchCode===2&&
                <div>
                  <AppDetail appData={this.state.appData} changeSwitchCode={this.changeSwitchCode.bind(this)}/>
                </div>
              }
              {switchCode===3&&
              <div>
                <AppDetail editable={true} appData={this.state.appData} changeSwitchCode={this.changeSwitchCode.bind(this)}/>
              </div>
              }
              {switchCode===4&&
                <div>
                  <AppRelationConfig
                    dataSource={[{title:'xq-17dz-finance-war',key:'001',description:'001'},{title:'xq-17dz-finance-EXE',key:'002',description:'002'},{title:'xq-17dz-finance-APK',key:'003',description:'003'}]}
                    changeSwitchCode={this.changeSwitchCode.bind(this)}
                  />
                </div>
              }
              {
                switchCode===5&&
                <AppsMap changeSwitchCode={this.changeSwitchCode.bind(this)}/>
              }
            </div>
        )
    }
}

export default AppManger;