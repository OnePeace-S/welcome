function $ById(id){
    return document.getElementById(id);
}
function $ByTag(key,value){
    return document.getElementsByTagNameNS(key,value);
}


function $myAjax(option){
    if(option.notHost === undefined){
        option.url = host+option.url
    }
    $.ajax({
        url:option.url,
        method:"post",
        async:option.async,
        dataType: "json",
        contentType: 'application/json',
        data:JSON.stringify(option.data),
        success:option.success,
        error:option.error
    })


}

