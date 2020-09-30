import {sendData , getData , selector , selectAll , createElement } from "./api.js"   
let remainingTime = selector("#remainingTime") ,
currentTime = selector(".currentTime") ,
endTime = selector(".endTime") 
//formatStartTime = startTime.id.replace(/\:/g, " ") 
function returnTime(arg){
    let formatArg = arg.split(":")
    let currentDate = new Date() 
    //const turnToNum = val => Number(val)
    currentDate.setHours(currentDate.getHours() + Number(formatArg[0])) 
    currentDate.setMinutes(currentDate.getMinutes() + Number(formatArg[1]))
    currentDate.setSeconds(currentDate.getSeconds() + Number(formatArg[2])) 
    let time = currentDate.getTime() 
    return time
} 

/*let timerID = setInterval( () => { 
    var t = returnTime(currentTime.id)
    let now = returnTime(endTime.id) - new Date().getTime() , 
    hours = Math.floor((now%(1000*60*60*24))/(1000*60*60)) ,
    minutes = Math.floor((now%(1000*60*60))/(1000*60)) ,
    seconds = Math.floor((now%(1000*60))/(1000)) 
    remainingTime.textContent = new Date().getTime() -  new Date().getTime()//`${hours} : ${minutes} : ${seconds}`  
} , 1000)
*/
var t = returnTime(currentTime.id)
let now = returnTime(endTime.id) - t , 
hours = Math.floor((now%(1000*60*60*24))/(1000*60*60)) ,
minutes = Math.floor((now%(1000*60*60))/(1000*60)) ,
seconds = Math.floor((now%(1000*60))/(1000)) 

let examCountDown = (area ,  hr , min ,sec) => {
   // if (hr == 0 && sec == 0) { 
    let date = new Date() 
    date.setHours(hr) 
    date.setMinutes(min) 
    date.setSeconds(sec)
    let hrs = date.getHours() 
    let mins = date.getMinutes() 
    let secs = date.getSeconds()  
    let timerId = setInterval(() => {  
         
    //selector(text).textContent = "Remaining Time" 
    let mimi = String(mins).length === 1 ? `0${mins}` : mins 
    let sisi = String(secs).length === 1 ? `0${secs}` : secs
    selector(area).textContent = `${hrs} : ${mimi} : ${sisi} left` 
    
    if ( secs == 0 && mins !== 0) {
        mins-- 
        secs = 60
    }
    if (mins == 0 && secs == 0) {
        clearInterval(timerId) 
        if (localStorage.response){
            delete localStorage.response
        }
       
    }
    secs-- 
    } , 1000)
}

examCountDown("#remainingTime" , hours , minutes,seconds) 

let currentCourseNumber = Number(selector(".currentCourse").id) 
let currentQuestionNumber = Number(selector(".currentQuestion").id) 

window.addEventListener("click" , e => {
    if (e.target.type === "radio") {
        
        let checkedRadio = e.target.value 
        
        let saveResponse = ((c , q , o) => {

            try {
                if (localStorage.response) {
                    let responses = JSON.parse(localStorage.response).response
                    let addResponse = ((i , m , n ) => {
                         let checkRes = responses.find(res => res.questionNo == m &&  res.courseNo == i) 
                         if (checkRes) { 
                            let idex =  responses.findIndex(res => res.questionNo === checkRes.questionNo && res.courseNo === checkRes.courseNo) 
                            responses.splice(idex , 1)
                             responses.push({
                                option : o , 
                                questionNo : q , 
                                courseNo : c 
                             })
                             localStorage.response = JSON.stringify({response : responses})
                             return localStorage.response
                         }else{
                             responses.push({
                                option : o , 
                                questionNo : q , 
                                courseNo : c 
                             })
                             localStorage.response = JSON.stringify({response : responses})
                             return localStorage.response
                         }
                    })(c ,q , o)
                }else {
                    let responses =  [{
                        option : o , 
                        questionNo : q , 
                        courseNo : c 
                    }]
                    localStorage.response = JSON.stringify({response : responses})
                    return localStorage.response
                }
            }catch(error) {
                console.log(error.message)
            }
        })(currentCourseNumber , currentQuestionNumber , checkedRadio)
    }
    if (e.target.id === "quit"){ 
        //redirect or change location url
        /*if (localStorage.response){
            let responses = JSON.parse(localStorage.response).response 
            let n = []
            let courseNumbers = responses.filter((elem , i , arr) => !responses.find(val=> val.courseNo == elem.courseNo))
            //let unique = responses.reduce((cb , val) => {
              //  if (cb.push()
            let ul = createElement("ul") ,
            caption = createElement("h3") 
            caption.textContent = "Examination Summary Performance" 
            let checkCourse = Array.from(new Set([...responses.map(elem => elem.option)])) 
            console.log(checkCourse)
            //let checkRes = responses.find(res => res.questionNo == currentQuestionNumber &&  res.courseNo == currentCourseNumber) 
            responses.map((elem , i) => { 
                let li = createElement("li")
                li.textContent = elem.questionNo + " " + elem.option + " " + elem.courseNo
                ul.append(li)
            })
           selector("body").append(caption , ul) 
        }*/
        if (localStorage.response){
            let responses = JSON.parse(localStorage.response).response
            responses.map((elem , i) => { 
                let hide = select(".hidden-form")
                hide.value = elem.option 
            })
        }

    }
}) 

const para = selector('.modal-body-p')

if(localStorage.response){
    para.textContent = (localStorage.response).response
}

window.addEventListener("DOMContentLoaded" , e => {
   if (localStorage.response){
       let responses = JSON.parse(localStorage.response).response 
       let checkRes = responses.find(res => res.questionNo == currentQuestionNumber &&  res.courseNo == currentCourseNumber) 
       if (checkRes) {
        let inputs    = Array.from(selectAll("input")) 
        inputs.map((input , i) => {
            if (input.value === checkRes.option){
                input.checked = true 
            }
        })
       } 
       let checkCourse = responses.filter(res =>  res.courseNo == currentCourseNumber) 
       if (checkCourse){
        let displayed = Array.from(selectAll(".display-all")) 
        displayed.map((elem , i) => {
            if(checkCourse.find(val => val.questionNo == elem.id)){
               elem.style.background = "orange"
               elem.style.color = "#fff"
            }
            
        })
       }
       
   }
}) 









