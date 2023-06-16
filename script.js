const wrapper = document.querySelector('.wrapper'),
inputPart =wrapper.querySelector('.input-part'),
infoTxt = inputPart.querySelector('.info-txt'),
inputField= inputPart.querySelector('input'),
locationBtn= inputPart.querySelector('button'),
arrowBack = document.querySelector("header i")
let api;
wIcon=document.querySelector(".weather-part img")

inputField.addEventListener("keyup",e=>{
    if(e.key=="Enter"&& inputField != ""){
        requestApi(inputField.value)
    }
})

locationBtn.addEventListener("click",()=>{

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
        console.log("Tarayıcınız geolocation'ı gesteklemiyor.")
    }
})

function onSuccess(position){
    const {latitude,longitude}=position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=872c4ff746927ca1ee627ba6b369e53c`;
    fetchData()
}


function onError(error){
    infoTxt.innerText="Lütfen Konum izninizi açınız."
    infoTxt.classList.add("error")
}



function requestApi(city){

 api =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=872c4ff746927ca1ee627ba6b369e53c`
fetchData()
}

function fetchData (){
    infoTxt.innerText="Sonuçlar getiriliyor.."
    infoTxt.classList.add("pending")
    fetch(api).then(response => response.json()).then(result =>weatherDetails(result))
    
}


function weatherDetails(info){
    if(info.cod=="404"){
        infoTxt.classList.replace("pending","error")
        infoTxt.innerText=`${inputField.value} şehri bulunamadı..`
    }else{
        const city= info.name
        const country=info.sys.country
        const {description, id}= info.weather[0]
        const {feels_like,humidity, temp}=info.main

        if(id==800){
            wIcon.src="icons/clear.svg"
        }else if(id=> 200&& id<=232){
            wIcon.src="icons/storm.svg"

        }else if(id=> 600&& id<=622){
            wIcon.src="icons/snow.svg"

        }else if(id=> 701&& id<=781){
            wIcon.src="icons/haze.svg"

        }else if(id=> 801&& id<=804){
            wIcon.src="icons/cloud.svg"

        }else if(id=> 300&& id<=321 || (id=> 500 && id <=531)){
            wIcon.src="icons/rain.svg"

        }

        wrapper.querySelector(".weather").innerHTML=description
        wrapper.querySelector(".temp .number").innerText=Math.floor(temp) 
        wrapper.querySelector(".location").innerText=`${city},${country}`
        wrapper.querySelector(".temp .number-2").innerText=Math.floor(feels_like) 
        wrapper.querySelector(".humidity  span").innerText=`${humidity}%`



        infoTxt.classList.remove("pending","error")
        wrapper.classList.add("active")
        console.log(info)

    }
}

arrowBack.addEventListener("click",()=>{
    wrapper.classList.remove("active")
})