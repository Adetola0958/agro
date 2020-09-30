import {validateName , validateMobile , validateEmail , validatePassword , verifyPassword } from "./validate.js" 
import {sendData , getData , selector , selectAll , createElement } from "./api.js"  

const RegistrationModel = {
    nigerianState : [
        {name : "Abia" , capital : "Umuahia"} , {name : "Adamawa" , capital : "Yola"} , 
        {name : "Akwa-Ibom" , capital : "Uyo"} , {name : "Anambra" , capital : "Awka"} , 
        {name : "Bauchi" , capital : "Bauchi"} , {name : "Bayelsa" , capital : "Yenegoa"} , 
        {name : "Benue" , capital : "Makurdi"} , {name : "Borno" , capital : "Maiduguri"} , 
        {name : "Cross River" , capital : "Calabar"} , {name : "Delta" , capital : "Asaba"} , 
        {name : "Ebonyi" , capital : "Abakalik"} , {name : "Edo" , capital : "Beniny"} , 
        {name : "Ekiti" , capital : "Ado Ekiti"} , {name : "Enugu" , capital : "Enugu"} , 
        {name : "Gombe" , capital : "Gombe"} , {name : "Imo" , capital : "Owerri"} , 
        {name : "Jigawa" , capital : "Dutse"} , {name : "Kaduna" , capital : "Kaduna"} , 
        {name : "Kano" , capital : "Kano"} , {name : "Katsina" , capital : "Katsina"} , 
        {name : "Kebbi" , capital : "Birnin Kebbi"} , {name : "Kogi" , capital : "Lokoja"} , 
        {name : "Kwara" , capital : "Ilorin"} , {name : "Lagos" , capital : "Ikeja"} , 
        {name : "Nasarawa" , capital : "Lafia"} , {name : "Niger" , capital : "Minna"} , 
        {name : "Ogun" , capital : "Abeokuta"} , {name : "Ondo" , capital : "Akure"} , 
        {name : "Osun" , capital : "Oshogbo"} , {name : "Oyo" , capital : "Ibadan"} , 
        {name : "Plateau" , capital : "Jos"} , {name : "Rivers" , capital : "Port Harcourt"} , 
        {name : "Sokoto" , capital : "Sokoto"} , {name : "Taraba" , capital : "Jalingo"} , 
        {name : "Yobe" , capital : "Damaturu"} , {name : "Zamfara" , capital : "Gusau"} , 
        {name : "FCT" , capital : "Abuja"
    }] ,
    validFormValue : {}
}
class RegistrationView  { 
    constructor() {
        this.select = selector("#stateR") 
        this.inputs = Array.from(this.getElements(".form-control"))
        this.submitButton = selector("#submit") 
    } 
    displayState(states) {
        states.map(
        state => {
            let option = createElement("option") 
            option.value = state.name 
            option.textContent = state.name 
            this.select.append(state)
        })
    }
    createElement(tag){
		return document.createElement(tag)  
	}
	getElement(target) {
		return document.querySelector(target) 
    } 
	getElements(target) {
		return document.querySelectorAll(target) 
	} 
} 

