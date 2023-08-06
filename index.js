async function search(a) {
    let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`);
    if (t.ok && 400 != t.status) {
        let a = await t.json();
        displayCurrent(a.location, a.current),
        displayAnother(a.forecast.forecastday)
    }
}

document.getElementById("search").addEventListener("keyup", a=>{
    search(a.target.value)
}
);

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(a, t) {
    if (null != t) {
        var e = new Date(t.last_updated.replace(" ", "T"));
        ;

        var n = `
        <div class="card text-center col-md-3">
        <div class="card-header">
            <div class="forecast-header"  id="today">\n    
                <div class="day">${days[e.getDay()]}</div>\n    
            </div> 
        </div>
        <div class="card-body">
          <div class=" date">${e.getDate() + monthNames[e.getMonth()]}</div>   
          <h5 class="card-title">${a.name}</h5>
          <p class="card-text">${t.temp_c}<sup>o</sup>C</p>
          <img src="https:${t.condition.icon}" alt="icon" width=90>
        </div>
        <div class="card-footer text-body-secondary">
            <div class="custom">${t.condition.text}</div> </div>
        </div>
      </div>`

        document.getElementById("forecast").innerHTML = n
    }
}
function displayAnother(a) {
    let t = "";
    for (let e = 1; e < a.length; e++)
        t += `<div class="card text-center col-md-3">
        <div class="card-header">
            <div class="forecast-header"  id="today">\n    
                <div class="day">${days[new Date(a[e].date.replace(" ", "T")).getDay()]}</div>\n    
            </div> 
        </div>
        <div class="card-body">
          <h5 class="card-title">${a[e].day.maxtemp_c}<sup>o</sup>C</h5>
          <p class="card-text">${a[e].day.mintemp_c}<sup>o</sup>C</p>
          <img src="https:${a[e].day.condition.icon}" alt="icon" width=90>
        </div>
        <div class="card-footer text-body-secondary">
            <div class="custom">${a[e].day.condition.text}</div> </div>
        </div>
        </div>`;

        document.getElementById("forecast").innerHTML += t
}

search("October");


