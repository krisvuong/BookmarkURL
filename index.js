
let myURLs = []  // local array of saved URLs
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const inputEl = document.getElementById("input-el")  // text field input
const ulEl = document.getElementById("ul-el")  // unordered list of URLs

/* 
 * get URLs from local storage
 * if any URLs, then update local myURLs and render them
 */
const urlsFromLocalStorage = JSON.parse(localStorage.getItem("myURLs"))
if (urlsFromLocalStorage){  // if not empty
    myURLs = urlsFromLocalStorage  // assign to local array
    render(myURLs)
}

// event listeners for buttons
inputBtn.addEventListener("click", saveInput)
deleteBtn.addEventListener("dblclick", deleteAll)
tabBtn.addEventListener("click", saveTab)

// save input button
function saveInput() {
    myURLs.push(inputEl.value)  // save text field value to myURLs array
    inputEl.value=""  // clear text field
    localStorage.setItem("myURLs", JSON.stringify(myURLs))  // update local storage 
    render(myURLs)
}

// delete all button
function deleteAll() {
    localStorage.clear()
    myURLs = []
    render(myURLs)
}

// save tab button
function saveTab() {
    // get URL of active tab (on current window) using Chrome API
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        // when the query on the tab succeeds, the API returns a "tabs" value and executes function(tabs)
        myURLs.push(tabs[0].url)
        localStorage.setItem("myURLs", JSON.stringify(myURLs))  // update local storage
        render(myURLs)
    })
}

// render URLs on screen as an unordered list HTML element
function render(urls){
    let listItems = "Your websites:"
    for (let i = 0; i < urls.length; i++){
        listItems += `
                    <li>
                        <a href='${urls[i]}' target='_blank'>
                            ${urls[i]}
                        </a>
                    </li>`
    }
    // OUTSIDE the loop, edit DOM (expensive)
    ulEl.innerHTML = listItems
}