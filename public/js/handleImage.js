//!Handling file upload using the file api 
let selector = e => document.querySelector(e) 
selector("#profile").addEventListener('change' , showImage) 

//!Reading file as a data url 
function showImage() {
	let files = this.files 
	let f = files[0] 
	let span = document.createElement('p') 
	span.textContent = f.name 
	selector("#displayImage").append(span) //!f.size , f.type , f.name , f.lastModified , 
	if ( files.length === 0) {
		selector("#displayImage").textContent = "No file Selected" 
		return 
	} 
	let reader = new FileReader() 
	reader.onload = function(event) {
		let img = new Image() 
		img.onload = function() {
		    selector("#displayImage").append(img)
		}
		img.src = event.target.result 
		img.style.width = '100px'
		img.style.height = '100px'
		img.style.borderRadius = "50%"
	}
	reader.onerror = function(event) {
		selector("#displayImage").textContent = "An error just occured"
	}
	reader.readAsDataURL(files[0]) 
} 
