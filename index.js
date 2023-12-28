const btn = document.getElementById("btn")
const baseColorEl = document.getElementById("base-color")
const modeEl = document.getElementById("mode")
const colorContainer = document.getElementById("color-container")
btn.addEventListener("click", getScheme)

//get colors from the API
function getScheme() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColorEl.value.slice(1)}&mode=${modeEl.value}&count=5`)
        .then(response => response.json())
        .then(data => {
            const colorArray = data.colors.map(color => color.hex.value)
            renderScheme(colorArray)
        })
        .catch(error => console.error("Error fetching color scheme:", error));
}


//render the color scheme
function renderScheme(colorArray) {


    colorContainer.innerHTML = ""

    colorArray.forEach(color => {
        const divElement = document.createElement("div")
        divElement.innerHTML = `<div id=${color}></div><p>${color}</p>`
        const innerDivElement = divElement.querySelector("div")
        innerDivElement.style.backgroundColor = color
        colorContainer.appendChild(divElement)
    })
}


//handle the copy color feature
colorContainer.addEventListener("click", handleColorClick);

function handleColorClick(event) {
    if (event.target.id.includes("#")) {
        console.log(event.target.id)
        copyToClipboard(event.target.id)
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert('Copied: ' + text)
        })
        .catch(err => {
            console.error(err)
        })

}