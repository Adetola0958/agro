/**
 * Require dependencies 
*/
import {validateName , validateEmail , validatePassword , verifyPassword } from "./validate.js" 

 //!Helper function for uniquely selecting DOM elements  
let selector = e => document.querySelector(e) 
//let createElement = e => document.createElement(e) 

/**
 * Once a field is focused , the user should receive a message 
 *
*/
const userName  = selector("#name")
const userEmail = selector("#email")
const userPass  = selector("#password") 
/**
  *Focus and blur event on name input field  
*/

userName.addEventListener("focus" , event => {
	const nameFeedBack = selector(".name-feedBack")
	if (nameFeedBack.classList.contains("blur-feedback-error")) {
		nameFeedBack.classList.remove("blur-feedback-error")
	}
	nameFeedBack.textContent = "Choose a name e.g Stainless "
	nameFeedBack.classList.add("focus-feedback")
})
userName.addEventListener("blur" , event => {
	const nameFeedBack = selector(".name-feedBack")
	try {
		const nameValue = validateName(userName.value.trim())
		if ( nameValue.value != null ) {
			nameFeedBack.textContent = "Good"
	        //!nameFeedBack.classList.add("blur-feedback-success")
		}else {
			throw {
				name : "NameError " , 
				message : "Name should only be alphanumeric"
			}
		}
	}catch(error) {
		nameFeedBack.textContent = `${error.name} : ${error.message} `
		nameFeedBack.classList.add("blur-feedback-error")
	}
})
/**
 * Validate the email field 
 * Send get request to the server to see if the names are already taken 
  *
*/
userEmail.addEventListener("focus" , event => {
	const emailFeedBack = selector(".email-feedBack")
	if (emailFeedBack.classList.contains("blur-feedback-error")) {
		emailFeedBack.classList.remove("blur-feedback-error")
	}
	emailFeedBack.textContent = "Enter a valid email"
	emailFeedBack.classList.add("focus-feedback")
})
userEmail.addEventListener("blur" , event => {
	const emailFeedBack = selector(".email-feedBack")
	try {
		const emailValue = validateEmail(userEmail.value.trim())
		if ( emailValue.value != null ) {
			emailFeedBack.textContent = "Good"
		}else {
			throw {
				name : "EmailError " , 
				message : "The email you provide is not valid"
			}
		}
	}catch(error) {
		emailFeedBack.textContent = `${error.name} : ${error.message} `
		emailFeedBack.classList.add("blur-feedback-error")
	}
})
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

/** 
 * Handling the submit event 
 */

selector("#submit").addEventListener("click" , event => {	
	const nameValue     = validateName(userName.value.trim()).value
	const emailValue    = validateEmail(userEmail.value.trim()).value 
	const passValue     = validatePassword(userPass.value.trim()).value
	const accept        = selector("#userAccept")
	event.preventDefault()
	try {
		if ( accept.checked) {
		    if ( nameValue != null && emailValue != null && passValue != null ) {
				const errorArea = selector(".on-submit")
		        errorArea.textContent = "Loading..." 
				const formData = new FormData() 
				formData.append("name" ,nameValue )
				formData.append("email" ,emailValue )				
				formData.append("password" ,passValue )	
				const userValue = {
					name : nameValue , 
					email : emailValue , 
					password : passValue
				}
				//! Now use the fetch API to send the data to the server 
				let sendData = async () => {
					let userData = await fetch('http://localhost:3500/signup' , {
								method : 'POST' , 
								redirect : "follow" , 
		                        headers : {
			                        'Content-Type' : 'application/json'
		                        } , 
		                        body : JSON.stringify(userValue)
					}) 
					let response = await userData.json()
					if (response) {
						selector("body").textContent = response 
					}
				}
				
            }else {
			    throw {
				    name : "WrongFormValue" , 
					message : "Please , fill the fields correctly"
				}
				event.preventDefault()
			}
		}else {
			throw {
				    name : "TermsAndConditionError" , 
					message : "Kindly accept our terms and condition"
				}
			event.preventDefault()
		}
	}catch(error) {
	    const errorArea = selector(".on-submit")
		errorArea.textContent = error.message 
		event.preventDefault()
	}
})