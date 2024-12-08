var today_HTML = document.getElementById("today")
var TodayDate = document.getElementById("TodayDate")
var tomorrow_HTML = document.getElementById("tomorrow")
var TomorrowLater_HTML = document.getElementById("TomorrowLater")
var City = document.getElementById("City")
var CurrentTemp = document.getElementById("CurrentTemp")
var today_Icon = document.querySelector("#todayWeather .weatherImg img ")
var today_conidtion = document.querySelector("#todayWeather .weatherconidtion  ")

var tomorrow_Icon = document.querySelector("#tomorrowWeather .weatherImg img ")
var tomorrow_conidtion = document.querySelector("#tomorrowWeather .weatherconidtion  ")
var tomorrow_MaxTemp = document.querySelector("#tomorrowWeather .MaxTemp  ")
var tomorrow_MinTemp = document.querySelector("#tomorrowWeather .MinTemp  ")

var TomorrowLater_Icon = document.querySelector("#TomorrowLaterWeather .weatherImg img ")
var TomorrowLater_conidtion = document.querySelector("#TomorrowLaterWeather .weatherconidtion  ")
var TomorrowLater_MaxTemp = document.querySelector("#TomorrowLaterWeather .MaxTemp  ")
var TomorrowLater_MinTemp = document.querySelector("#TomorrowLaterWeather .MinTemp  ")





   
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = [
 "January", "February", "March", "April", "May", "June", 
 "July", "August", "September", "October", "November", "December"
];

  

async function GetTimezone (CityName) {
    try  {
   
    
        var respone = await fetch(`https://api.weatherapi.com/v1/timezone.json?key=192cae221c2840bc959134852240612&q=${CityName}`);
        var  data_3  =await respone.json();
        var localtime =  data_3.location.localtime;

        console.log(localtime) 
        return localtime

    }
    catch(error) {
       console.log(error);
       }
    }
 

    

async function Getweather (CityName="cairo") {

          
    try  {
 var localtime = await GetTimezone (CityName)  ;
 

 var cureentDate = new Date(localtime.replace(" ", "T"));
 var today =GetToday_DATE(cureentDate) 
 var tomorrow=GetTomorrow_DATE(cureentDate) 
 var afterTomorrow = GetdayAfterTomorrow_DATE(cureentDate) 

        var respone = await Promise.all([
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=192cae221c2840bc959134852240612&q=${CityName}&dt=${tomorrow.year}-${tomorrow.month}-${tomorrow.day}`),
             fetch(`https://api.weatherapi.com/v1/forecast.json?key=192cae221c2840bc959134852240612&q=${CityName}&dt=${afterTomorrow.year}-${afterTomorrow.month}-${afterTomorrow.day}`)
             
            ]) 
          
            var  data_1  =await respone[0].json();
            var  data_2  =await respone[1].json();




   today_HTML.innerHTML= today.dayNAME
   TodayDate.innerHTML =  today.day +"/"+ months[today.month-1] 
   tomorrow_HTML.innerHTML  =   tomorrow.dayNAME
   TomorrowLater_HTML.innerHTML = afterTomorrow.dayNAME
    City.innerHTML = data_1.location.name
 CurrentTemp.innerHTML = data_1.current.temp_c +"°C"
 today_Icon.setAttribute("src",`https:${data_1.current.condition.icon}`)  
 today_conidtion.innerHTML =data_1.current.condition.text

 tomorrow_Icon.setAttribute("src",`https:${data_1.forecast.forecastday[0].day.condition.icon }`)
 tomorrow_conidtion.innerHTML = data_1.forecast.forecastday[0].day.condition.text
 tomorrow_MaxTemp.innerHTML = data_1.forecast.forecastday[0].day.maxtemp_c +"°C"
 tomorrow_MinTemp.innerHTML =  data_1.forecast.forecastday[0].day.mintemp_c +"°C"

 TomorrowLater_Icon.setAttribute("src",`https:${data_2.forecast.forecastday[0].day.condition.icon}`)
 TomorrowLater_conidtion.innerHTML = data_2.forecast.forecastday[0].day.condition.text
 TomorrowLater_MaxTemp.innerHTML = data_2.forecast.forecastday[0].day.maxtemp_c +"°C"
 TomorrowLater_MinTemp.innerHTML = data_2.forecast.forecastday[0].day.mintemp_c +"°C"

document.getElementById("weatherbox").classList.replace("invisible","visible") 

   }
   catch(error) {
      console.log(error);
      }
   }



 async function  getWEATHERFORcurrentLOCATON(){
    Getweather ("alex")

    try{  
        var location=await getLocation();
        console.log(location.latitude,location.longitude) 
        cityCoordinates=`${location.latitude},${location.longitude}`
        Getweather (cityCoordinates)
    } 
    catch(error){

        console.log(error.message) 

    
    }


    

 }
 getWEATHERFORcurrentLOCATON()


   var mealInput=document.getElementById("mealInput");
mealInput.addEventListener("keyup",function(){

    Getweather(mealInput.value)

})




function GetdayAfterTomorrow_DATE(cureentDate){
    var dayAfterTomorrow_DATE = new Date(cureentDate);
    dayAfterTomorrow_DATE.setDate(cureentDate.getDate() + 2); 
 
    var afterTomorrow={
     day:dayAfterTomorrow_DATE.getDate().toString().padStart(2,"0"),        
     dayNAME:days[dayAfterTomorrow_DATE.getDay()],
     month:dayAfterTomorrow_DATE.getMonth() + 1,
     year:dayAfterTomorrow_DATE.getFullYear()
 
    }
 
 return afterTomorrow
}

function GetTomorrow_DATE(cureentDate){

    var tomorrow_DATE = new Date(cureentDate);
    tomorrow_DATE.setDate(cureentDate.getDate() + 1); 
    var tomorrow={
     day: tomorrow_DATE.getDate(),
     dayNAME: days[tomorrow_DATE.getDay()],
     month:tomorrow_DATE.getMonth() + 1,
     year:tomorrow_DATE.getFullYear()
 
    }
   return  tomorrow
 

}

function GetToday_DATE(cureentDate){

  



var today={
day:cureentDate.getDate().toString().padStart(2,"0"),  
dayNAME:days[cureentDate.getDay()],
month:cureentDate.getMonth() + 1, 
year:cureentDate.getFullYear()

}
return today
}









function getLocation() {
    return new Promise((resolve, reject) => {
    // ========== Asynq code to get postion==================================
    navigator.geolocation.getCurrentPosition(
        (position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            resolve({ latitude, longitude });
        },
        (error) => {
            console.error('Error getting location:', error);
            reject(error);
        }
    );
    
// ===============================================
    })     }
