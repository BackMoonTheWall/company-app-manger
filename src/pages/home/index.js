import React, { Component } from 'react';
import { Row, Col ,notification} from "antd";
import Header from "../../component/header";
import NavLeft from "../../component/navLeft";
import { Route, Redirect } from "react-router-dom";
import AppManger from "../appManger";
import ProductManger from "../productManger";
import AppAuthoritySearch from "../appAuthoritySearch"
import AppWhiteListConfig from "../appWhiteListConfig"
import "./index.less";
class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      menuSelectedKey:'/home/appManger'
    }
  }
    render () {
      const openNotification = () => {
        const args = {
          message: '应用资产管理2.0版本上线公告',
          description: '「应用资产管理2.0版本」系统升级，计划在今天7/24(二)21:00-22:00间上线，预计 22:00恢复使用。\n' +
          '\n' +
          '如有问题，请及时与高天宇联系！',
          duration: 0,
        };
        notification.open(args);
      };
        return (
            <Row className="home-page">
                <Header />
                <Row>
                    <Col span="3" >
                        <NavLeft selectedKey={this.state.menuSelectedKey}/>
                    </Col>
                    <Col span="21" style={{padding: 20,backgroundColor:'RGB(240,242,245)',height:'auto'}}>
                        <div className='bodyContainer'>
                            <Route exact path="/home" component={() => <Redirect to="/home/appManger" />}  />
                            <Route path="/home/appManger" component={AppManger} />
                            <Route path="/home/productManger" component={ProductManger} />
                            <Route path="/home/appAuthoritySearch" component={AppAuthoritySearch} />
                            <Route path="/home/appWhiteListConfig" component={AppWhiteListConfig} />
                        </div>
                    </Col>
                </Row>
            </Row>
        )
    }
}

export default Home;