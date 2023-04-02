
let myURLs = []
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")


/* 
 * get URLs from local storage
 * if any URLs, then update local myURLs and render
 * else, do nothing
 */
const urlsFromLocalStorage = JSON.parse(localStorage.getItem("myURLs"))
if (urlsFromLocalStorage){
    myURLs = urlsFromLocalStorage
    render(myURLs)
}

// event listeners for buttons
inputBtn.addEventListener("click", saveInput)
deleteBtn.addEventListener("dblclick", deleteAll)
tabBtn.addEventListener("click", saveTab)

// called in event listener for save input button
function saveInput() {
    myURLs.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myURLs", JSON.stringify(myURLs))
    render(myURLs)
}

// called in event listener for delete all button
function deleteAll() {
    localStorage.clear()
    myURLs = []
    render(myURLs)
}

// called in event listener for save tab button
function saveTab() {
    // get URL of current tab using Chrome API
    // get active tab and current window
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        // when the query on the tab succeeds, the API returns a "tabs" value and executes function(tabs)
        myURLs.push(tabs[0].url)
        localStorage.setItem("myURLs", JSON.stringify(myURLs))
        render(myURLs)
    })


}

// draw URLs on screen as an unordered list HTML element
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
    // OUTSIDE the loop, edit the DOM (editing DOM is expensive)
    ulEl.innerHTML = listItems
}