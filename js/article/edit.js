let editor;
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

        console.log(editor.getHTML())
        console.log(editor.getMarkdown())
        let viewEditor;
        viewEditor = editormd.markdownToHTML("article_view", {
            markdown        : editor.getMarkdown(),//+ "\r\n" + $("#append-test").text(),
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

    })


});