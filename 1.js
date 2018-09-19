const _ =require('lodash')

const arr = [
  {
    name:'111',
  },
  {
    name:'222',
  }
]

const arr2 = {
  a:{
    b:{
      name:''
    }
  }
}

const arr3 = []

arr.forEach(item=>{
  // const arr2 = {
  //   a:{
  //     b:{
  //       name:''
  //     }
  //   }
  // }
 let o =  _.cloneDeep(arr2)

  o.a.b = item.name

  arr3.push(o)
})

console.log(arr3)