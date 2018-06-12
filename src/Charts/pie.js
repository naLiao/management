import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
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
        let option = {
            title : {
                text: '各栏目点击百分比',
                subtext: '',
                x:'left'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'面积模式',
                    type:'pie',
                    radius : [30, 110],
                    center : ['center', 180],
                    roseType : 'area',
                    x: 'left',               // for funnel
                    max: 40,                // for funnel
                    sort : 'ascending',     // for funnel
                    data:[
                        {value:60, name:'头条'},
                        {value:20, name:'时事'},
                        {value:16, name:'财经'},
                        {value:4, name:'生活'}
                    ]
                }
            ]
        };
        myChart.setOption(option,true);
    }
    render(){
        return (
            <div id="pie" style={{ width: 300, height: 300 }}></div>
        )
    }
}
export default Pie;