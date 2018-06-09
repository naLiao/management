import React from 'react';
import './readCount.css';
import '../Charts/pie';
import Pie from "../Charts/pie";

class ReadCount extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    render(){
        return (
            <div id="readCount" className="content">
                <div className="table1Title">栏目阅读统计</div>
                <div className="charts">
                    <Pie />
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
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>与国际接轨 中国今日向外国人颁授首枚“友谊勋章”</td>
                        <td>头条</td>
                        <td>1898</td>
                        <td>23</td>
                        <td>45</td>
                        <td>张三</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>中国确立表彰制度体系 作出杰出贡献外国人可获“友谊勋章”</td>
                        <td>图文</td>
                        <td>1898</td>
                        <td>23</td>
                        <td>45</td>
                        <td>张三</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>专访腾湃健康产业集团董事长郑静芬: 圆大家的“健康梦”</td>
                        <td>列表</td>
                        <td>1898</td>
                        <td>23</td>
                        <td>45</td>
                        <td>张三</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>西新政府宣誓就职 亲欧内阁女性多</td>
                        <td>言论</td>
                        <td>1898</td>
                        <td>23</td>
                        <td>45</td>
                        <td>张三</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>专访腾湃健康产业集团董事长郑静芬: 圆大家的“健康梦”</td>
                        <td>列表</td>
                        <td>1898</td>
                        <td>23</td>
                        <td>45</td>
                        <td>张三</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>西新政府宣誓就职 亲欧内阁女性多</td>
                        <td>言论</td>
                        <td>1898</td>
                        <td>23</td>
                        <td>45</td>
                        <td>张三</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>专访腾湃健康产业集团董事长郑静芬: 圆大家的“健康梦”</td>
                        <td>列表</td>
                        <td>1898</td>
                        <td>23</td>
                        <td>45</td>
                        <td>张三</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>西新政府宣誓就职 亲欧内阁女性多</td>
                        <td>言论</td>
                        <td>1898</td>
                        <td>23</td>
                        <td>45</td>
                        <td>张三</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>专访腾湃健康产业集团董事长郑静芬: 圆大家的“健康梦”</td>
                        <td>列表</td>
                        <td>1898</td>
                        <td>23</td>
                        <td>45</td>
                        <td>张三</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>西新政府宣誓就职 亲欧内阁女性多</td>
                        <td>言论</td>
                        <td>1898</td>
                        <td>23</td>
                        <td>45</td>
                        <td>张三</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ReadCount;