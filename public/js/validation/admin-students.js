import {validateName, validatePassword} from "./validate.js" 

let selector = e => document.querySelector(e)

const firstName = selector("#firstName")
const lastName = selector("#lastName")
const otherName = selector("#otherName")
const userPassWord = selector("#password")
const className = selector("#className")
const subjects = selector("#subjects")
const regNumber = selector("#regNumber")

selector("#submit").addEventListener("click" , event => {	
	const firstNameValue     = validateName(firstName.value.trim())
	const lastNameValue     = validateName(lastName.value.trim())
	const otherNameValue     = validateName(otherName.value.trim())
	const passWordValue     = validatePassword(userPassWord.value.trim())
	const regValue   =  regNumber.trim().value
	const subjectValue  =  subjects.trim().value
	const classValue =  className.trim().value
	//event.preventDefault()
	try {
            if ( firstNameValue != null && lastNameValue != null && otherNameValue != null && passWordValue != null 
                && regValue != null && subjectValue != null && classValue != null) {
				const feedbackArea = selector(".on-submit")
		        feedbackArea.textContent = "Done" 
            }else {
			    throw {
				    name : "WrongFormValue" , 
                    message : "Please , fill the fields correctly"
                    
				}
			}
	}catch(error) {
	    const feedbackArea = selector(".on-submit")
		feedbackArea.textContent = `${error.message}`
		event.preventDefault()
	}
})