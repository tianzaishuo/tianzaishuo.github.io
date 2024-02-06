const secondHand = document.querySelector('.second-hand')
const minHand = document.querySelector('.min-hand')
const hourHand = document.querySelector('.hour-hand')





function setTime() {
  const now = new Date()

  // 获取当前的秒数
  const seconds = now.getSeconds();
  const secondsDegrees = seconds * 6 + 90
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`
  // console.log(secondDegrees);
  // 获取当前的分针数
  const mins = now.getMinutes();
  const minsDegrees = mins * 6 + 90
  minHand.style.transform = `rotate(${minsDegrees}deg)`


  // 获取当前的小时数
  const hours = now.getHours();
  const hoursDegrees = hours * 30 + 90 + (mins / 60) * 30
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`
}

setTime()
setInterval(setTime, 1000)