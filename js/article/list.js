let pages = {
    index:1,
    size:10,
    total:0
}
$(function (){
    $.loading()
    console.log(pages)
    query();
})


function query(){
    let search = $.getUrlParam("search");
    $.myAjax({
        url:"/article/queryList",
        async:false,
        data: {
            search:search,
            pages:pages
        },
        success:function(data){
            if(data.code === 1){
                setHtml(data.data)
                $.loadingDown()
            }else {
                $.loadingDown()
                $.Alert(data.msg);
            }
        },
        error:function(e){
            console.log(e);
        }
    })
}

function setHtml(data){
    pages = data.pages
    let list = data.data
    const $articleList = $("#article_list")
    $articleList.children().remove()
    $.each(list ,function (index,item){
        const content = item.content.substring(0,100)
        const html = `
                <a href="view.html?article_code=${item.id}" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${item.title}</h5>
                        <small>${item.author} | ${item.updateTime}</small>
                    </div>
                    <small>${content}...</small>
                </a>    
        `
        $articleList.append(html)
    })

    $("page").pageInit(pages,query)
    console.log(pages)

}

