// const { icon } = require("leaflet")

let submitBtn = document.getElementById('submitBtn')
let ipAdr = document.getElementById('ipAdr').getElementsByTagName('div')[1]
let locationDiv = document.getElementById('locationDiv').getElementsByTagName('div')[1]
let timezone = document.getElementById('timezone').getElementsByTagName('div')[1]
let isp = document.getElementById('isp').getElementsByTagName('div')[1]
let map
let marker

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
         iconUrl: '/images/icon-location.svg',    // Add your icon image path
         iconSize: [28, 35],                  // Size of the icon [width, height]
         iconAnchor: [16, 32],                // Point of the icon which corresponds to marker's location
         popupAnchor: [0, -32]                // Point from which popup should open relative to iconAnchor
      });
       marker = L.marker([data.location.lat, data.location.lng], { icon: customIcon }).addTo(map)

      
   } catch (error) {
      console.error(error)
   }   
    
      
    
   
}
submitBtn.addEventListener('click', fetchData)



