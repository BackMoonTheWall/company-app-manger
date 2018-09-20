import React, { Component } from 'react';
import {Breadcrumb} from 'antd'
import "./index.less";
import echarts from 'echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/graphic'
class AppsMap extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: ''
      },
      tooltip: {},
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      label: {
        normal: {
          show: true,
          textStyle: {
            fontSize: 12
          },
        }
      },
      legend: {

        show: true,
        data: ["提供方", "调用方", '是提供方也是调用方'],
        right:0

      },
      series: [

        {
          type: 'graph',
          layout: 'force',
          symbolSize: 59,
          focusNodeAdjacency: true,
          roam: true,
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize:[0,10],
          categories: [{
            name: '提供方',
            itemStyle: {
              normal: {
                color: "#4592FF",
              }
            }
          }, {
            name: '调用方',
            itemStyle: {
              normal: {
                color: "red",
              }
            }
          }, {
            name: '是提供方也是调用方',
            itemStyle: {
              normal: {
                color: "green",
              }
            }
          }],
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 12
              },
            }
          },
          force: {
            repulsion: 1000
          },
          data: [{
            name: '亿企MOCK',
            draggable: true,
            category: 0,
          }, {
            name: '亿企喝酒',
            category: 1,
            draggable: true,
          }, {
            name: '亿企抽烟',
            category: 1,
            draggable: true,
          }, {
            name: '亿企跳舞',
            category: 1,
            draggable: true,
          }, {
            name: '亿企吹牛',
            category: 1,
            draggable: true,
          }, {
            name: '亿企足浴',
            category: 1,
            draggable: true,
          }, {
            name: '亿企游泳',
            category: 1,
            draggable: true,
          }, {
            name: '亿企登山',
            category: 1,
            draggable: true,
          }, {
            name: '亿企上网',
            category: 1,
            draggable: true,
          }, {
            name: '亿企休闲',
            category: 2,
            draggable: true,
          }, {
            name: '亿企娱乐',
            category: 2,
            draggable: true,
          }, {
            name: '编不动了',
            category: 1,
            draggable: true,
          }, {
            name: '结束',
            category: 2,
            draggable: true,
          }],
          links: [{
            source: 0,
            target: 1,
            category: 0,
            value: '朋友'
          }, {
            source: 0,
            target: 2,
            value: '战友'
          }, {
            source: 0,
            target: 3,
            value: '房东'
          }, {
            source: 0,
            target: 5,
            value: '朋友'
          }, {
            source: 1,
            target: 2,
            value: '表亲'
          }, {
            source: 0,
            target: 5,
            value: '朋友'
          }, {
            source: 4,
            target: 5,
            value: '姑姑'
          }, {
            source: 2,
            target: 8,
            value: '叔叔'
          }, {
            source: 0,
            target: 12,
            value: '朋友'
          }, {
            source: 6,
            target: 11,
            value: '爱人'
          }, {
            source: 6,
            target: 3,
            value: '朋友'
          }, {
            source: 7,
            target: 5,
            value: '朋友'
          }, {
            source: 9,
            target: 10,
            value: '朋友'
          }, {
            source: 3,
            target: 10,
            value: '朋友'
          }, {
            source: 2,
            target: 11,
            value: '同学'
          }],
          lineStyle: {
            normal: {
              color:'source',
              width: 2,
              curveness: 0
            },
            emphasis:{
              color:'source',
              width: 3,
              curveness: 0
            }
          }
        }
      ]
    });
  }
  render(){
    return(
      <div className='createApp'>
        <h1>应用关系调用总览</h1>
        <Breadcrumb>
          <Breadcrumb.Item>资产管理</Breadcrumb.Item>
          <Breadcrumb.Item><a onClick={()=>this.props.changeSwitchCode(0)}>应用管理列表</a></Breadcrumb.Item>
          <Breadcrumb.Item>应用调用关系总览</Breadcrumb.Item>
        </Breadcrumb>
        <div className='appMapBody'>
  <div id='main' style={{ width: 700, height: 650 }}>

  </div>
        </div>
      </div>
    )
  }
}
export default AppsMap