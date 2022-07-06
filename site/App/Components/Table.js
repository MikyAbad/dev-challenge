const newRow = () => document.createElement('tr') 
const newHeader = (content) => {
  const th = document.createElement('th') 
  th.innerText = content 
  return th 
} 
const newCell = (content) => {
  const td = document.createElement('td') 

  if (typeof content === 'object') {
    td.appendChild(content) 
  } else {
    td.innerHTML = content 
  }
  return td 
} 

class Table {
  constructor({ headers, dataMatrix }) {
    if (!headers ||
      !dataMatrix ||
      !Array.isArray(headers) ||
      !Array.isArray(dataMatrix)) {
      console.log('invalid Table params', ...arguments)
    }
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')
    table.appendChild(thead)
    table.appendChild(tbody)
    const headerRow = newRow()
    headers.forEach((head) => {
      headerRow.appendChild(newHeader(head))
    })
    thead.appendChild(headerRow)
    dataMatrix.forEach((entry) => {
      const dataRow = newRow()
      entry.forEach((cell) => {
        dataRow.appendChild(newCell(cell))
      })
      tbody.appendChild(dataRow)
    })
    this.render = () => table
    return this
  }
}

module.exports = Table 