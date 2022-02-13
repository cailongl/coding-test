function CreateCover() {
  this.div = null
  this.initCover()
}

CreateCover.prototype.initCover = function () {
  const dom = document.getElementsByClassName('table-resize-cover')[0]
  if (dom) {
    this.div = dom
    return this
  }
  const div = document.createElement('div')
  div.className = 'table-resize-cover'
  div.style.display = 'none'
  document.body.appendChild(div)
  this.div= div
}

CreateCover.prototype.show = function () {
  this.div.style.display = 'block'
}

CreateCover.prototype.hidden = function () {
  this.div.style.display = 'none'
}


export default CreateCover