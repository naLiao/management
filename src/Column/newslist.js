import React from 'react';
import Tr from './tr';

class NewsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //每个arr对应4个栏目所有已发布稿件。应该是获取当前pathname并根据pathname请求数据?
            arr:[
                {
                    id:1,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:2,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:3,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:4,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:5,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:6,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:7,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:8,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:9,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:10,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                }
            ],
            arr2:[
                {
                    id:1,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:2,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:3,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:4,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:5,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:6,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:7,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:8,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:9,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:10,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                }
            ],
            arr3:[
                {
                    id:1,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:2,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:3,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:4,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:5,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:6,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:7,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:8,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:9,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:10,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                }
            ],
            arr4:[
                {
                    id:1,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'生活',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:2,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'生活',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:3,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'生活',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:4,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'生活',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:5,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'生活',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:6,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'生活',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:7,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'生活',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:8,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'生活',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:9,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'生活',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                },
                {
                    id:10,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'生活',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三',
                    time:'2018-6-10'
                }
            ]
        };
    }
    render(){
        // let {url:{match:{params:{id}}}} = this.props;
        let {url:{location:{pathname}}} = this.props;
        let arr=[];
        switch(pathname){
            case '/column/headline':
                arr=this.state.arr;
                break;
            case '/column/current':
                arr=this.state.arr2;
                break;
            case '/column/finance':
                arr=this.state.arr3;
                break;
            case '/column/life':
                arr=this.state.arr4;
                break;
            default:
                arr=this.state.arr;
        }
        console.log(arr);
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
            <div className="content2">
                <table className="newsTable">
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
                        <th>修改</th>
                        <th>置顶</th>
                        <th>删除</th>
                    </tr>
                    </thead>
                    <tbody>
                        {newArr}
                    </tbody>
                </table>
                <ul id="pages">
                    <li><a>1</a></li>
                    <li><a>2</a></li>
                    <li><a>3</a></li>
                </ul>
            </div>
        )
    }
}
export default NewsList;