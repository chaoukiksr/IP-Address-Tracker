// const { icon } = require("leaflet")

let submitBtn = document.getElementById('submitBtn')
let ipAdr = document.getElementById('ipAdr').getElementsByTagName('div')[1]
let locationDiv = document.getElementById('locationDiv').getElementsByTagName('div')[1]
let timezone = document.getElementById('timezone').getElementsByTagName('div')[1]
let isp = document.getElementById('isp').getElementsByTagName('div')[1]
let map
let marker
let ipInfo = document.querySelector('.ipInfo')
let height =  window.getComputedStyle(ipInfo).height

const fetchData = async () => {
   let ipAdress = document.getElementById('ipInput').value
   try {
      let response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_RuCmqaIYKHFLSVg8vDkGpWKR0bv8W&ipAddress=${ipAdress}`, {
         method: 'GET'
      })
      let data = await response.json()
      ipAdr.innerHTML = data.ip
      locationDiv.innerHTML = data.location.region
      timezone.innerHTML = data.location.timezone
      isp.innerHTML = data.isp

      let headerHeigh = window.getComputedStyle(document.querySelector('header')).height
      let ipInfoHeight = window.getComputedStyle(document.querySelector('.ipInfo')).height
      let mapHeigh = window.screen.height - (headerHeigh + (ipInfoHeight / 2))
      
      document.getElementById('map').style.height = mapHeigh

      if(marker){
         marker.remove()
      }
      
      if(!map){
         map = L.map('map').setView([data.location.lat,data.location.lng],18)
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
         }).addTo(map);
      }
      map.setView([data.location.lat, data.location.lng], 18)
         var customIcon = L.icon({
            iconUrl: 'https://chaoukiksr.github.io/IP-Address-Tracker/images/icon-location.svg',    // Add your icon image path
            iconSize: [28, 35],                  // Size of the icon [width, height]
            iconAnchor: [16, 32],                // Point of the icon which corresponds to marker's location
            popupAnchor: [0, -32]                // Point from which popup should open relative to iconAnchor
         });
         marker = L.marker([data.location.lat, data.location.lng], { icon: customIcon }).addTo(map)
      
      
   } catch (error) {
      console.error(error)
   }   
   
      
   ipInfo.style.cssText = `transform: translateY(-${(56+16+16)/2}px)`
   // console.log(window.screen.width)
   if(window.screen.width<768){
      ipInfo.style.cssText = `transform: translateY(-${(199.2+16+16)/2}px)`

   }
   // console.log(ipInfo.style)
}
submitBtn.addEventListener('click', fetchData)
// console.log(height)

// console.log(headerHeigh)
