

const fs =require('fs')
const path =require('path')


// let as = fs.readFileSync(path.join(__dirname,'1.json'))
// console.log(as.toString())
//
// console.log(JSON.parse(as.toString()).name)

// const re = '11111111111'
// const p = 'F://1.txt'
// let content  = fs.readFileSync(p,'utf8').toString()
// console.log(content)
//
// fs.writeFileSync(p,new Buffer(re))

let files = fs.readdirSync('D:\\WebStorm 2017.2.2\\my-workspace\\ice-air\\dist\\pack\\ice-air-win32-x64\\resources\\app\\node_modules')

console.dir(files.length)

