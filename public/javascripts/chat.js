let selector = e => document.querySelector(e) , 
selectAll = e => document.querySelectorAll(e) , 
createElement = e => document.createElement(e) 
let app = selector("#chatApp")
    app.setAttribute("class" , "fixed") 
    let header = createElement("em")  , 
    chatForm   = createElement("form") ,
    chatInput  = createElement("input") , 
    sendChat   = createElement("button")  , 
    messages   = createElement("ul") ,
    message    = createElement("li") 
    header.textContent = "What do you want to say ?"  
    chatInput.type = "text" 
    sendChat.type = "submit" 
    sendChat.textContent = "Send" 
    sendChat.setAttribute("class" , "send-button")
    chatForm.append(chatInput , sendChat)
    let socket = io("/chat")  
    .addEventListener("click" , e=> {
        e.preventDefault() 
        socket.emit("chat message" , chatInput.value) 
        chatInput.value = '' 
        return false 
    }) 
    socket.on("chat message" , function(msg){
        message.textContent = msg 
        messages.append(message)
    })
    app.append(header , messages , chatForm)
     
    /*let chatBox = createElement("div") , 
    header      = createElement("h1")
    chatForm   = createElement("form") ,
    chatInput  = createElement("input") , 
    sendChat   = createElement("button")  , 
    messages   = createElement("ul") ,
    message    = createElement("li") 
    header.textContent = "What do you want to say ?"  
    chatInput.type = "text" 
    sendChat.type = "submit" 
    sendChat.textContent = "Send" 
    chatBox.innerHTML = `
        <ul id="messages"></ul> 
        <p>Who be the man</p>
        <form class="form-inline chat-for">
            <div class="input-group>
                <button type="submit" class="input-group-append btn btn-primary">
                <i class="fab fa-facebook input-group-text"></button>
                <input type="text" name="chat-field" class="form-control" plaholder="Type your message">
            </div>
        </form>
    `
    chatBox.setAttribute("class" , "interview-box") 
    selector("body").append(chatBox)
})*
let trigger = selector("#interview") , 
userName = selector(".userName").id 
let socket = io() 
trigger.addEventListener("click" , event => { 
    let header = createElement("em")  , 
    app = selector("#app")
    chatForm   = createElement("form") ,
    chatInput  = createElement("input") , 
    sendChat   = createElement("button")  , 
    messages   = createElement("ul") ,
    message    = createElement("li") 
    header.textContent = "What do you want to say ?"  
    chatInput.type = "text" 
    chatInput.placeholder = "Welcome to the interview , type your response"
    sendChat.type = "submit" 
    sendChat.textContent = "Send" 
    sendChat.setAttribute("class" , "send-button") 

    chatForm.setAttribute("class" , "chat-form")
    chatForm.append(chatInput , sendChat)
    
    /*selector("body").innerHTML = "" 
    selector("body").style.background = "gray"
    *
    app.append(chatForm)
    app.setAttribute("class" , "interview-box")
    event.preventDefault() 
    socket.emit("chat message" , userName)
    */