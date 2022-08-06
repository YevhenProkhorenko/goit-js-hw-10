

const BASE_URL = "https://restcountries.com"
function fetchCountries(name) {
    // fetch("https://restcountries.com/v3.1/name/peru?fields=name,name,capital,population,flags,languages").then((responce) => responce.json(),)
    return fetch(`${BASE_URL}/v3.1/name/${name}?fields=name,name,capital,population,flags,languages`).then((responce) => responce.json(),)       
}
export default {fetchCountries}
