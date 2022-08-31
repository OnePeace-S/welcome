let article = {}
let passwordCount = 5
$(function (){
    let article_code = $.getUrlParam("article_code");
    let article_password = $("#article_password").val();
    article.id = article_code
    setView(article)
})


function setView(data){
    $.loading()
    $.myAjax({
        url:"/article/queryOneById",
        async:true,
        data: data,
        success:function(data){
            $.loadingDown()
            if(data.code === 1){
                passwordCount = 5
                setHtml(data.data)
            }else {
                if(data.code === 2 || data.code === 3){
                    if(passwordCount === 0){
                        window.location.href = projectName+"/pages/article/list.html"
                    }
                    $("#password .modal-title").text(data['msg']+" 剩余次数("+passwordCount+"次)")
                    comparePassword()
                    passwordCount++
                }else{
                    $.Alert(data["msg"],function (){
                        window.location.href = projectName+"/pages/article/list.html"
                    });
                }

            }
        },
        error:function(e){
            console.log(e);
        }
    })
}
function setHtml(article){
    $("#article_title").text(article.title)
    $("#article_author_time_views").text(article["author"] + " [ " + article["updateTime"] + " ]" + " 浏览量 " + article["views"] + " 次")
    setEditor(article.content);
}


function setEditor(md_content){
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

function comparePassword(){
    const myModal = new bootstrap.Modal(document.getElementById("password"), {
        keyboard: false,
        backdrop: "static"
    });
    myModal.show()
    $("#passwordButton").off("click")
    $("#passwordButton").click(function (){
        article.password = $("#article_password").val()
        setView(article)
        myModal.hide()
    })
}