import React from 'react';



class Editor extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }
    <!-- 加载编辑器的容器 -->
    <script id="container" name="content" type="text/plain">
    这里写你的初始化内容
    </script>
    <!-- 配置文件 -->
    <script type="text/javascript" src="ueditor.config.js"></script>
        <!-- 编辑器源码文件 -->
    <script type="text/javascript" src="ueditor.all.js"></script>
    <!-- 实例化编辑器 -->
    <script type="text/javascript">
        var ue = UE.getEditor('container', {
        autoHeight: false
    });

        var ue2 = UE.getContent();
        //对编辑器的操作最好在编辑器ready之后再做
        ue.ready(function() {
        //设置编辑器的内容
        ue.setContent('hello');
        //获取html内容，返回: <p>hello</p>
        var html = ue.getContent();
        //获取纯文本内容，返回: hello
        var txt = ue.getContentTxt();
    });
    </script>
    render(){
        return (
            <div id="container" name="content" type="text/plain"></div>
        )
    }
}
export default Editor;