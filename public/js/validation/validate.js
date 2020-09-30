/**
 *  Program      :  validate.js 
 *  Description  :  A mini javaScript library for validating inputs against
                  selected format. The library uses modern javaScript features
 * Author       :  Adeleke Bright 
 * Company      :  ACE AFRICA 
 * Last Modified: 2020-05-10
*/
    
/**
 * validateName() as a function validates input field created for name inputs
 * @params[String] A string returned from the input field 
 * @return[Object] An object specifying a message an a value after validation
*/
 
export const validateName = (val) => { 
    const namePattern = /^[a-zA-Z]+(\-+?)?([a-zA-Z]?)+$/ 
	try {
		if ( String(val).match(namePattern)) {
	        return {
		        name : "Matched" , 
		        value : val.trim() 
	        } 
		}else {
			throw {
				name : "Please provide a valid name" , 
				value : null 
			}
		}
	}catch(err) {
		return {
			name : err.name , 
			value : err.value 
		}
	}
} 

/**
 * validateEmail() as a function validates input field created for email inputs
 * @params[String] A string returned from the input field 
 * @return[Object] An object specifying a message an a value after validation
*/
export const validateEmail = (val) => {
	const emailPattern = /^[a-zA-Z]+(\d+|_+|\.)?([a-zA-Z]+|\d+)*@[a-zA-Z]{3,}\.[a-zA-Z]{2,6}$/
	try { 
		if ( String(val).match(emailPattern)) {
	        return { 
		        name : "Matched" , 
		        value : val.trim() 
	        } 
		}else {
			throw {
				name : "Please provide a valid email" , 
				value : null 
			}
		}
	}catch(err) {
		return {
			name : err.name , 
			value : err.value 
		}
	}
} 

/**
 * validatePassword() as a function validates input field created for name password
 * @params[String] A string returned from the input field 
 * @return[Object] An object specifying a message an a value after validation
*/ 
export const validatePassword = (val) => {
	let passPattern = /[a-zA-Z0-9]{8}/
	try { 
		if ( String(val).match(passPattern)) {
	        return { 
		        name : "Matched" , 
		        value : val.trim() 
	        } 
		}else {
			throw {
				name : "Please provide a valid password" , 
				value : null 
			}
		}
	}catch(err) {
		return {
			name : err.name , 
			value : err.value 
		}
	}
} 
/**
 * verifyPassword() as a function verifies if password match
 * @params[String] A string returned from the input field 
 * @return[Object] An object specifying a message an a value after validation
*/ 
export const verifyPassword = (a , b) => { 
    try {
		if ( a.value === b.value ) {
			return {
				name : "Password matched" , 
				value : a.value 
			}
		}else {
			throw {
				name : "Password did not match again " , 
				value : null 
			}
		}
	}catch(error) {
		return {
			name : error.name ,  
			value : error.value 
		}
	}
}

/**
 * validateMobile() as a function validates input field created for name password
 * @params[String] A string returned from the input field 
 * @return[Object] An object specifying a message an a value after validation
*/ 
export const validateMobile = (val) => {
	let passPattern = /(080|070|081|090\d){8}/
	try { 
		if ( String(val).match(passPattern)) {
	        return { 
		        name : "Matched" , 
		        value : val.trim() 
	        } 
		}else {
			throw {
				name : "Please provide a valid mobile number" , 
				value : null 
			}
		}
	}catch(err) {
		return {
			name : err.name , 
			value : err.value 
		}
	}
} 
