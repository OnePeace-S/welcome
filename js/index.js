$(function(){
    
    $("#index_search_button").click(function(){
        const search = $("#index_search_value").val();
        queryList(search);
    })


})
const pages = {
    start:0,
    size:5
}
function queryList(search){
    $.myAjax({
        url:"/user/queryList",
        async:false,
        data:{
            search:search,
            pages:pages
        },
        success:function(data){
            console.log(data);
        },
        error:function(e){
            console.log(e);
        }
    })
}