/**
 * Created by BKMR on 2018-9.
 */
import React, { Component } from 'react';
import { DatePicker, MPagination } from "zcmui"
import {Breadcrumb,Button,Radio,Table,Input,Icon} from 'antd'
import CreateApp from './createProduct'
const tableHeight=window.innerHeight-400;
let tableSource=[];
for(let i=0;i<10;i++){
  tableSource.push({key:i,no:i+1,AppCode:'xqy-boss',appName:'运营平台',department:'小企业',options:'none'})
}
class ProductManger extends Component {
  constructor(props){
    super(props);
    this.state = {
      switchCode: 0,
    }
    this.changeSwitchCode = this.changeSwitchCode.bind(this);
  }
  changeSwitchCode(code){      //用于子组件改变父组件状态
    this.setState({switchCode: code})
  }
  submit(params){       //子组件提交表单后的参数传到父组件

  }
  createProduct = () => {
    this.changeSwitchCode(1);
    this.ifEable = false;
    this.btnCode = 1;
  }
  detailWatch = () => {
    this.changeSwitchCode(1);
    this.ifEable = true;
    this.btnCode = 2;
  }
  changeProduct = () => {
    this.changeSwitchCode(1);
    this.ifEable = false;
    this.btnCode = 3;
  }
  render() {
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
        width:'20%'
      },
      {
        title: '应用名',
        dataIndex: 'appName',
        key: 'appName',
        align:'center',
        width:'20%'
      },
      {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
        align:'center',
        width:'15%'

      },
      {
        title: '操作',
        key: 'options',
        dataIndex: 'options',
        width:'40%',
        align:'center',
        render: tags => (
          <div>
            <Button onClick={this.detailWatch} style={{marginRight: "10px"}}>查看详情</Button>
            <Button onClick={this.changeProduct}>产品修改</Button>
          </div>
        ),
      }
    ];
    const {switchCode}=this.state;
    return (
      <div>
        {switchCode===0&&
        <div>
          <div className='appHeader'>
            <h1>产品管理列表</h1>
            <div style={{float:'right',marginTop:'-48px'}}>
              <Icon type="search" />
              <Input
                style={{width:'150px',marginLeft:'5px',marginRight:'5px'}}
                placeholder='输入产品关键字'
              />
              <Button type='primary'>搜索</Button>

            </div>

            <Breadcrumb>
              <Breadcrumb.Item>资产管理</Breadcrumb.Item>
              <Breadcrumb.Item><a onClick={()=>{this.props.history.push('/home/appManger')}}>产品管理列表</a></Breadcrumb.Item>
            </Breadcrumb>
            <div style={{marginTop:'15px',marginBottom:'15px'}}>
              <Button
                type='primary'
                className='buttonCommon'
                onClick={this.createProduct}
              >+ 创建产品</Button>
            </div>
          </div>
          <div className='appBody'>
            <Table
              columns={columns}
              dataSource={tableSource}
              scroll={{y: tableHeight}}
              pagination={false}
            />
            <MPagination
              defaultCurrent={1}
              total={50}
              showQuickJumper={true}
              showSizeChanger={true}
            />
          </div>
        </div>
        }
        {switchCode===1&&
        <div>
          <CreateApp changeSwitchCode={this.changeSwitchCode} ifEable={this.ifEable} btnCode={this.btnCode}/>
        </div>
        }
      </div>
    )
  }
}

export default ProductManger;