function startConsult(){
    const html = `

<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="main_consult_html" class="toast bg-body border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false" style="width: unset;background-color: rgba(0,0,0,0)">
        <img  id="main_consult" src="${projectName}/img/聊天.png" height="50px" />
        <div class="toast-header" style="display: none">
            <img src="../../img/favico.png" class="rounded me-2" height="10px">
            <strong class="me-auto">我嫩爹</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" id="main_consult_html_header_close"></button>
        </div>
        <div class="toast-body" style="display: none">
            <iframe src="${projectName}/pages/chat/chatMain.html" width="330px" height="600px"/>
        </div>
    </div>
</div>
    
    `
    $("body").append(html)

    const toastTrigger = document.getElementById('main_consult');
    const toastLiveExample = document.getElementById('main_consult_html')
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
    if (toastTrigger) {
        toastTrigger.addEventListener('click', function () {
            $("#main_consult").hide()
            $("#main_consult_html").css("background","rgba(0,0,0,0)")
            $("#main_consult_html").css("width","350px")
            $("#main_consult_html").find(".toast-header").show()
            $("#main_consult_html").find(".toast-body").show()
        })
    }
    toastLiveExample.addEventListener('hidden.bs.toast', function () {
        toast.show()
        $("#main_consult").show()
        $("#main_consult_html").css("background-color","white")
        $("#main_consult_html").css("width","unset")
        $("#main_consult_html").find(".toast-header").hide()
        $("#main_consult_html").find(".toast-body").hide()
    })



}


