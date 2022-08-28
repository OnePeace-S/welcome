let editor;
let article = {

}
$(function() {
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
        let markdown = editor.getMarkdown();
        article = {
            title:article_title,
            author:article_author,
            content:markdown
        }
        save(article)


    })

    function save(data){
        $.myAjax({
            url:"/article/save",
            async:false,
            data:data,
            success:function(data){
                if(data.code === 1){
                    window.location.href = "list.html";
                }else {
                    $.Alert(data.msg);
                }
            },
            error:function(e){
                console.log(e);
            }
        })
    }


});