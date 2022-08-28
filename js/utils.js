$(function (){
    $("page").append(`
            <div class="row justify-content-center" style="margin-top: 5px">
                <div class="col-12">
                    <ul class="pagination">
                        <li class="page-item" id="pageStart"><a class="page-link" pageNum="1">首页</a></li>
                        <li class="page-item" id="pageUp" ><a class="page-link" pageNum="1">上一页</a></li>
                        <li class="page-item" id="pageDown"><a class="page-link" pageNum="1">下一页</a></li>
                        <li class="page-item" id="pageEnd"><a class="page-link" pageNum="1">尾页</a></li>
                    </ul>
                </div>
            </div>
    `);
})



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
    },
    Alert:function (content,action){
        let modalUuid = $.uuid();
        let modalCloseUuid = $.uuid();
        const alertHtml = `
            <div class="modal fade" id="${modalUuid}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body">
                            <p>${content}</p>
                        </div>
                        <div class="modal-footer" style="justify-content: center">
                            <button type="button" class="btn btn-primary" id="${modalCloseUuid}">确认</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        $("body").append(alertHtml)
        const myModal = new bootstrap.Modal(document.getElementById(modalUuid), {
            keyboard: false,
            backdrop: "static"
        });
        myModal.show()
        $("#"+modalCloseUuid+"").click(action)
        $("#"+modalCloseUuid+"").click(function (){
            myModal.hide()
            $("#"+modalUuid+"").remove()
        })
    },
    loading:function (){
        let  loading = `
            <div class="modal" id="loadingUp" tabindex="-1">
                <div class="modal-dialog modal-fullscreen modal-dialog-centered" style="opacity:0.5">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div style="text-align: center;margin-top: 10%">
                                <img src="https://thumbnail1.baidupcs.com/thumbnail/5c301b066o1c7571f610f71eb80d193f?fid=1102670925326-250528-806440569277525&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-9hoFRiY%2b%2fK%2b%2fxew6pLEkkEWNndQ%3d&expires=8h&chkbd=0&chkv=0&dp-logid=9025174331590709271&dp-callid=0&time=1661702400&size=c2048_u1152&quality=90&vuk=1102670925326&ft=image&autopolicy=1">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        $("body").append(loading)
        let myModalLoading = new bootstrap.Modal(document.getElementById("loadingUp"), {
            keyboard: false,
            backdrop: "static"
        })
        myModalLoading.show()
        console.log("up")
        $.extend({
            loadingDown:function (){
                myModalLoading.hide()
                document.getElementById("loadingUp").remove()
                console.log("down")
        }
        })
    },
    uuid:function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    },

    })

$.fn.extend({
    pageInit:function (pages,method){
        let indexHtml = ``;
        $(this).find("[name='pageIndex']").remove()

        let allPage = pages.total%pages.size > 0 ? Math.floor(pages.total/pages.size) + 1 : Math.floor(pages.total/pages.size)

        let maxViewPage = 7

        let loopNumBefore = 0
        let loopNumAfter = 0
        if(allPage <= maxViewPage){
            loopNumAfter = allPage - pages.index + 1
            loopNumBefore = allPage - loopNumAfter
        }else {
            loopNumAfter = allPage - pages.index >= Math.floor(maxViewPage/2) ? Math.floor(maxViewPage/2) + 1 : allPage - pages.index + 1
            loopNumBefore = pages.index <= Math.floor(maxViewPage/2) ? pages.index - 1 : maxViewPage - loopNumAfter
            loopNumAfter =  loopNumBefore <= Math.floor(maxViewPage/2) ? maxViewPage - loopNumBefore : loopNumAfter
        }


        for(let num = loopNumBefore ; num > 0 ; num--){
            indexHtml += `
            <li class="page-item" name="pageIndex"><a class="page-link" pageNum="${pages.index-num}">${pages.index-num}</a></li>
            `
        }

        for(let num = 0 ; num < loopNumAfter ; num++){
            indexHtml += `
            <li class="page-item" name="pageIndex"><a class="page-link" pageNum="${pages.index+num}">${pages.index+num}</a></li>
            `
        }

        $(this).find("#pageUp").after(indexHtml)

        $(this).find("[pageNum='"+pages.index+"']").parent("[name='pageIndex']").addClass('active')


        $(this).find("#pageStart").off("click")
        $(this).find("#pageUp").off("click")
        $(this).find("#pageDown").off("click")
        $(this).find("#pageEnd").off("click")
        $(this).find("[name='pageIndex']").off("click")
        $(this).find("#pageStart").click(function (){
            pages.index = 1
            method()
        })
        $(this).find("#pageUp").click(function (){
            pages.index -= pages.index <= 1 ? 0 : 1
            method()
        })
        $(this).find("#pageDown").click(function (){
            pages.index += pages.index >= allPage ? 0 : 1
            method()
        })
        $(this).find("#pageEnd").click(function (){
            pages.index = allPage
            method()
        })
        $(this).find("[name='pageIndex']").click(function (){
            pages.index = $(this).find("a").text()
            method()
        })

    }


})


