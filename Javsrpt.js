////---------->>>>>>>>+++++<<<<<<<<<<----------------------//////////
const months=["january","February","March","April","May","June","July","August","September","October","November","December"];
const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const time1=document.getElementById("time");
const date1=document.getElementById("date");
const currentweatheritem_s=document.getElementById("currwthritems");
const time_Zone=document.getElementById("timez");
const country_Id=document.getElementById("country");
const weatherForecast=document.getElementById("weatherforecast");
const currTemp1=document.getElementById("cur-temp");


setInterval(()=>{
    const time=new Date();
    const month=time.getMonth();
    const date=time.getDate();
    const day=time.getDay();
    const hour=time.getHours();
    const hourin12hr=hour>=13?hour%12:hour;
    let hr=hourin12hr;
    if(hourin12hr<=9){
        hr='0'+hourin12hr;
    }

    const Mint=time.getMinutes();
    let Min=Mint;
    if(Mint<=9){
        Min='0'+Mint;
    }
    let ses='AM';
    if(hour>=12){
        ses='PM'
    }
    
    time1.innerText=hr+':'+Min+' '+ses;
    date1.innerHTML=days[day]+','+date+' '+months[month];
   
},1000);



////------------>>>>>>>>--------,,,<<<<<<----------///
let Latt;
let Longg;
function initialize() {
    var address = (document.getElementById('addressinput'));
    var autocomplete = new google.maps.places.Autocomplete(address);
    autocomplete.setTypes(['geocode']);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

    if (place.address_components) {
        address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
    }
   
  
    
    Longg=place.geometry.location.lng();
    Latt=place.geometry.location.lat();
  
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
//////////////-----------------------------///////////////////////////////////

///Use your Open Weather Api key here to get Longitude and Latitude for a place captured by google map Api
function getweatherdata(){
    const APIKEY="";
     console.log(Latt);
     console.log(Longg);
     fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${Latt}&lon=${Longg}&exclude=hourly,minutely&units=metric&appid=${APIKEY}`)
       .then(res=>res.json()).then(data=>{
        console.log(data);
        showweatherdata(data);
       })
}
function showweatherdata(data){
    let {humidity,pressure,sunrise,sunset,wind_speed}=data.current;
    time_Zone.innerHTML=data.timezone;
    country_Id.innerHTML=data.lat+'N'+data.lon+'E';
    currentweatheritem_s.innerHTML=
    `<div class="weatheritem">
    <div>Humidity</div>
    <div>${humidity}%</div>
</div>
<div class="weatheritem" >
    <div>Pressure</div>
    <div>${pressure}</div>
</div>
<div class="weatheritem">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>
</div>
<div class="weatheritem" >
    <div>Sunrise</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
</div>
<div class="weatheritem">
    <div>Sunset</div>
    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
</div>`;
let otherDayForecast='';
data.daily.forEach((day,index)=>{
    if(index==0){
        currTemp1.innerHTML=` <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weathericon" class="w-icon">
        <div class="Others">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
        
        <div class="temp">Night:${day.temp.night}&#176;C</div>
        <div class="temp">Day:${day.temp.day}&#176;C</div>
    </div>`;
    }
    else{
          otherDayForecast+=`
          <div class="weatherforecastitem">
          <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weathericon" class="w-icon">
     
      <div class="temp">Night:${day.temp.night}&#176;C</div>
      <div class="temp">Day:${day.temp.day}&#176;C</div>
      </div>`;
    }
})
weatherForecast.innerHTML=otherDayForecast;
}
