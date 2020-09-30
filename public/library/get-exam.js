'use strict' 
import {sendData} from  './api.js'

//! Use location and history API to track changes made to exam credentials , delete storage if location changes 
/*
window.onload = () => {
    delete localStorage.examPaper 
    delete localStorage.question
}
*/

//! Handling the exam 
let selector = e => document.querySelector(e) 
let createElement = e => document.createElement(e) 
let timer = selector(".time").id  , 
user  = selector(".row").id 
/**
 * examCountDown will initiate the countdown clock 
 * @param[area] Object - Where the clock should be displayed; a valid css selector 
 * @param[hr] Int - Value of the exam duration in hours 
 * @param[min] Int - Value of the exam duration in minutes 
 * @returns[Countdown] A countdown text within the display area
 */
let examCountDown = (text , area , hr , min ,sec) => {
    if (hr == 0 && sec == 0) { 
        if (localStorage.response && localStorage.question) {
            let que = JSON.parse(localStorage.question).question 
            let res = JSON.parse(localStorage.response).response 
            let correctArray = que.map(item => {
                const correctOption = {
                    value : item.correctOption , 
                    id : item._id ,
                    mark : item.mark
                }
                return correctOption
            }) 
            let grade = markExam(correctArray , res)  
            let details = {
                userEmail : user , 
                score : grade
            }
           sendData("https://heroku-ace.herokuapp.com/grade-student" , details) 
            .then(res => {
                selector("body").innerHTML = ` 
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-4 text-center">
                            <h2 class="text-center mb-3">Exam ended successfully </h2>
                            <p class="text-center"> ${res.message}</p> 
                            <a class="btn btn-primary btn-lg" href="/dashboard">Go back</a>
                        </div>
                    </div>
                </div>`
            }) 
            .catch(err => displayResult(err))
        }else {
            let details = {
                userEmail : user , 
                score : 0
            }
           sendData("https://heroku-ace.herokuapp.com/grade-student" , details) 
            .then(res => {
                selector("body").innerHTML = ` 
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-4 text-center">
                            <h2 class="text-center mb-3">Exam ended successfully </h2>
                            <p class="text-center"> ${res.message}</p> 
                            <a class="btn btn-primary btn-lg" href="/dashboard">Go back</a>
                        </div>
                    </div>
                </div>`
            }) 
            .catch(err => displayResult(err))
        }
        //selector(area).textContent = "Exam Ended , Logout in 3s..."
        /*setTimeout(()=> {
            window.location.replace("/dashboard")
        } , 100)
        */
    }
    let date = new Date() 
    date.setHours(hr) 
    date.setMinutes(min - 1) 
    date.setSeconds(sec)
    let hrs = date.getHours() 
    let mins = date.getMinutes() 
    let secs = date.getSeconds()  
    let timerId = setInterval(() => {  
        
    selector(text).textContent = "Remaining Time" 
    let mimi = String(mins).length === 1 ? `0${mins}` : mins 
    let sisi = String(secs).length === 1 ? `0${secs}` : secs
    selector(area).textContent = `${hrs} : ${mimi} : ${sisi}` 
    
    if ( secs == 0 && mins !== 0) {
        mins-- 
        secs = 60
    }
    if (mins == 0 && secs == 0) {
        clearInterval(timerId) 
        /*selector(area).textContent = "Exam Ended , Logout in 3s..."
       setTimeout(()=> {
            window.location.replace("/dashboard")
        } , 3000)
        */
       if (localStorage.response && localStorage.question) {
        let que = JSON.parse(localStorage.question).question 
        let res = JSON.parse(localStorage.response).response 
        let correctArray = que.map(item => {
            const correctOption = {
                value : item.correctOption , 
                id : item._id ,
                mark : item.mark
            }
            return correctOption
        }) 
        let grade = markExam(correctArray , res)  
        let details = {
            userEmail : user , 
            score : grade
        }
       sendData("https://heroku-ace.herokuapp.com/grade-student" , details) 
        .then(res => {
            selector("body").innerHTML = ` 
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4 text-center">
                        <h2 class="text-center mb-3">Exam ended successfully </h2>
                        <p class="text-center"> ${res.message}</p> 
                        <a class="btn btn-primary btn-lg" href="/dashboard">Go back</a>
                    </div>
                </div>
            </div>`
        }) 
        .catch(err => displayResult(err))
    }else {
        let details = {
            userEmail : user , 
            score : 0
        }
       sendData("https://heroku-ace.herokuapp.com/grade-student" , details) 
        .then(res => {
            selector("body").innerHTML = ` 
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4 text-center">
                        <h2 class="text-center mb-3">Exam ended successfully </h2>
                        <p class="text-center"> ${res.message}</p> 
                        <a class="btn btn-primary btn-lg" href="/dashboard">Go back</a>
                    </div>
                </div>
            </div>`
        }) 
        .catch(err => displayResult(err))
    }
    }
    secs-- 
    } , 1000)
}     
/**
 * startExam will be responsible for fetching questions from the server and saving it to localStorage 
 */
