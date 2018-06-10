import React from 'react';
import './readCount.css';
import '../Charts/pie';
import Pie from '../Charts/pie';
import Bar from '../Charts/bar';
import Tr from './tr';

class ReadCount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            arr:[
                {
                    id:1,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-5'
                },
                {
                    id:2,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-5'
                },
                {
                    id:3,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-5'
                },
                {
                    id:4,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-5'
                },
                {
                    id:5,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-5'
                },
                {
                    id:6,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-5'
                },
                {
                    id:7,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-5'
                },
                {
                    id:8,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-5'
                },
                {
                    id:9,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-5'
                },
                {
                    id:10,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-5'
                }
            ]
        };
    }
    render(){
        let {arr} = this.state;
        let newArr = arr.map((e,i)=>{
            let obj={
                key:i,
                id:e.id,
                title:e.title,
                column:e.column,
                readNum:e.readNum,
                commentNum:e.commentNum,
                shareNum:e.shareNum,
                editor:e.editor,
                time:e.time
            }
            return <Tr {...obj} />;
        })
        return (
            <div id="readCount" className="content">
                <div className="charts">
                    <div className="barchart">
                        <Bar />
                    </div>
                    <div className="piechart">
                        <Pie />
                    </div>
                </div>
                <div className="table1Title">今日点击Top 10</div>
                <table className="table1">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>标题</th>
                        <th>所属栏目</th>
                        <th>阅读量</th>
                        <th>评论量</th>
                        <th>转发量</th>
                        <th>编辑</th>
                        <th>时间</th>
                    </tr>
                    </thead>
                    <tbody>
                        {newArr}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ReadCount;