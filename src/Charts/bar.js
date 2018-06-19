import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';

class Bar extends React.Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('bar'));
        let option = {
            title : {
                text: '阅读量月份对比图',
                subtext: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['上月', '本月']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'value',
                    boundaryGap : [0, 0.01]
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data : ['生活','财经','时事','头条','总阅读量']
                }
            ],
            series : [
                {
                    name:'上月',
                    type:'bar',
                    data:[23489, 29034, 104970, 361744, 630230],
                    smooth:true
                },
                {
                    name:'本月',
                    type:'bar',
                    data:[23438, 31000, 71594, 143414, 328180],
                    smooth:true
                }
            ]
        };
        myChart.setOption(option,true);
    }
    render(){
        return (
            <div id="bar" style={{ width: 700, height: 300 }}></div>
        )
    }
}
export default Bar;