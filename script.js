let weather = {
    apiKey: "543c1ad263070896cac0d08ed8f50bfe",
    fetchWeather: function (city) {
        fetch (
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        //I have added the units and changed them to metric to be in line with the current WW weather metrics;  //I have added here apiKey
        + "&units=metric&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        //I am defining the data which I want to take from the API and return it.
        const {name} = data;
        //Make sure to also log the array to extract the property, in this case the icon description
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log (name, icon, description, temp, humidity, speed)
        //Now linking each parameter to the DOM in order to return it
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/w/" + icon + ".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed:" + speed + " kmh";
        document.querySelector(".weather").classList.remove("loading"),
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
        // document.body.style.backgroundImage = "url('https://maps.googleapis.com/maps/api/place/photo/1600x900?" + name + "')"
    },
    //Adding functionality to the search bar with a querySelector and 
    search: function (){
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

//Making the search bar work by clicking on the search button
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
})

//Making the search bar work by hitting enter
document.querySelector(".search-bar")
.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        weather.search()
    }
})

weather.fetchWeather("Romania")
