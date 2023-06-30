var send_icon = document.getElementById("send-icon");
var input = document.getElementById("InputMSG");
var ContentChat = document.getElementById("ContentChat");
var msgBot = document.getElementById("msgBot");
var msgUser = document.getElementById("msgUser");

send_icon.addEventListener("click", SendMsgUser);

input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      SendMsgUser();
    }
  });

var status_func_SendMsgBot = 0;

function SendMsgUser() {
    if (input.value != "" && status_func_SendMsgBot == 0) {
        msgBot.classList.add("none");
        msgUser.classList.remove("none");
    
        let elementCPT = document.createElement("div");
        elementCPT.classList.add("massage", "msgCaption");
        elementCPT.setAttribute("data-user", "true");
        elementCPT.innerHTML = '<span class="captionUser">Tú</span>';
        ContentChat.appendChild(elementCPT);
    
        let elementMSG = document.createElement("div");
        elementMSG.classList.add("massage");
        elementMSG.setAttribute("data-user", "true");
        elementMSG.innerHTML = `<div class="user-response">${input.value}</div>`;
        ContentChat.appendChild(elementMSG);
        elementMSG.scrollIntoView();
        SendMsgBot(input.value);
        input.value = "";
    }
}

function SendMsgBot(msg) {
    msg = msg.toLowerCase();
    msg = msg.replace(/<\s*br[^>]?>/, "\n");
    msg = msg.replace(/(<([^>]+)>)/g, "");
  
    status_func_SendMsgBot = 1;
  
    let elementCPT = document.createElement("div");
    elementCPT.classList.add("captionBot", "msgCaption");
    elementCPT.innerHTML = '<img src="https://raw.githubusercontent.com/emnatkins/cdn-codepen/main/wvjGzXp/6569264.png" alt="Bot"> <span>Bot</span>';
    ContentChat.appendChild(elementCPT);
    elementCPT.scrollIntoView();

  
    let elementMSG = document.createElement("div");
    elementMSG.classList.add("massage");
    elementMSG.innerHTML = `<div class="bot-response text" text-first="true"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <rect x="0" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="10" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="20" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> </svg></div>`;
    ContentChat.appendChild(elementMSG);

    var option = document.getElementById("option");
    var csrftoken = $("[name=csrfmiddlewaretoken]").val();

    $.ajax({
        url: "/sendBot",
        type: "POST",
        headers:{
            "X-CSRFToken": csrftoken
        },
        data:{
            option: option.innerHTML,
            msg_user: msg
        },
        dataType: "json",
        success: function( response ) {
            let result = `<div class="bot-response text" text-first="true">${ response.msg_bot }</div>`;
            elementMSG.innerHTML = result;
            elementMSG.scrollIntoView();
            msgBot.classList.remove("none");
            msgUser.classList.add("none");
            status_func_SendMsgBot = 0;
        },
        // on error
        error: function (response) {
            // alert the error if any error occured
            console.log(response)
        }
    })

    ContentChat.appendChild(elementMSG);
    elementMSG.scrollIntoView();
}


let elementCPT = document.createElement("div");
elementCPT.classList.add("captionBot", "msgCaption");
elementCPT.innerHTML =
    '<img src="https://raw.githubusercontent.com/emnatkins/cdn-codepen/main/wvjGzXp/6569264.png" alt="Bot"> <span>Bot</span>';
ContentChat.appendChild(elementCPT);
elementCPT.scrollIntoView();

setTimeout(() => {
    var msg_django = document.getElementById("msg");
    elementMSG.innerHTML = `
    <div class="bot-response text" text-first="true">Hola 👋 ! </div>
    <div class="bot-response text" text-first="true">`+msg_django.innerHTML+`</div>`;
    elementMSG.scrollIntoView();
    msgBot.classList.remove("none");
    msgUser.classList.add("none");
    status_func_SendMsgBot = 0;
},2000)


let elementMSG = document.createElement("div");
elementMSG.classList.add("massage");
elementMSG.innerHTML = `<div class="bot-response text" text-first="true"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <rect x="0" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="10" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="20" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> </svg></div>`;
ContentChat.appendChild(elementMSG);

status_func_SendMsgBot = 1;
msgBot.classList.add("none");
msgUser.classList.remove("none");
elementMSG.scrollIntoView();