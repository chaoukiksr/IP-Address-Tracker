import loadAPIConfig from "./loadAPIConfig.js"

// Global variables
let submitBtn = document.getElementById('submitBtn');
let ipAdr = document.getElementById('ipAdr').getElementsByTagName('div')[1];
let locationDiv = document.getElementById('locationDiv').getElementsByTagName('div')[1];
let timezone = document.getElementById('timezone').getElementsByTagName('div')[1];
let isp = document.getElementById('isp').getElementsByTagName('div')[1];
let map;
let marker;
let ipInfo = document.querySelector('.ipInfo');
let APICONFIG = await loadAPIConfig();

// Main function
const fetchData = async () => {
   let ipAdress = document.getElementById('ipInput').value;
   try {
      let response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_${APICONFIG.API_KEY}&ipAddress=${ipAdress}`, {
         method: 'GET'
      });
      let data = await response.json();

      // Update info elements
      ipAdr.innerHTML = data.ip;
      locationDiv.innerHTML = data.location.region;
      timezone.innerHTML = data.location.timezone;
      isp.innerHTML = data.isp;

      // Calculate heights
      let headerHeigh = window.getComputedStyle(document.querySelector('header')).height;
      let ipInfoHeight = window.getComputedStyle(document.querySelector('.ipInfo')).height;
      let mapHeigh = window.screen.height - (headerHeigh + (ipInfoHeight / 2));

      document.getElementById('map').style.height = mapHeigh;

      // Handle map and markers
      if (marker) {
         marker.remove();
      }

      if (!map) {
         map = L.map('map').setView([data.location.lat, data.location.lng], 10);
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
         }).addTo(map);
      }

      map.setView([data.location.lat, data.location.lng], 10);

      // Setup custom marker
      var customIcon = L.icon({
         iconUrl: 'https://chaoukiksr.github.io/IP-Address-Tracker/images/icon-location.svg',
         iconSize: [28, 35],
         iconAnchor: [16, 32],
         popupAnchor: [0, -32]
      });

      marker = L.marker([data.location.lat, data.location.lng], { icon: customIcon }).addTo(map);

   } catch (error) {
      console.error(error);
   }

   // Handle responsive layout
   ipInfo.style.cssText = `transform: translateY(-${(56 + 24 * 2) / 2}px)`;

   if (window.screen.width < 768) {
      ipInfo.style.cssText = `transform: translateY(-${(199.2 + 24 * 2) / 2}px)`;
   }
}

// Event listeners
submitBtn.addEventListener('click', fetchData);