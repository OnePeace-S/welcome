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
            
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12" style="border: 1px solid #000000;background-color: #ffffff;padding-right: unset;padding-left: unset">
                        <div class="row">
                            <div class="col-6"><input type="text" class="form-control" id="main_consult_sendUser" value="test"/></div>
                            <div class="col-6"><input type="text" class="form-control" id="main_consult_receiveUser" value="admin"/></div>
                        </div>
                        <div class="col-12" style="border-bottom: 1px solid #000000;height: 400px;overflow-y:auto;overflow-x: unset" id="main_consult_message">
                        <div class="col-12" style="text-align: center"><a onclick="" style="color: #0d6efd;border-bottom: 1px solid black;cursor: pointer">历史记录</a></div>
                        </div>
                        <div class="row" style="padding: 0">
                            <div class="col-9">
                                <input class="form-control" type="text" placeholder="发送消息" id="main_consult_message_contentText"/>
                            </div>
                            <div class="col-3">
                                <input class="col-12 btn btn-primary" type="button" onclick="main_consult_sendMessage()" value="发送"/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
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
            if(socket != null){
                socket.close()
                socket = null
            }
            connectionSocket();
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
        if(socket != null){
            socket.close()
            socket = null
        }
    })


    $('#main_consult_message_contentText').on('keyup', function(event){//JQuery监听回车
        const e = event || window.event || arguments.callee.caller.arguments[0];//兼容IE
        if(e && e.keyCode==13){// enter 键
            main_consult_sendMessage()
        }
    });

}

function connectionSocket(){

    user_account = $("#main_consult_sendUser").val();
    const receiveUser = $("#main_consult_receiveUser").val();

    const url = `ws://127.0.0.1:8001/socket/talkMessage/${user_account}/${receiveUser}`;
    socket = new WebSocket(url);

    socket.onopen = function() {
        $("#main_consult_message").children().remove()
        console.log("websocket建立连接")
    };

    //获取信息
    socket.onmessage = function(msg) {
        const socketMessage = JSON.parse(msg.data)

        if(socketMessage["status"] === 1){
            for(let num = 0 ; num < socketMessage["listMessage"].length ; num++){
                const talkMessage = socketMessage["listMessage"][num]
                let divStyle = 'style="text-align: right;"'
                let pStyle = 'style="margin-right: 10px;text-align: right;background-color: #00ff9d;padding: 0.375rem 0.75rem;border-radius: 0.25rem;display: inline-block;max-width:80%;"'
                if(talkMessage["sendUser"] != "test"){
                    divStyle = 'style="text-align: left;"'
                    pStyle = 'style="margin-left: 10px;text-align: left;background-color: #00ff9d;padding: 0.375rem 0.75rem;border-radius: 0.25rem;display: inline-block;max-width:80%;"'
                }
                const messageHtml = `
                <div class="col-12" ${divStyle}>
                    <p ${pStyle}>${talkMessage.message}</p>
                </div>
                `
                $("#main_consult_message").append(messageHtml)
                document.getElementById('main_consult_message').scrollTop = document.getElementById('main_consult_message').scrollHeight
                console.log(msg.data)
            }
        }



        //发现消息进入,开始处理前端触发逻辑
    };
    //关闭事件
    socket.onclose = function() {
        socket = null
        console.log("websocket已关闭")
    };
    //发生了错误事件
    socket.onerror = function() {
        socket = null
        main_consult_pointMessage("未正确建立连接")
        console.log("websocket发生了错误")
    }
}

function main_consult_sendMessage() {
    if(socket == null){
        connectionSocket()
    }
    const content = $("#main_consult_message_contentText").val()
    if(content === ''){
        return
    }
    const json = {
        message:content,
        sendUser:$("#main_consult_sendUser"),
        receiveUser:"admin"
    }
    if(socket.readyState !== 1){
        main_consult_pointMessage("连接已断开，请重新打开再试")
        return;
    }
    socket.send(JSON.stringify(json));
    $("#main_consult_message").append(`<div class="col-12" style="text-align: right;">
                    <p style="margin-right: 10px;text-align: right;background-color: #00ff9d;padding: 0.375rem 0.75rem;border-radius: 0.25rem;display: inline-block;max-width:80%;">${content}</p>
                </div>`)
    document.getElementById('main_consult_message').scrollTop = document.getElementById('main_consult_message').scrollHeight
    $("#main_consult_message_contentText").val('')
}

function main_consult_pointMessage(content){
    $("#main_consult_message").append(`<div class="col-12" style="text-align: left;">
                    <p style="margin-left: 10px;text-align: left;background-color: #c90909;padding: 0.375rem 0.75rem;border-radius: 0.25rem;display: inline-block;max-width:80%;">${content}</p>
                </div>`)
    document.getElementById('main_consult_message').scrollTop = document.getElementById('main_consult_message').scrollHeight
}