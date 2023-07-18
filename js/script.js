const ipSearchValue = document.querySelector(".ip-search .search-input-btn input"),
    searchBtn = document.querySelector(".ip-search .search-input-btn button"),
    apiKey = "at_fhJK7TRvApIy4UU2skQXP5ooCCEMt";

const map = L.map('map'),
    markerIcon = L.icon({
        iconUrl: './images/location-dot-solid.svg',
        iconSize: [50, 65],
        iconAnchor: [27, 80],
        popupAnchor: [-3, -76],
        shadowUrl: null,
        shadowSize: [null, null],
        shadowAnchor: [null, null],
    });

mapDataAPI();

searchBtn.onclick = () => {
    mapDataAPI(ipSearchValue.value);
}

async function mapDataAPI(ip = "102.191.255.0") {
    try {
        let response = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${ip}`);
        let jsObj = await response.json();
        document.querySelector(".address-info div .ip").innerHTML = jsObj.ip;
        locationText = document.querySelector(".address-info div .location").innerHTML = jsObj.location.region;
        timezoneText = document.querySelector(".address-info div .timezone").innerHTML = jsObj.location.timezone;
        ispText = document.querySelector(".address-info div .isp").innerHTML = jsObj.isp;

        let country = jsObj.location.country,
            city = jsObj.location.city,
            lat = jsObj.location.lat,
            lng = jsObj.location.lng;
        
        positonInMap(country, city, lat, lng);
    }
    catch (error) {
        console.log(error);
    }
}



function positonInMap(country, city, lat, lng) {
    map.setView([lat, lng], 13);

    // Tile Layer
    let googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 15,
    subdomains:['mt0','mt1','mt2','mt3']
    });
    googleStreets.addTo(map);

    // Marker In Map
    let markerInMap = L.marker([lat, lng], {icon: markerIcon});
    markerInMap.addTo(map);
    let pupupMarker = markerInMap.bindPopup(`Country: ${country}<br>City: ${city}`);
    pupupMarker.openPopup();
}