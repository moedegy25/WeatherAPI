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



// console.log(today_HTML,TodayDate,tomorrow,TomorrowLater,City,CurrentTemp,today_Icon,today_conidtion,tomorrow_Icon,tomorrow_conidtion,tomorrow_MaxTemp,tomorrow_MinTemp,TomorrowLater_Icon,TomorrowLater_conidtion,TomorrowLater_MaxTemp,TomorrowLater_MinTemp)


   
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = [
 "January", "February", "March", "April", "May", "June", 
 "July", "August", "September", "October", "November", "December"
];
// إحضار اسم اليوم بناءً على الرقم

  

async function GetTimezone (CityName) {
    try  {
   
    
        var respone = await fetch(`http://api.weatherapi.com/v1/timezone.json?key=192cae221c2840bc959134852240612&q=${CityName}`+ Date.now());
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
 // استبدال المسافة بـ "T" لتوافق مع ISO 8601 (إذا لزم الأمر)
//  توافق مع JavaScript: عندما ترى JavaScript تنسيق ISO 8601 (YYYY-MM-DDTHH:mm:ss)، تتعامل معه مباشرةً كتنسيق تاريخ ووقت صالح.
//  دقة أعلى: بدون تحويل النص إلى تنسيق ISO 8601، قد يتعامل محرك JavaScript مع النص بشكل خاطئ أو يرفضه تمامًا.
 // تحويل إلى كائن Date
//  JavaScript لا يتعرف دائمًا على النصوص التي تحتوي على مسافة (" ") بين التاريخ والوقت. ليتعامل مع هذا النص بشكل صحيح، يجب استبدال المسافة بـ حرف T ليصبح التنسيق قياسيًا، مثل:
// بعض المتصفحات قد تُعيد Invalid Date لأن النص لا يتبع المعايير.

 var cureentDate = new Date(localtime.replace(" ", "T")); // لتحويل التاريخ والوقت الحالي الي اوبجت من نوع الكلاس data 
 var today =GetToday_DATE(cureentDate) //  لاستخراج اليوم والشهر والسنة من تاريخ اليوم في اوبجكت
 var tomorrow=GetTomorrow_DATE(cureentDate) //  لاستخراج اليوم والشهر والسنة من تاريخ بكرة في اوبجكت
 var afterTomorrow = GetdayAfterTomorrow_DATE(cureentDate) //  لاستخراج اليوم والشهر والسنة من تاريخ بعد بكرة  في اوبجكت
// ================================================================

        var respone = await Promise.all([
            fetch(`http://api.weatherapi.com/v1/forecast.json?key=192cae221c2840bc959134852240612&q=${CityName}&dt=${tomorrow.year}-${tomorrow.month}-${tomorrow.day}`+ Date.now()),
             fetch(`http://api.weatherapi.com/v1/forecast.json?key=192cae221c2840bc959134852240612&q=${CityName}&dt=${afterTomorrow.year}-${afterTomorrow.month}-${afterTomorrow.day}`+ Date.now())
             
            ]) 
            // https://chatgpt.com/share/67564d8b-d4c4-8012-bf82-a331f4c00695  شرح   Date.now() لمنع تخزين الrequest in cash of browserواعادة استخدامها عند  انقطاع الاتصال عن السريفر 
            var  data_1  =await respone[0].json();
            var  data_2  =await respone[1].json();




   today_HTML.innerHTML= today.dayNAME
   TodayDate.innerHTML =  today.day +"/"+ months[today.month-1] // نقصنا الواحد عشان الاراي بتبدا من 0 واحنا كنا مزودين الواحد قبل كدة
   tomorrow_HTML.innerHTML  =   tomorrow.dayNAME
   TomorrowLater_HTML.innerHTML = afterTomorrow.dayNAME
    City.innerHTML = data_1.location.name
 CurrentTemp.innerHTML = data_1.current.temp_c +"°C"
 today_Icon.setAttribute("src",`https:${data_1.current.condition.icon}`)  // لاحظ اضافة http: قبل الsrc
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
    dayAfterTomorrow_DATE.setDate(cureentDate.getDate() + 2); // زيادة يومين
 
    var afterTomorrow={
     day:dayAfterTomorrow_DATE.getDate().toString().padStart(2,"0"),  // حولتها الاول ل string وبعدين ضفن 0 في الاول لو مش موجود عشان اليوم لازم في الريكويست يبقي كدة        
     dayNAME:days[dayAfterTomorrow_DATE.getDay()],
     month:dayAfterTomorrow_DATE.getMonth() + 1,
     year:dayAfterTomorrow_DATE.getFullYear()
 
    }
 
 return afterTomorrow
}

function GetTomorrow_DATE(cureentDate){

    var tomorrow_DATE = new Date(cureentDate);
    tomorrow_DATE.setDate(cureentDate.getDate() + 1); // زيادة يوم واحد 
    var tomorrow={
     day: tomorrow_DATE.getDate(),
     dayNAME: days[tomorrow_DATE.getDay()],
     month:tomorrow_DATE.getMonth() + 1,
     year:tomorrow_DATE.getFullYear()
 
    }
   return  tomorrow
 

}

function GetToday_DATE(cureentDate){

  


// استخراج اليوم والشهر والسنة

var today={
day:cureentDate.getDate().toString().padStart(2,"0"),  // حولتها الاول ل string وبعدين ضفن 0 في الاول لو مش موجود عشان اليوم لازم في الريكويست يبقي كدة        
dayNAME:days[cureentDate.getDay()],
month:cureentDate.getMonth() + 1, // الشهر (0-11، لذلك نضيف 1)
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