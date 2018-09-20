import React, { Component } from 'react';

// import history from '../../history';

import "./index.less";

import { Form, Icon, Input, Button,Tabs,Checkbox } from 'antd';
const FormItem = Form.Item;
const TabPane=Tabs.TabPane;
@Form.create()
class Login extends Component {
    handleSubmit = (e) => {
        // let _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" style={{textAlign:'center'}}>
                    <h1>应用资产管理系统</h1>
                  <Tabs defaultActiveKey="1" >
                    <TabPane tab="账户密码登录" key="1" />
                  </Tabs>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '365px'}}>
                        <FormItem>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, whitespace: true, message: '请输入用户名!' }],
                            })(
                                <Input autoComplete="new-password" prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="帐号" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input autoComplete="new-password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                      <Checkbox style={{float:'left',paddingBottom:'15px'}}>自动登录</Checkbox>
                      <a style={{float:'right',paddingBottom:'15px'}}>忘记密码</a>
                        <FormItem>
                            <Button type='primary'  htmlType="submit" className="login-form-button" >
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>

        );
    }
}

export default Login;