let startExam = (url) => {
    let data = fetch(url) 
    .then(res => res.json()) 
    .then(res => {
        if(window.localStorage) {
            localStorage.examPaper = JSON.stringify({exam : res}) 
        }
    })
    .catch(err => {
        if (window.localStorage) {
            localStorage.examPaper = JSON.stringify({exam : err}) 
        }
    })
} 
/**
 * saveQuestion
 */ 
let saveQuestion = (url) => {
    let data = fetch(url) 
    .then(res => res.json()) 
    .then(res => {
        if(window.localStorage) {
            localStorage.question = JSON.stringify({question: res}) 
        }
    })
    .catch(err => {
        if (window.localStorage) {
            localStorage.question = JSON.stringify({question : err})
        }
    })

} 
/**
 * fetchQuestion is a function that will fetch questions from the database  
 * 
 * 
 */
let  fetchQuestion = (elemUrl , tag) => {
    let items = JSON.parse(localStorage.examPaper).exam 
    items.map((item , index) => {
        if (index == tag) {
            let questionUrl = "https://heroku-ace.herokuapp.com" + selector(elemUrl).getAttribute("data-question") + "/course/" + item._id + "/question" 
            let url = questionUrl.replace(/\s/g , "+") 
            console.log(url)
            saveQuestion(url)
            
        }
    })
 }
/**
 * displayExam is a function that will always be called to display the contents in an examination from local 
 * 
 */
