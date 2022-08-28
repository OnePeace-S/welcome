let pages = {
    index:1,
    size:10,
    total:0
}
$(function (){
    let search = $.getUrlParam("search");
    query(search);
})


function query(search){
    $.loading()
    $.myAjax({
        url:"/article/queryList",
        async:true,
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

}

