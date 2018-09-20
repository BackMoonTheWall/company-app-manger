import React, { Component } from 'react';
import {Breadcrumb,Button,Input,Form,Transfer} from 'antd'
import "./index.less";
const FormItem=Form.Item;
@Form.create()
class AppRelationConfig extends Component {
  constructor(props){
    super(props);
    this.state={
      dataSource:this.props.dataSource,
      targetKeys:[],
      results:[]
    }
  }
  changeTargets(nextTargetKeys){
    this.setState({
      targetKeys:nextTargetKeys
    },()=>{
      this.setState({results:this.getTargetItems(this.state.dataSource,this.state.targetKeys)})
    })
  }
  getTargetItems(source,target){
    let arr=[];
    for(let i=0;i<target.length;i++){
      for(let j=0;j<source.length;j++){
        if(target[i]===source[j].key){
          arr.push(source[j].title);
        }
      }
    }
  return arr
  }
  render(){
    return(
      <div>
        <h1>应用关系管理</h1>
        <Breadcrumb>
          <Breadcrumb.Item>资产管理</Breadcrumb.Item>
          <Breadcrumb.Item><a onClick={()=>this.props.changeSwitchCode(0)}>应用管理列表</a></Breadcrumb.Item>
          <Breadcrumb.Item>应用关系管理</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{textAlign:'center'}}>
        <hr/>
        <h3>请添加欲调用之应用</h3>
        <Transfer
          titles={['未选择至调用内之应用', '已选择至调用内之应用']}
          dataSource={this.state.dataSource}
          targetKeys={this.state.targetKeys}
          operations={['加入右侧','加入左侧']}
          render={item=>item.title}
          listStyle={{width:'300px',textAlign:'left'}}
          onChange={(nextTargetKeys)=>this.changeTargets(nextTargetKeys)}
        />
        <h3 style={{marginTop:'15px'}}>本应用已被调用至</h3>
          <div style={{marginBottom:'20px'}}>
            {this.state.results.map((value,index)=>{
              return <span style={{marginRight:'30px'}} key={index}>{value}</span>
            })}
          </div>
        <Button
          onClick={()=>this.props.changeSwitchCode(0)}
        >取消</Button>
        <Button type='primary'>提交</Button>
        </div>
      </div>
    )
  }
}
export default AppRelationConfig