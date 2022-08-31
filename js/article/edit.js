let editor;
let article = {
    id:null
}
$(function() {
    article.id = $.getUrlParam("article_code")
    $.loading()
    editor = editormd("article_content", {
        width  : "100%",
        height : "600px",
        path   : "/welcome/plugin/editor.md-1.5.0/lib/",
        placeholder: "多写点，不然给你埋喽",
        saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
        htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
        toolbarIcons:function (){
            return [
                "undo", "redo", "|",
                "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
                "h1", "h2", "h3", "h4", "h5", "h6", "|",
                "list-ul", "list-ol", "hr", "|",
                "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
                "goto-line", "watch", "preview", "fullscreen", "clear", "search"
            ]
        },
        emoji: true
    });


    $("#article_form_submit").click(function (){

        let article_title = $("#article_title").val();
        let article_author = $("#article_author").val();
        let article_password = $("#article_password").val();
        let markdown = editor.getMarkdown();
        article.title = article_title
        article.author = article_author
        article.content = markdown
        article.password= article_password
        save(article)
    })
    $.loadingDown()
});

function save(data){
    $.loading()
    $.myAjax({
        url:"/article/saveAndUpdate",
        async:false,
        data:data,
        success:function(data){
            $.loadingDown()
            if(data.code === 1){
                $.Alert("保存成功",function (){
                    window.location.href = "list.html";
                });
            }else {
                $.Alert(data["msg"]);
            }
        },
        error:function(e){
            console.log(e);
        }
    })
}