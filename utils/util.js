
const formatTime = time => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const timeFn = (min, max) => {
  let value = new Date(max).getTime() - new Date(min.replace(/-/g, "/")).getTime();
  if (value >= 31104000000){
    return Math.floor(value / 31104000000) + '年前'
  } else if (value >= 2592000000){
    return Math.floor(value / 2592000000) + '个月前'
  } else if (value >= 86400000){
    return Math.floor(value / 86400000) + '日前'
  } else if (value >= 3600000){
    return Math.floor(value / 3600000) + '小时前'
  } else if (value >= 60000){
    return Math.floor(value / 60000) + '分钟前'
  } else if (value < 60000){
    return '刚刚'
  }
}

const timeWeek = (time) => {
  let week = new Date(time).getDay();
  switch (week) {
    case 0:
      return "周日";
    case 1:
      return "周一";
    case 2:
      return "周二";
    case 3:
      return "周三";
    case 4:
      return "周四";
    case 5:
      return "周五";
    case 6:
      return "周六";
  }  
}

const filterIdName = (arr, id, idname = 'id',name='name') => {
  let n = arr.filter(obj => obj[idname]==id)
  return n.length !== 0 ? n[0][name]:''
}


module.exports = {
  formatTime,
  filterIdName,
  timeFn: timeFn
}
