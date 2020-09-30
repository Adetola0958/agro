let selector = e => document.querySelector("e") ,
selectAll = e => document.querySelectorAll("e") 
let body = document.querySelector("body")
let items    = Array.from(document.querySelectorAll(".cart"))


items.map(item => {
    //console.log(items)
    item.addEventListener("click" , event => {
        event.preventDefault()
        if ( window.localStorage){
            if (localStorage.cart){
                localStorage.cart = event.target.parentNode.previousSibling.textContent
            }else {
                localStorage.cart = event.target.parentNode.previousSibling.textContent
            }
        }
    })
})
