// let myURLs = ["www.google.com", "www.amazon.com", "www.gmail.com"]
let myURLs = []
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")

inputBtn.addEventListener("click", saveInput)

// called in event listener for save input button
function saveInput() {
    myURLs.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myURLs", JSON.stringify(myURLs))
    renderSavedURLs()
}


function renderSavedURLs(){
    let listItems = "Your websites:"
    let urlsFromLocalStorage = JSON.parse(localStorage.getItem("myURLs"))
    for (let i = 0; i < urlsFromLocalStorage.length; i++){
        // a different method to edit the inner HTML of an element:
        // ulEl.innerHTML += "<li>" + myURLs[i] + "</li> "

        /* another way to do it
        const li = document.createElement("li")  // create an HTML element 
        li.textContent = myURLs[i] // add text content
        ulEl.append(li)  // append HTML <li> element to main <ul> element
        */

        // write inputs in HTML formatting
        listItems += `
                    <li>
                        <a href='${urlsFromLocalStorage[i]}' target='_blank'>
                            ${urlsFromLocalStorage[i]}
                        </a>
                    </li>`
    }
    // OUTSIDE the loop, edit the DOM (editing DOM is expensive)
    ulEl.innerHTML = listItems
}