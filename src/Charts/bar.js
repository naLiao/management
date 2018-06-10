import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Bar extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('bar'));
        let option = {
            title : {
                text: '世界人口总量',
                subtext: '数据来自网络'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['2011年', '2012年']
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
                    data : ['巴西','印尼','美国','印度','中国','世界人口(万)']
                }
            ],
            series : [
                {
                    name:'2011年',
                    type:'bar',
                    data:[18203, 23489, 29034, 104970, 131744, 630230]
                },
                {
                    name:'2012年',
                    type:'bar',
                    data:[19325, 23438, 31000, 121594, 134141, 681807]
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