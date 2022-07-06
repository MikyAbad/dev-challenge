const fxTableController = require('./fxTable.controller') 
const ROOT_ELEMENT = document.getElementById('root') 

function render(child) {
  ROOT_ELEMENT.innerHTML = '' 
  ROOT_ELEMENT.appendChild(child) 
}

function bootstrapApplication() {
  fxTableController.load(render) 
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication() 
}) 