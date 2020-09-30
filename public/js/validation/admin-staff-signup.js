import {validateName , validateEmail , validateMobile, validatePassword} from "./validate.js" 

let selector = e => document.querySelector(e)

const firstName = selector("#firstName")
const lastName = selector("#lastName")
const otherName = selector("#otherName")
const userEmail = selector("#email")
const userMobile = selector("#number")
const userPassWord = selector("#password")
const qualification = selector("#qualification")
const role = selector("#role")
const classNames = selector("#classNames")
const subjects = selector("#subjects")
const submit = selector("#submit")

/**
 * focus and blur event method on the input field
 */

userEmail.addEventListener("focus" , event => {
	const emailFeedBack = selector(".email")
	if (emailFeedBack.classList.contains("blur-feedback-error")) {
		emailFeedBack.classList.remove("blur-feedback-error")
	}
	emailFeedBack.style.borderColor = "blue"
	emailFeedBack.classList.add("focus-feedback")
})
userEmail.addEventListener("blur" , event => {
	const emailFeedBack = selector(".email")
	try {
		const emailValue = validateEmail(userEmail.value.trim())
		if ( emailValue.value != null ) {
			emailFeedBack.style.borderColor = "green"
		}else {
			emailFeedBack.style.borderColor = "red"
		}
	}catch(error) {
		emailFeedBack.textContent = `${error.message} `
		emailFeedBack.classList.add("blur-feedback-error")
	}
})

userMobile.addEventListener("focus" , event => {
	const mobileFeedBack = selector(".number")
	if (mobileFeedBack.classList.contains("blur-feedback-error")) {
		mobileFeedBack.classList.remove("blur-feedback-error")
	}
	mobileFeedBack.style.borderColor = "blue"
	mobileFeedBack.classList.add("focus-feedback")
})
userMobile.addEventListener("blur" , event => {
	const mobileFeedBack = selector(".number")
	try {
		const mobileValue = validateMobile(userMobile.value.trim())
		if ( mobileValue.value != null ) {
			mobileFeedBack.style.borderColor = "green"
		}else {
			mobileFeedBack.style.borderColor = "red"
		}
	}catch(error) {
		mobileFeedBack.textContent = `${error.message} `
		mobileFeedBack.classList.add("blur-feedback-error")
	}
})


submit.addEventListener("click" , event => {
	const errorArea = selector(".on-submit")	
	
	// const lastNameValue     = validateName(lastName.value.trim()).value
	// const otherNameValue     = validateName(otherName.value.trim()).value
	// const emailValue    = validateEmail(userEmail.value.trim()).value
	// const mobileValue    = validateMobile(userMobile.value.trim()).value 
	// const passWordValue     = validatePassword(userPassWord.value.trim()).value
	// const qualifyValue   =  qualification.trim().value
	// const subjectValue  =  subjects.trim().value
	// const roleValue  =  role.trim().value
	// const classValue =  classNames.trim().value
	event.preventDefault()
	try {
		const firstNameValue  = validateName(firstName.value.trim())
			if ( firstNameValue != null) { //&& lastNameValue != null && otherNameValue != null && emailValue != null &&
				//mobileValue != null && passWordValue != null && qualifyValue != null && subjectValue != null &&
				//roleValue != null && classValue != null) {
		        errorArea.textContent = "Loading..." 
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