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

$.extend({
    myAjax:function (option) {
        if (undefined === option.notHost) {
            option.url = host + option.url
        }
        $.ajax({
            url: option.url,
            method: "post",
            async: option.async,
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(option.data),
            success: option.success,
            error: option.error
        })
    },
    getUrlParam:function (name) {
        //构造一个含有目标参数的正则表达式对象
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

        //匹配目标参数
        const r = window.location.search.substr(1).match(reg);

        //返回参数值
        if(r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }


})


