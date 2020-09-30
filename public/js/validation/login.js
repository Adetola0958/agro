//!Handling of login request and redirecting the user to the dashboard 
import {validateEmail , validatePassword , verifyPassword } from "./validate" 

 //!Helper function for uniquely selecting DOM elements  
let selector = e => document.querySelector(e) 
let createElement = e => document.createElement(e) 

//!Handle submit event 
selector("form").addEventListener("submit" , event => {
	event.preventDefault()
	
    //!validate all the input field  	
	let userEmail    = validateEmail(selector("#email").value.trim()) 
	let userPass     = validatePassword(selector("#password").value.trim())
	
	
	//! Now  , try to check if the value is available in the local storage area 
	try {
		if ( userEmail.value != null && userPass.value != null ) { 
			//! Grab the values from local storage and compare against what the user entered 
			try {
				//!check if the browser environment supports local storage 
				if ( window.localStorage ) { 
				    //! Grab the values stored to localStorage 
					const storedEmail = JSON.parse(localStorage.validUser).userEmail 
					const storedPassKey = JSON.parse(localStorage.validUser).userPass 
					const storedUser    = JSON.parse(localStorage.validUser).userName 
					console.log(storedEmail , storedPassKey) 
					//!check to see if the values are equal then work out something 
					   try {
						   if ( storedEmail === userEmail.value && storedPassKey === userPass.value) {
							   //!Redirect the user to the dashboard  
							   //!Setup cookies  , if someone tries to directly see dashboard without cookie ... No 
							   
                                const path = selector("#path") 
							    const route = {
	                               currentPage : path.getAttribute("data-currentPath")  , 
	                               targetPage  : path.getAttribute("data-nextPath")
                                }
								localStorage.user = storedUser 
                                if (location.pathname == route.currentPage) { 
								    //!Create and save logged in user to localStorage 
			                            setTimeout(function() {
			                                window.location.replace(route.targetPage)
                                        } , 1000)
									
                                }	 
						    }else {
							   throw {
								   name : "Local Storage Error" , 
								   message : "Invalid Login Credentials" 
							   }
						   }
					   }catch(error) {
						    selector(".error").textContent = `${error.name} : ${error.message} `
					   }
				   }else {
					   throw {
						   name : "Storage Error" , 
						   message : "Local Storage is not supported"
					   }
				   }
			   }catch(error) {
				   selector(".error").textContent = `${error.name} : ${error.message} ` 
			   }
		}else {
			throw {
				name : "Login Error" , 
				message : "Invalid Login Credentials"
			}
		}
	}catch(error) {
			selector(".error").textContent = `${error.name} : ${error.message} `
	} 
}) 

