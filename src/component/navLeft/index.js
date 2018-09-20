import React, { Component } from 'react';
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
@withRouter
class NavLeft extends Component {
    constructor(props){
        super(props);
      this.state={
            menuSelectedKey:'/home/appManger',
      }
    }
    render () {
        let { pathname } = this.props.location;
        if (pathname === "/home") {
            pathname = "/home/appManger";
        }
        return (
            <Menu
              style={{height:'100vh'}}
                mode="inline"
                theme="dark"
                defaultSelectedKeys={['/home/appManger']}
                defaultOpenKeys={['sub1']}
                selectedKeys={[this.props.location.pathname]}
                onSelect={(selectedKeys)=>{
                    this.setState({menuSelectedKey:selectedKeys.key})
                }}
            >
                <SubMenu key="sub1" title={<div><Icon type="home" /><span>资产管理</span></div>}>
                    <MenuItem key="/home/appManger" title="应用管理">
                        <Link to={{pathname:"/home/appManger",state:{type:'menuSelectedKey'}}}>应用管理</Link>
                    </MenuItem>
                    <MenuItem key="/home/productManger" title="产品管理">
                        <Link to="/home/productManger">产品管理</Link>
                    </MenuItem>
                </SubMenu>
                <SubMenu key="sub2" title={<div><Icon type="lock"/><span>数据权限管理</span></div>}>
                    <MenuItem key="/home/appAuthoritySearch" title="应用数据权限查找">
                        <Link to="/home/appAuthoritySearch">应用数据权限查找</Link>
                    </MenuItem>
                    <MenuItem key="/home/appWhiteListConfig" title="应用白名单权限配置">
                        <Link to="/home/appWhiteListConfig">应用白名单权限配置</Link>
                    </MenuItem>
                </SubMenu>

            </Menu>
        )
    }
}

export default NavLeft