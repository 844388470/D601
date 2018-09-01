import QQMapWX from './qqmap-wx-jssdk.min.js'
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: '5RBBZ-ANHWW-APHRT-OUNY7-UDIZK-LBB7K'
})

// const filterCooName = (lng, lat) => {
//   return new Promise((resolve,reject)=>{
//     qqmapsdk.reverseGeocoder({
//       location: {
//         latitude: lat,
//         longitude: lng
//       },
//       success: function (res) {
//         resolve(res);
//       },
//       fail: function (res) {
//         resolve(res);
//       }
//     })
//   })
// }


const filterCooName = (arr) => {
  let list = []
  let nPro = Promise.resolve()
  for (let i = 0; i < arr.length; i++) {
    nPro = nPro.then(() => {
      return new Promise((resolve) => {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: arr[i].latitude,
            longitude: arr[i].longitude
          },
          success: function (res) {
            list.push(res.result.address)
            resolve(list)
          },
          fail: function (err) {
            console.log(arr[i].longitude)
            list.push('')
            resolve(list)
          }
        })
      })
    })
  }
  return nPro
}


const getAddressList = (value)=>{
  return new Promise((resolve) => {
    qqmapsdk.getSuggestion({
      keyword:value,
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        console.log(res)
        resolve({data:[]})
      }
    })
  })
}

const getDistance=(start,end)=>{
  return new Promise((resolve) => {
    qqmapsdk.calculateDistance({
      from: start,
      to: [end],
      success: function (res) {
        console.log(res)
        resolve(res.result.elements[0].distance == -1 ? 0 : res.result.elements[0].distance)
      },
      fail: function (err) {
        resolve(0)
      }
    })
  })
}

const getDistanceList=(list)=>{
  let arr=[]
  if(list.length>5){
    let n=[]
    let x,y,z
    y = parseInt(list.length / 2) -1
    x = parseInt(y / 2)
    z=x+y
    n = [list[0], list[x], list[y], list[z], list[list.length-1]]
    list=n
  }
  for(let i=0;i<list.length-1;i++){
    arr.push(getDistance(list[i], list[i+1]))
  }
  return Promise.all(arr).then(res=>{
    let num=0
    for(let i in res){
      num+=res[i]
    }
    return Promise.resolve(num)
  })
}

module.exports={ 
  filterCooName,
  getAddressList,
  getDistance: getDistanceList
}
