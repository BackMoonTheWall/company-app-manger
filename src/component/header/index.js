import React, { Component } from 'react';
import {Icon,Row,Col,notification} from 'antd'
import "./index.less";
const openNotification = () => {
  const args = {
    message: '应用资产管理2.0版本上线公告',
    description: '「应用资产管理2.0版本」系统升级，计划在今天7/24(二)21:00-22:00间上线，预计 22:00恢复使用。\n' +
    '\n' +
    '如有问题，请及时与高天宇联系！',
    duration: 3,
  };
  notification.open(args);
};
class Header extends Component {
    componentDidMount(){
        openNotification();
    }
    render() {
        return (
            <div className="header">
                <Row>
                    <Col span="3" >
                        <div className="logo" >应用资产管理系统</div>
                    </Col>
                    <Col span="21"  style={{backgroundColor:'white',height:'100%'}}>
                        <div className='rightHeader' style={{float:'right'}}>
                            <Icon onClick={()=>openNotification()} type='bell' style={{cursor:'pointer'}}/><span className='headerUnit'>BackMoon</span><a className='headerUnit'>登出</a>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Header