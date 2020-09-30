let selector = e => document.querySelector(e) , 
selectAll = e => document.querySelectorAll(e) , 
createElement = e => document.createElement(e) 
let header = createElement("h2")  , 
    app = selector("body")
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
messages.id = "messages"
let userName = selector(".userName").id   
let socket = io("/chat") 

socket.emit("confirm" , userName) 
socket.on("welcome" , data => {
    header.textContent = data
})
app.append(header)
socket.on("message" , data => { 
    message.textContent = data 
    messages.append(message) 
    app.append(messages)
}) 

chatForm.setAttribute("class" , "chat-form")
chatForm.append(chatInput , sendChat)
app.style.background = "#ece5dd"
app.append( chatForm) 

sendChat.addEventListener("click" , event => {
    event.preventDefault() 
    message.textContent = chatInput.value 
    messages.append(message) 
    chatInput.value = ""
}) 

