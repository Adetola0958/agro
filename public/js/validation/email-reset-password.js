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
const userPass    = selector("#email")


/** 
 * Handling the submit event 
 */

selector("#submit").addEventListener("click" , event => {	
	const errorArea = selector(".on-submit")
	try {
				//! Now use the fetch API to send the data to the server 
				let sendData = async () => {
					let userData = await fetch('http://localhost:3000/reset-password' , {
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
	}catch(error) {
	    const errorArea = selector(".on-submit")
		errorArea.textContent = error.message 
		event.preventDefault()
	}
})