let displayQuestion = tag => {
    let showExam = selector("#displayExam")
	/**
	  * useRadio creates a radio button and sets the type , name , 
	  * and value attributes 
	  * @param[Object] The parameters ( elem , name , value )  are object prop 
	  * @return[Object] 
	*/
	let useRadio = (elem , name , value) => {
		let radioButton = createElement(elem) 
		radioButton.type = "radio" 
		radioButton.name = name 
		radioButton.value = value 
		return radioButton
	} 
	/**
	  * useSpan creates a span and sets the text content, 
	  * and style attributes 
	  * @param[Object] The parameters ( elem , text )  are object prop 
	  * @return[Object] 
	*/
	let useSpan = (elem , text) => {
		let span = createElement(elem) 
		span.textContent = text 
		span.style.margin = "1rem"
		return span 
	}
	/**
	  * useButton creates a radio button and sets the type , name , 
	  * and value attributes 
	  * @param[Object] The parameters ( elem , name , value )  are object prop 
	  * @return[Object] 
	*/
	let useButton = (elem ,  text ) => {
		let Button = createElement(elem) 
        Button.type = "button" 
        Button.textContent = text
        Button.setAttribute("class" , "btn btn-primary btn-lg mb-4")
		return Button 
	}
    if ( tag == 0) {
        let items = JSON.parse(localStorage.question).question 
		let len = items.length
        items.map((item , index) => {
            if (index == tag) {
                while(showExam.firstChild){
                    showExam.innerHTML = '' 
                }
				let h3 = createElement("h3")
                h3.textContent = `Question ${index + 1} of ${len}` 
                h3.style.marginBottom = "3rem"
                let examQuestion = createElement("p") 
                examQuestion.id = item._id 
                examQuestion.textContent = item.question 
				let optionA = useRadio("input" , item.question , item.options.optionA) 
				let spanA   = useSpan("span" , item.options.optionA)
				let optionB = useRadio("input" , item.question , item.options.optionB)
                let spanB   = useSpan("span" , item.options.optionB)
                let optionC = useRadio("input" , item.question , item.options.optionC)
                let spanC   = useSpan("span" , item.options.optionC)
				let optionD = useRadio("input" , item.question , item.options.optionD)
				let spanD   = useSpan("span" , item.options.optionD)

                let nextButton = useButton("button" , "Next")
                nextButton.id = tag + 1 
				nextButton.style.marginTop = "3rem"
                let questionContainer = createElement("div") 
                questionContainer.append(h3 , examQuestion , optionA , spanA , optionB , spanB , optionC , spanC , optionD , spanD) 
                questionContainer.id = item._id  
                let displayArea = createElement("div") 
                displayArea.append(questionContainer , nextButton) 
                showExam.append(displayArea)
                return showExam      

            }
        })
    }else if ( tag != 0) {
        let items = JSON.parse(localStorage.question).question
        let len = items.length		
        items.map((item , index) => {
			if ( index == tag && tag != len ) {
                while(showExam.firstChild){
                    showExam.innerHTML = '' 
                }
				
				let h3 = createElement("h3")
                h3.textContent = `Question ${index + 1} of ${len}` 
                h3.style.marginBottom = "3rem"
                let examQuestion = createElement("p") 
                examQuestion.id = item._id 
                examQuestion.textContent = item.question 

                let optionA = useRadio("input" , item.question , item.options.optionA) 
				let spanA   = useSpan("span" , item.options.optionA)
				let optionB = useRadio("input" , item.question , item.options.optionB)
                let spanB   = useSpan("span" , item.options.optionB)
                let optionC = useRadio("input" , item.question , item.options.optionC)
                let spanC   = useSpan("span" , item.options.optionC)
				let optionD = useRadio("input" , item.question , item.options.optionD)
				let spanD   = useSpan("span" , item.options.optionD)
                if ( tag === len -1 ) {
                    let prevButton = useButton("button" , "Prev")
                    prevButton.id = tag - 1 
                    prevButton.style.marginTop = "3rem"
                    prevButton.setAttribute("class" , "btn btn-primary btn-lg mb-4 ml-3 mr-4")
                    
					let submitButton = createElement("a")
                    submitButton.id = "FINISHED" 
                    submitButton.textContent = "End" 
                    submitButton.type = "button" 
                    submitButton.style.color = "#fff" 
                    submitButton.style.display = "block"
                    submitButton.setAttribute("class" , "btn btn-danger ml-3 btn-lg") 					
                    let questionContainer = createElement("div") 
                    questionContainer.id = item._id  
                    questionContainer.append(h3 , examQuestion , optionA , spanA , optionB , spanB , optionC , spanC , optionD , spanD) 
                    let displayArea = createElement("div") 
                    
                    displayArea.append(questionContainer , prevButton , submitButton) 
                    showExam.append(displayArea)
                    return showExam      
				}else {
					let nextButton = useButton("button" , "Next")
                    nextButton.id = tag + 1 
                    nextButton.style.marginTop = "3rem"
					let prevButton = useButton("button" , "Prev")
                    prevButton.id = tag - 1 
                    prevButton.setAttribute("class" , "btn btn-primary btn-lg mb-4 ml-3 mr-4")
                     prevButton.style.marginTop = "3rem"
                    let questionContainer = createElement("div")
                    questionContainer.id = item._id  
                    questionContainer.append(h3 , examQuestion , optionA , spanA , optionB , spanB , optionC , spanC , optionD , spanD) 
                    let displayArea = createElement("div") 
                    displayArea.append(questionContainer , prevButton , nextButton) 
                    showExam.append(displayArea)
                    return showExam
				}
			}
        })
    }
} 
/**
 * Start the exam by clicking the start button 
*/ 
let testPath = "https://heroku-ace.herokuapp.com" + selector("#testRun").getAttribute("data-href") 
let url = testPath.replace(/\s/g , "+") 
//console.log(url) 
startExam(testPath) 
//fetchQuestion("#testRun" , 0)
//displayQuestion(0)

