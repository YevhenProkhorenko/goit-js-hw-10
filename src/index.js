import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('input');
const list = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

inputCountry.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));


function searchCountry(e) {
    e.preventDefault();
    
    const countryName = inputCountry.value;
    
    
    API.fetchCountries(countryName)
    .then((data) => insertContent(data))
    .catch(error => {
       console.log(error)
    })    
}
const createListItem = (item) =>
    `<li>    
    <img src="${item.flags.svg}" alt="${item.name.official}" width="50px">
    <h2>${item.name.official ? item.name.official : ""}</h2>     
    <p>Population: ${item.population ? item.population : ""}</p>
    <p>Capital: ${item.capital ? item.capital : ""}</p>
    <p>Official language(s) in country: ${item.languages.value ? item.languages.value : ""}</p>    
    </li>`;

const generateContent = (array) => array?.reduce((acc, item) => acc + createListItem(item), "");
const insertContent = (array) => {
    const result = generateContent(array);
    countryInfo.insertAdjacentHTML("beforeend", result);
} 


