import React from 'react';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Pie extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pie'));
        // 绘制图表
        let option = {backgroundColor: 'transparent',
            title: {
                text: '各栏目点击百分比',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {d}%"
            },
            visualMap: {
                show: false,
                min: 500,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'各栏目点击百分比',
                    type:'pie',
                    clockwise:'true',
                    startAngle:'0',
                    radius : '60%',
                    center: ['50%', '50%'],
                    data:[
                        {
                            value:60,
                            name:'头条',
                            itemStyle:{
                                normal:{
                                    color:'rgb(255,192,0)'
                                }
                            }
                        },
                        {
                            value:20,
                            name:'社会',
                            itemStyle:{
                                normal:{
                                    color:'rgb(1,175,80)'
                                }
                            }
                        },
                        {
                            value:10,
                            name:'自然',
                            itemStyle:{
                                normal:{
                                    color:'rgb(122,48,158)'
                                }
                            }
                        },
                        {
                            value:10,
                            name:'图文',
                            itemStyle:{
                                normal:{
                                    color: '#783943'
                                }
                            }
                        }
                    ]
                }
            ]};
        myChart.setOption(option,true);
    }
    render(){
        return (
            <div id="pie" style={{ width: 400, height: 400 }}></div>
        )
    }
}
export default Pie;