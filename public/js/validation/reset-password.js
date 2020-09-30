/**
 * Require dependencies 
*/
import {validatePassword , verifyPassword } from "./validate.js" 

 //!Helper function for uniquely selecting DOM elements  
let selector = e => document.querySelector(e) 
let createElement = e => document.createElement(e) 

/**
 * Once a field is focused , the user should receive a message 
 *
*/
const userPass    = selector("#password")
const confirmPass = selector("#confirmPassword")

/**
 * Validate the Password field 
 * Refactor this code by using Object Design so as to reduce all the dupliate codes  
  *
*/
userPass.addEventListener("focus" , event => {
	const passwordFeedBack = selector(".password-feedBack")
	if (passwordFeedBack.classList.contains("blur-feedback-error")) {
		passwordFeedBack.classList.remove("blur-feedback-error")
	}
	passwordFeedBack.textContent = "Strong password means strong security"
	passwordFeedBack.classList.add("focus-feedback")
})
userPass.addEventListener("blur" , event => {
	const passwordFeedBack = selector(".password-feedBack")
	const passwordValue = validatePassword(userPass.value.trim())
	console.log(passwordValue.value , passwordValue.name)
	try {
		if ( passwordValue.value) {
			passwordFeedBack.textContent = "Good"
		}else {
			throw {
				name : "PasswordError " , 
				message : "Provide must be atleast 8 characters long and mixed case"
			}
		}
	}catch(error) {
		passwordFeedBack.textContent = `${error.name} : ${error.message} `
		passwordFeedBack.classList.add("blur-feedback-error")
	}
})
confirmPass.addEventListener("blur" , event => {
	const passwordFeedBack = selector(".confirm-password-feedBack")
	const passwordValue = validatePassword(userPass.value.trim()) 
	const confirmValue = validatePassword(confirmPass.value.trim())
	const  verify = verifyPassword(passwordValue , confirmValue)
	console.log(verify.value )
	try {
		if ( verify.value && verify.value != ' ') {
			passwordFeedBack.textContent = "Good"
			passwordFeedBack.style.color = "#000"
		}else {
			throw {
				name : "PasswordError " , 
				message : "password does not match "
			}
		}
	}catch(error) {
		passwordFeedBack.textContent = `${error.name} : ${error.message} `
		passwordFeedBack.classList.add("blur-feedback-error")
	}
})

/** 
 * Handling the submit event 
 */

selector("#submit").addEventListener("click" , event => {	
	const passwordValue = validatePassword(userPass.value.trim()) 
	const confirmValue = validatePassword(confirmPass.value.trim())
	const  verify = verifyPassword(passwordValue , confirmValue).value
	const errorArea = selector(".on-submit")
	try {
		    if ( verify != null ) {
				const errorArea = selector(".on-submit")
		        errorArea.textContent = "Good" 
				
				//! Now use the fetch API to send the data to the server 
				let sendData = async () => {
					let userData = await fetch('http://localhost:3000/reset-password-authorization' , {
		                        method : 'POST' , 
		                        headers : {
			                        'Content-Type' : 'application/x-www-form-urlencoded'
		                        } , 
		                        body : new FormData(selector('form'))
					})
					if ( userData ) {
						console.log(userData) 
					}else {
						console.log("Nothing go")
					}
				}
            }else {
			    throw {
				    name : "WrongFormValue" , 
					message : "Please , fill the fields correctly"
				}
				event.preventDefault()
			}
	}catch(error) {
	    const errorArea = selector(".on-submit")
		errorArea.textContent = error.message 
		event.preventDefault()
	}
})