import React, { Component } from 'react';
import {Breadcrumb,Button,Radio,Table,Input,Icon,Form,Select} from 'antd'
import "./index.less";
import Requests from "../../request";
const FormItem=Form.Item;
const Option=Select.Option;
@Form.create()
class AppDetail extends Component {
  constructor(props){
    super(props);
    this.state={
      editable:this.props.editable?this.props.editable:false,
      productList:[],
      department:'XQ',
      product:'17dz',
      appPackage:'EXE',
      appMidCode:'finance'
    }
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err,value)=>{
      if(!err){
        this.setState({
          appCode:this.state.department+'-'+this.state.product+'-'+this.state.appMidCode+'-'+this.state.appPackage
        },()=>{
          value.appCode=this.state.appCode;
          console.log(value);
          Requests.saveBasicApp(value);
        });
      }
    })
  }
  getProductList(value){
    Requests.getProductList({department:value}).then(
      res=>this.setState({
        productList:res,
        department:value
      })
    )
  }
  componentDidMount(){
    this.getProductList(this.state.department);
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {id,appName,appMidCode,productCode,appId,department,
      serviceOwner,status,assembly,devloper,description,minMemory,sourceCode,appCode} =this.props.appData;
    return(
      <div className='createApp'>
        <h1>{this.state.editable?'应用修改':'应用详情'}</h1>
        <Breadcrumb>
          <Breadcrumb.Item>资产管理</Breadcrumb.Item>
          <Breadcrumb.Item><a onClick={()=>this.props.changeSwitchCode(0)}>应用管理列表</a></Breadcrumb.Item>
          <Breadcrumb.Item>{this.state.editable?'修改应用':'应用详情'}</Breadcrumb.Item>
        </Breadcrumb>
        <Form  >
          <FormItem
            label='应用所属部门'
            hasFeedback
          >
            {getFieldDecorator('department', {
              rules: [{ required: true, whitespace: true, message: '请选择应用所属部门!' }],
              initialValue:department
            })(
              <Select disabled={!this.state.editable} style={{width:'280px'}} placeholder="小企业" onChange={(value)=>this.getProductList(value)}>
                <Option value='HS'>惠税</Option>
                <Option value='XQ'>小企业</Option>
                <Option value='XX'>信息</Option>
                <Option value='PX'>培训</Option>
                <Option value='BD'>B端</Option>
                <Option value='YW'>运维</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            label='应用所属产品'
            hasFeedback
          >
            {getFieldDecorator('product', {
              rules: [{ required: true, message: '请选择应用所属产品!' }],
              initialValue:productCode
            })(
              <Select  disabled={!this.state.editable} notFoundContent='请先选择部门' style={{width:'280px'}} onChange={(value)=>this.setState({product:value})}  placeholder="亿企代账" >
                {this.state.productList.length>0&&this.state.productList.map((value,index)=>
                  <Option value={value.productCode} key={index}>
                    {value.productName}
                  </Option>
                )}
              </Select>
            )}
          </FormItem>
          <FormItem
            label='应用名称'
            hasFeedback
          >
            {getFieldDecorator('appName', {
              rules: [{ required: true, message: '请输入应用名称!(中文)',pattern:new RegExp('^[\u4E00-\u9FA5]+$') }],
              initialValue:appName
            })(
              <Input disabled={!this.state.editable} placeholder="财务中心" />
            )}
          </FormItem>
          <FormItem
            label='应用代号'
            hasFeedback
          >
            {getFieldDecorator('appMidCode', {
              rules: [{ required: true, message: '请输入3~8位字母或数字' ,pattern:new RegExp('^[a-zA-Z]{3,8}$|^[0-9]{3,8}$')}],
              initialValue:appMidCode
            })(
              <Input  disabled={!this.state.editable} placeholder="fiance" onChange={(e)=>this.setState({appMidCode:e.target.value},()=>console.log(e))}/>
            )}
          </FormItem>
          <FormItem
            label='应用包类型'
            hasFeedback
          >
            {getFieldDecorator('assembly', {
              rules: [{ required: true, message: '请选择应用包类型!' }],
              initialValue:assembly
            })(
              <Select disabled={!this.state.editable} style={{width:'200px'}} onChange={(value)=>this.setState({appPackage:value})} autoComplete="new-password"  placeholder="war">
                <Option value='WAR'>Web Application</Option>
                <Option value='FNT'>前端资源</Option>
                <Option value='APK'>安卓应用(手机端)</Option>
                <Option value='EXE'>Windows应用程序(微端)</Option>
                <Option value='DMG'>Mac OS应用程序(微端)</Option>
                <Option value='PKG'>Mac OS应用程序(微端)</Option>
                <Option value='DAT'>数据资产</Option>
              </Select>
            )}
          </FormItem>
          <br/>
          <FormItem>
            AppCode :    <span style={{fontWeight:'bold'}}>
            {this.state.department+'-'+this.state.product+'-'+this.state.appMidCode+'-'+this.state.appPackage}
            </span>
          </FormItem>
          <br/>
          <FormItem
            label='Service Owner'
            hasFeedback
          >
            {getFieldDecorator('serviceOwner', {
              rules: [{ required: true, message: '请输入Service Owner 中/英文姓名',pattern:new RegExp('^[\u4E00-\u9FA5]+$|^[a-zA-Z]+$') }],
              initialValue:serviceOwner
            })(
              <Input disabled={!this.state.editable} placeholder="请输入" style={{width:'180px'}}/>
            )}
          </FormItem>
          <FormItem
            label='开发人员'
            hasfeedback
          >
            {getFieldDecorator('devloper', {
              rules: [{ required: true, message: '请选择开发人员!' }],
              initialValue:devloper
            })(
              <Select disabled={!this.state.editable} style={{width:'280px'}} autoComplete="new-password"  placeholder="人员" >
                <Option value='2G'>2G</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            label='代码库'
            hasFeedback
          >
            {getFieldDecorator('sourceCode', {
              rules: [{ required: true, message: '请正确输入git代码库地址!',pattern:new RegExp('^git@.*(\.git)$') }],
              initialValue:sourceCode
            })(
              <Input disabled={!this.state.editable} style={{width:'280px'}} autoComplete="new-password"  placeholder="git@youraddress.git" />
            )}
          </FormItem>
          <FormItem
            label='最小内存'
            hasFeedback
          >
            {getFieldDecorator('minMemory', {
              rules: [{ required: true, message: '请选择最小内存!' }],
              initialValue:minMemory
            })(
              <Select disabled={!this.state.editable} style={{width:'180px'}} autoComplete="new-password"  placeholder="2G" >
                <Option value='2G'>2G</Option>
                <Option value='4G'>4G</Option>
                <Option value='6G'>6G</Option>
                <Option value='8G'>8G</Option>
                <Option value='16G'>16G</Option>
                <Option value='32G'>32G</Option>
              </Select>
            )}
          </FormItem>
          <br/>
          <Button
            onClick={()=>this.props.changeSwitchCode(0)}
            type='default' style={{top:'6px',marginRight:'15px',marginLeft:'185px'}} htmlType="submit" className="login-form-button" >
            取消
          </Button>
          <FormItem
          >
            {!this.state.editable&&<Button type='primary' htmlType="submit" className="login-form-button"
                     onClick={() => this.setState({editable: true})}
            >
              修改
            </Button>
            }
            {this.state.editable&&<Button type='primary' htmlType="submit" className="login-form-button"
                                           onClick={() => this.setState({editable: false})}
            >
              提交
            </Button>
            }
          </FormItem>
        </Form>
      </div>
    )
  }
}
export default AppDetail