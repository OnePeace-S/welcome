$(function (){
    let article_code = $.getUrlParam("article_code");
    setView(article_code)
})

function setView(md_content){
    let viewEditor;
    viewEditor = editormd.markdownToHTML("article_view", {
        markdown        : md_content,//+ "\r\n" + $("#append-test").text(),
        //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
        htmlDecode      : "style,script,iframe",  // you can filter tags decode
        //toc             : false,
        tocm            : true,    // Using [TOCM]
        //tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
        //gfm             : false,
        //tocDropdown     : true,
        // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
        emoji           : true,
        taskList        : true,
        tex             : true,  // 默认不解析
        flowChart       : false,  // 默认不解析
        sequenceDiagram : false,  // 默认不解析
    });
}