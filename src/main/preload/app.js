import {clipboard} from 'electron'

function getWindowClipboard(){
  return  clipboard.readText()
}

function setWindowClipboard(content){
  return  clipboard.writeText(content)
}

window.setWindowClipboard = setWindowClipboard
window.getWindowClipboard = getWindowClipboard