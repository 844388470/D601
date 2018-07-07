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


let filterCooName = (arr) => {
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

export default filterCooName