let selector = e => document.querySelector(e) 
let user = selector("#user") 
let userName = user.getAttribute("data-name") 
let url = "http://localhost:3500/" +  userName + "/examination"
try { 
    let fetchExams = async () => {
	    let fetchData = await fetch(url)
        let data = await fetchData.json() 
	    if ( data ) {
		    console.log(data) 
		    return 
	    }else {
		    throw {
			    message : "Unable to fetch exam"
		    }
		}
	}
	fetchExams()
}catch(error) {
	console.log(error.message)
}


	