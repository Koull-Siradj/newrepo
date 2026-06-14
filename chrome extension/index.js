

let websites=[]
const inputel=document.getElementById("input-el")
const uel=document.getElementById("le")
const inputbtn = document.getElementById("input-btn")
const savebtn = document.getElementById("save-btn")
const delbtn = document.getElementById("del-btn")
const cpybtn = document.getElementById("cpy-btn")

const websitesfromlocalstorage= JSON.parse(localStorage.getItem("websites"))

if(websitesfromlocalstorage){
    websites=websitesfromlocalstorage
    render()
    
}  

savebtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

    websites.push(tabs[0].url)
    localStorage.setItem("websites", JSON.stringify(websites))
    render()  
})

})

cpybtn.addEventListener("click", function() {
    navigator.clipboard.writeText(websites.join("\n"))
})

delbtn.addEventListener("dblclick", function() {

    localStorage.clear()
    websites=[]
    render( )
})

inputbtn.addEventListener("click", function() {

    websites.push("https://"+inputel.value)
    inputel.value=""

    localStorage.setItem("websites", JSON.stringify(websites))

    render()
})


function render() {
    let listitems=""
    for(let i=0;i<websites.length;i++){
        listitems += `
    <li>
        <a target="_blank" href = ${websites[i]}> ${websites[i]}
        
        </a>
    
    </li>
    `
    }
    uel.innerHTML=listitems
}