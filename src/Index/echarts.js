import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/line';
import  'echarts/map/js/china';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';

class EchartsTest extends Component {
    componentDidMount() {
        var myChart = echarts.init(document.getElementById('main'));
        var date = ['2016/1','2016/2','2016/3','2016/4','2016/5','2016/6','2016/7','2016/8','2016/9','2016/10',
            '2016/11','2016/12','2017/1','2017/2','2017/3','2017/4','2017/5','2017/6','2017/7','2017/8','2017/9','2017/10',
            '2017/11','2017/12','2018/1','2018/2','2018/3','2018/4','2018/5','2018/6','2018/7','2018/8','2018/9','2018/10',
            '2018/11','2018/12'];
            
            
            function my_data(){
                var data = [];
                for( var i =0; i<36; i++){
                    data.push(Math.round(Math.random() * (500 - 100) + 100));
                };
                return data;
            }
        // 绘制图表
        myChart.setOption({
            title : {
                text: '各栏目阅读量统计'
            },
            color:[
                "#2ec7c9",
                "#b6a2de",
                "#5ab1ef",
                "#ffb980"
            ],
            tooltip : {
                trigger: 'axis',
                borderColor: '#2ec7c9',
                axisPointer: {
                    lineStyle: {
                        color:'#2ec7c9'
                    }
                }
            },
            legend: {
                data:['头条','时事','生活','财经','世界杯']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : true,
                    data : date
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
             grid: {
                left: '3%',
                right: '4%',
                containLabel: true
            },
            dataZoom: [{
                type: 'inside',
                start: 74,
                end: 100,
                }, {
                start: 74,
                end: 100,
                handleSize: '80%',
                handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
                }
            }],
            series : [
                {
                    name:'头条',
                    type:'bar',
                    stack: '总量',
                    barMaxWidth : 30,
                    data:my_data()
                },
                {
                    name:'时事',
                    type:'bar',
                    stack: '总量',
                    data:my_data()
                },
                {
                    name:'生活',
                    type:'bar',
                    stack: '总量',
                    data:my_data()
                },
                {
                    name:'财经',
                    type:'bar',
                    stack: '总量',
                    data:my_data()
                },
                {
                    name:'世界杯',
                    type:'bar',
                    stack: '总量',
                    data:my_data()
                }
            ]
        });
    }
    render() {
        return (
            <div id="main" style={{'height':500}}></div>
        );
    }
}

export default EchartsTest;