console.log(user)
let startButton = selector("#testRun") 
startButton.addEventListener("click" , event => { 
    console.log("Hi")
    event.preventDefault() 
    examCountDown("#timeText" , "#time" , 0 , 5 , 59) 
    fetchQuestion("#testRun" , 0)
    displayQuestion(0)
    startButton.style.display = "none" 
    let currentCourse = JSON.parse(localStorage.examPaper).exam 
    currentCourse.map(item => {
        selector("#course").textContent = item.name
    })
    
    /*let showExam = selector("#displayExam")
    showExam.append(displayQuestion(0))
    */
}) 

let handleClick = selector("#displayExam") 
handleClick.addEventListener("click" , event => {
    if (event.target.tagName == "BUTTON") {
        let tag = parseInt(event.target.id)
        fetchQuestion("#testRun" , 0)
        displayQuestion(tag) 
        //How to show a question and the selected response 
    }
    if (event.target.tagName == "INPUT") { 
       let value = event.target.value 
       let next = event.target.parentNode.id 
       let saveResponse = ((a , b) => {
           //console.log(a , b) 
           try {
               if (localStorage.response) {
                   let responses = JSON.parse(localStorage.response).response
                   let addResponse = ((v , i) => {
                        let checkRes = responses.find(res => res.id == i) 
                        if (checkRes) { 
                           let id =  responses.findIndex(res => res.id == checkRes.id) 
                           responses.splice(id , 1)
                            responses.push({
                                value :a ,
                                id : b
                            })
                            localStorage.response = JSON.stringify({response : responses})
                            return localStorage.response
                        }else{
                            responses.push({
                                value :a ,
                                id : b
                            })
                            localStorage.response = JSON.stringify({response : responses})
                            return localStorage.response
                        }
                   })(a , b)
               }else {
                   let responses =  [{
                       value : a , 
                       id : b 
                   }]
                   localStorage.response = JSON.stringify({response : responses})
                   return localStorage.response
               }
           }catch(error) {
               console.log(error.message)
           }
       })(value , next)
    }
    if (event.target.id == "FINISHED") {
       
        try {
            if (localStorage.response && localStorage.question) {
                let que = JSON.parse(localStorage.question).question 
                let res = JSON.parse(localStorage.response).response 
                let correctArray = que.map(item => {
                    const correctOption = {
                        value : item.correctOption , 
                        id : item._id ,
                        mark : item.mark
                    }
                    return correctOption
                }) 
                let grade = markExam(correctArray , res)  
                let details = {
                    userEmail : user , 
                    score : grade
                }
                sendData("https://heroku-ace.herokuapp.com/grade-student" , details) 
                .then(res => {
                    selector("body").innerHTML = ` 
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4"></div>
                            <div class="col-md-4 text-center">
                                <h2 class="text-center mb-3">Exam ended successfully </h2>
                                <p class="text-center"> ${res.message}</p> 
                                <a class="btn btn-primary btn-lg" href="/dashboard">Go back</a>
                            </div>
                        </div>
                    </div>`
                }) 
                .catch(err => displayResult(err))
                //!Send the result to the server 
                //displayResult(`Score : ${grade}`)
                examCountDown("#timeText" , "#time" , 0 , 0 , 59) 
                delete localStorage.examPaper 
                delete localStorage.question 
                delete localStorage.response
            }else {
                throw {
                    message : "You have not submitted any response"
                }
            }
        }catch(error){
            displayResult(error.message)
        }
    }
})
function displayResult(msg) {
    let resultBoard = selector("#course") 
    resultBoard.textContent = msg
} 

function markExam(question , response) {
    try {
        if (!(Array.isArray(question) && Array.isArray(response))) {
            throw {
                message : "Your exam is having issues submitting to the server"
            }
        }
        let score = 0 
        question.map(item => {
            let id = item.id 
            let current = response.find(val => val.id == id) 
            let markOption = item.value == current.value ? item.mark : 0
            score += markOption
        })
        return score 
    }catch(error) {
        let msg = error.message
        return msg
    }
} 
