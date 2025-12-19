const params = new URLSearchParams(window.location.search);

const city = params.get("city");

const cityName = document.getElementById("cityName");

let GEODB_API_KEY = "a1f31b7cf9msh5328a204e8ea021p1b4353jsn1d3e08a2bf92";

let GEODB_HOST = "wft-geo-db.p.rapidapi.com";

if (city) {
  cityName.textContent = city;

  async function fetchCityDetails(cityname) {
    try {
      let res = await fetch(
        `https://${GEODB_HOST}/v1/geo/cities?namePrefix=${city}&limit=1`,
        {
            method:"GET",
            headers:{
                "X-RapidAPI-Key":GEODB_API_KEY,
                "X-RapidAPI-Host":GEODB_HOST,
            }
        }
      );
      console.log(res);

      if(!res.ok){
        console.log("API Response Not Fetched...");
      }

      let data = await res.json();
      console.log(data);
      
      if(!data.data || data.data.length === 0){
        console.log("City Not Found");
        
      }

      let cityData = data.data[0];
      console.log(cityData);

    //   Display City Info
      
    } catch (error) {
      console.log(error);
    }
  }

  fetchCityDetails(city);
} else {
  cityName.textContent = "Unknown City";
}
