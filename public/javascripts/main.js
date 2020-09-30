'use strict' 
import {sendData} from  './api.js'

let buttonHide = document.querySelector("#hidebutton")

buttonHide.addEventListener("click", event => {
    event.preventDefault()
    let hide = document.querySelector(".hidden-box")
    if(hide.style.display = "none"){
        hide.style.display = "block"
    }else{
        hide.style.display = "none"
    }
})

let submit = document.querySelector("#submit")

submit.addEventListener("click", event => {
    event.preventDefault()
    let className = document.querySelector("#classNames")
    let subjects = document.querySelector("#subjects") 
    let classes = className.value.trim().split(",")
    let subjectArray = subjects.value.trim().split(",")
    let details = {
        subject : subjectArray , 
        className : classes
    }
  
    sendData("http://localhost:3000/admin/staff/:staff" , details) 
    .then(res => {
        document.querySelector("body").textContent = res.message
    }) 
    .catch(err => err)
})