class RegistrationController {
    constructor(view , model) {
        this.view = new view()
        this.model = model
        this.addEvent() 

    }
    handleFocus(e){
        //e.preventDefault() 
        if (e.target.id === "firstNam") {   
            if ( e.target.parentNode.lastChild.tagName === "P") {
                e.target.parentNode.lastChild.remove()    
            }     
            let p = createElement("p")
            p.textContent = "Please , enter your name correctly and neatly "
			e.target.parentNode.appendChild(p)
			e.target.removeEventListener("focus" , this.handleFocus)
		} 
		if ( e.target.id === "stateR") { 
            RegistrationModel.nigerianState.map(state => {
                let option = createElement("option") 
                option.value = state.name 
                option.textContent = state.name 
                e.target.append(option) 
                e.target.classList.add("is-valid")
            })
        }
    }
    handleSubmit(event) { 
		if (event.target.id === "submit") { 
            event.preventDefault()  
            let serverMessage = createElement("p")  
            if ( selector("#agreement").checked && Array.from(selectAll(".filler")).every(elem => elem.classList.contains("is-valid")) ) {
                const {firstName , lastName , email , mobile , password ,stateR} = RegistrationModel.validFormValue
                const userDetails = {
                   firstName : firstName , 
                   lastName : lastName , 
                   email : email , 
                   mobile : mobile , 
                   password : password , 
                   stateOfResidence : selector("#stateR").value, 
                   gender : Array.from(selectAll(".form-check-input")).filter(elem => elem.checked === true)[0].value 
               }  
               serverMessage.textContent = "Please wait while processing ...." 
               event.target.parentNode.insertBefore(serverMessage, event.target)
               let server = "http://localhost:3000/signup"
               sendData(server , userDetails ) 
               .then(res =>{
                   serverMessage.textContent = res.message 
                   event.target.parentNode.insertBefore(serverMessage, event.target)
               }) 
               .catch(err => {
                    serverMessage.textContent = "Error occur"
                    event.target.parentNode.insertBefore(serverMessage, event.target)
                }
                )
			}else {
                event.preventDefault()
                serverMessage.textContent = "Accept our terms and fill all fields correctly ...." 
                
            }
		}
    }
    handleSelect(event) {
        if (event.target.id === "stateR") {
            event.target.value = event.target.value 
            RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
        }
    }
    handleBlur(event) {
		if (event.target.id === "firstName" || event.target.id === "lastName") { 
            if ( event.target.parentNode.lastChild.tagName === "P") {
                event.target.parentNode.lastChild.remove()    
            }     
            let p = createElement("p")   
            if (validateName(event.target.value.trim()).value) {
                p.textContent = "" 
                p.classList.add("valid-feedback") 
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 

            }else { 
                p.textContent = "Enter a valid name" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
            }
            event.target.parentNode.appendChild(p) 
            event.target.value = event.target.value

			event.target.removeEventListener("focus" , this.handleBlur)
		} 
		if (event.target.id === "email") { 
            if ( event.target.nextElementSibling.tagName === "P") {
                event.target.nextElementSibling.remove()    
            }     
            let p = createElement("p")   
            if (validateEmail(event.target.value).value) {
                p.textContent = "" 
                p.classList.add("valid-feedback") 
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
            }else { 
                p.textContent = "The email is invalid" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
            }
            selector(".bright-form").insertBefore(p , event.target.nextElementSibling) 
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        }
        if (event.target.id === "mobile") { 
            if ( event.target.nextElementSibling.tagName === "P") {
                event.target.nextElementSibling.remove()    
            }     
            let p = createElement("p")   
            if (validateMobile(event.target.value.trim()).value) {
                p.textContent = "" 
                p.classList.add("valid-feedback") 
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
            }else { 
                p.textContent = "Provide a valid mobile number" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
            }
            selector(".bright-form").insertBefore(p , event.target.nextElementSibling) 
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
		} 
		if (event.target.id === "password") { 
            if ( event.target.parentNode.lastChild.tagName === "P") {
                event.target.parentNode.lastChild.remove()    
            }     
            let p = createElement("p")   
            if (validatePassword(event.target.value).value) {
                p.textContent = "" 
                p.classList.add("valid-feedback") 
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
            }else { 
                p.textContent = "Password too weak" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
            }
            event.target.parentNode.appendChild(p) 
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
        }
        if (event.target.id === "cpass") { 
            if ( event.target.parentNode.lastChild.tagName === "P") {
                event.target.parentNode.lastChild.remove()    
            }     
            let p = createElement("p")   
            if (verifyPassword(selector("#password") , event.target).value) {
                p.textContent = "" 
                p.classList.add("valid-feedback") 
                event.target.classList.contains("is-invalid") ? event.target.classList.remove("is-invalid") : null 
                event.target.classList.add("is-valid")
                RegistrationModel.validFormValue[`${event.target.id}`] = event.target.value 
            }else { 
                p.textContent = "Password does not match" 
                p.classList.add("invalid-feedback") 
                event.target.classList.add("is-invalid")
            }
            event.target.parentNode.appendChild(p) 
            event.target.value = event.target.value 
			event.target.removeEventListener("focus" , this.handleBlur)
		}
		
	}
    addEvent() {
        this.view.inputs.map(field => {
            field.addEventListener ("focus" ,  this.handleFocus)
            field.addEventListener("blur" , this.handleBlur) 
            field.addEventListener("click" , this.handleSubmit) 
            field.addEventListener("select" , this.handleSelect)
        })
    }
} 

const app = new RegistrationController(RegistrationView , RegistrationModel)
