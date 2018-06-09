
var option1 = {
    backgroundColor: 'white',

    title: {
        text: '课程内容分布',
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
            name:'课程内容分布',
            type:'pie',
            clockwise:'true',
            startAngle:'0',
            radius : '60%',
            center: ['50%', '50%'],
            data:[
                {
                    value:70,
                    name:'语言',
                    itemStyle:{
                        normal:{
                            color:'rgb(255,192,0)',
                            shadowBlur:'90',
                            shadowColor:'rgba(0,0,0,0.8)',
                            shadowOffsetY:'30'
                        }
                    }
                },
                {
                    value:10,
                    name:'美国科学&社会科学',
                    itemStyle:{
                        normal:{
                            color:'rgb(1,175,80)'
                        }
                    }
                },
                {
                    value:20,
                    name:'美国数学',
                    itemStyle:{
                        normal:{
                            color:'rgb(122,48,158)'
                        }
                    }
                }

            ],
        }
    ]
};

export default option1;