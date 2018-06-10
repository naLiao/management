import React from 'react';
import Tr from '../Column/tr';

class ArticleList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //3个数组对应已发稿件、草稿箱和回收站。应该是获取当前pathname并根据pathname请求数据?
            arr:[
                {
                    id:1,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:2,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:3,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:4,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'生活',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:5,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:6,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:7,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:8,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:9,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:10,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'头条',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
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
                    editor:'张三'
                },
                {
                    id:2,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:3,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:4,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:5,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:6,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:7,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:8,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:9,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:10,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'时事',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
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
                    editor:'张三'
                },
                {
                    id:2,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:3,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:4,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:5,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:6,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:7,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:8,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:9,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                },
                {
                    id:10,
                    title:'与国际接轨 中国今日向外国人颁授首枚“友谊勋章',
                    column:'财经',
                    readNum:'1234',
                    commentNum:'35',
                    shareNum:'56',
                    editor:'张三'
                }
            ]
        };
    }
    render(){
        let {url:{location:{pathname}}} = this.props;
        let arr=[];
        switch(pathname){
            case '/myarticle/posted':
                arr=this.state.arr;
                break;
            case '/myarticle/draft':
                arr=this.state.arr2;
                break;
            case '/myarticle/deleted':
                arr=this.state.arr3;
                break;
            default:
                arr=this.state.arr;
        }
        console.log(arr);
        let newArr = arr.map((e,i)=>{
            let obj={
                key:i,
                title:e.title,
                column:e.column,
                readNum:e.readNum,
                commentNum:e.commentNum,
                shareNum:e.shareNum,
                editor:e.editor
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
export default ArticleList;