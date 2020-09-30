const employees = [{
	name : "James Roy" , employDate : "2020-02-12" , 
	payRoll : false 
	} , {name : "James Roy" , employDate : "2020-02-27" , 
	payRoll : false 
}]
const getNDays = n => {
	let today = new Date() , 
	nDaysAfter = today.getDate() + n 
	today.setDate(nDaysAfter)
	let year = today.getFullYear()  
	let month = String(today.getMonth() + 1).length > 1 
	    ? 
		parseInt(today.getMonth() + 1) 
		: '0' + parseInt(today.getMonth() + 1),
		
	date  = String(today.getDate() ).length > 1 ? today.getDate() 
		: '0' + today.getDate()
		
	return `${year}-${month}-${date}`	
}

const availablePay = (payment , date) => {
	let resumesWD = new Date(date) , 
	month = resumesWD.getMonth() + 1  , 
	year  = resumesWD.getFullYear()  , 
	monthWith30Days = [4 , 6 , 9 , 10]
	let addDays 
	if ( year%4 === 0 && month === 2 ) {
		addDays = 29 
	}else if ( year%4 !== 0 && month === 2) {
		addDays = 28 
	}else if (monthWith30Days.includes(month)) {
		addDays = 30
	}else {
		addDays = 31 
	}
	daysBWD = resumesWD.getDate() - 1 
    workedDays = addDays - daysBWD 
    let dailyRate = payment/addDays , 
	salary = dailyRate*workedDays
	return salary
}
const testPayFunc = availablePay(10000 , '2020 02 12')	
console.log(testPayFunc)
/**
const computeArrears = () => {
	
} 
const computeSalary  = () => {
	l
}
const totalPayable   = () => {
	
}
**/