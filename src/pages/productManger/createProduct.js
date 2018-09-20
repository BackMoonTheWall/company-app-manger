/**
 * Created by qsq on 2018-9.
 */
import React, { Component } from 'react';
import {Breadcrumb,Button,Input,Form,Select} from 'antd'
import "./index.less";
const FormItem=Form.Item;
const Option = Select.Option;
@Form.create()
class CreateProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameStatus: '',
            btnText: "修改"
        }
    }
    componentDidMount(){
        this.setState({
            ifEable: this.props.ifEable,
            changeCode: this.props.btnCode,
            changeFootCode: this.props.btnCode,
        });

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    validateToNextPassword = (rule, value,callback) => {
        let reg = /^[\u4E00-\u9FA5]+$/; //纯中文检验
        let re =  /^[0-9a-zA-Z]{3,8}$/;//字母、数字及组合校验
        console.log(value);
        if(['',undefined,null].includes(value)) {
            callback();
            this.setState({nameStatus:'error'});
        }else if(value && !reg.test(value) && !re.test(value)){
            callback('请输入中文名称或3-8位字母或数字');
            this.setState({nameStatus:'error'});
        }else {
            this.setState({nameStatus:'success'});
            callback();
        }
    }
    changeContent = (e) => {
        if(this.state.btnText === '修改'){
            e.preventDefault();
            this.setState({
                ifEable: false,
                btnText:"提交",
                changeCode: 3,
                changeFootCode: 3,
            });
        }

    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className='createProduct'>

                {
                    this.state.changeCode === 1 &&
                        <div>
                            <h1>创建产品</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item>资产管理</Breadcrumb.Item>
                                <Breadcrumb.Item><a onClick={()=>this.props.changeSwitchCode(0)}>产品管理列表</a></Breadcrumb.Item>
                                <Breadcrumb.Item>创建产品</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                }
                {
                    this.state.changeCode === 2 &&
                        <div>
                            <h1>产品详情</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item>资产管理</Breadcrumb.Item>
                                <Breadcrumb.Item><a onClick={()=>this.props.changeSwitchCode(0)}>产品管理列表</a></Breadcrumb.Item>
                                <Breadcrumb.Item>小企业</Breadcrumb.Item>
                                <Breadcrumb.Item>产品详情</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                }
                {
                    this.state.changeCode === 3 &&
                        <div>
                            <h1>产品修改</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item>资产管理</Breadcrumb.Item>
                                <Breadcrumb.Item><a onClick={()=>this.props.changeSwitchCode(0)}>产品管理列表</a></Breadcrumb.Item>
                                <Breadcrumb.Item>小企业</Breadcrumb.Item>
                                <Breadcrumb.Item>产品修改</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                }

                <Form  onSubmit={this.handleSubmit}>
                    <FormItem
                        label='应用所属部门'
                        hasFeedback
                    >
                        {getFieldDecorator('departname', {
                            rules: [{ required: true, whitespace: true, message: '请输入应用所属部门!' }],
                        })(
                            <Select style={{width:'280px'}} autoComplete="new-password"  placeholder="小企业" disabled={this.state.ifEable}>
                                <Option value="china">China</Option>
                                <Option value="use">U.S.A</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label='产品所属产品线'
                        hasFeedback
                    >
                        {getFieldDecorator('productline', {
                            rules: [{ required: true, message: '请输入产品所属产品线!' }],
                        })(
                            <Select style={{width:'280px'}} autoComplete="new-password"  placeholder="亿企代账" disabled={this.state.ifEable}/>
                        )}
                    </FormItem>
                    <FormItem
                        label='产品名称'
                        hasFeedback
                        validateStatus={this.state.nameStatus}
                    >
                        {getFieldDecorator('productname', {
                            rules: [{ required: true,message:'请输入产品名称!'},
                                    {
                                        validator: this.validateToNextPassword,
                                    }],
                        })(
                            <Input autoComplete="new-password"  placeholder="财务中心" disabled={this.state.ifEable} style={{width:"256px"}}/>
                        )}
                    </FormItem>
                    <FormItem
                        label='产品代号'
                        hasFeedback
                    >
                        {getFieldDecorator('productcode', {
                            rules: [{ required: true, message: '请输入产品代号!' }],
                        })(
                            <Input autoComplete="new-password"  placeholder="fiance" disabled={this.state.ifEable} style={{width:"256px"}}/>
                        )}
                    </FormItem>
                    <FormItem
                        label='ProductCode'
                    >
                        <span>xq-17dz</span>
                    </FormItem>
                    <FormItem
                        label='产品负责人'
                        hasFeedback
                    >
                        {getFieldDecorator('productmanager', {
                            rules: [{ required: true, message: '请输入中文名称!' ,pattern:new RegExp('^[\u4E00-\u9FA5]+$')}],
                        })(
                            <Select style={{width:'280px'}} autoComplete="new-password"  placeholder="人员" disabled={this.state.ifEable}>
                                <Option value="中国">中国</Option>
                                <Option value="use">U.S.A</Option>
                            </Select>
                        )}
                    </FormItem>

                    {
                        (this.state.changeFootCode === 1 || this.state.changeFootCode === 3) &&
                    <FormItem
                    >
                        <Button
                            onClick={()=>this.props.changeSwitchCode(0)}
                            type='default' className="cancel-form-button"
                            style={{marginRight:"10px"}}
                        >
                            取消
                        </Button>
                        <Button type='primary'  htmlType="submit" className="login-form-button" >
                            提交
                        </Button>

                    </FormItem>
                    }
                    {
                        this.state.changeFootCode === 2 &&
                        <FormItem
                        >
                            <Button
                                onClick={()=>this.props.changeSwitchCode(0)}
                                type='default' className="cancel-form-button"
                                style={{marginRight:"10px"}}
                            >
                                返回上一页
                            </Button>
                            <Button type='primary'  htmlType="submit" className="login-form-button" onClick={this.changeContent}>
                                {this.state.btnText}
                            </Button>

                        </FormItem>
                    }
                </Form>
            </div>
        )
    }
}
export default CreateProduct