import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('input');
const list = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

list.style.listStyleType = "none";


inputCountry.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));


function searchCountry(e) {
    e.preventDefault();
    list.innerHTML = "";
    const countryName = inputCountry.value;
    if (countryName === " ") {
        list.innerHTML = "";
    }
    if (countryName.length > 10) {
        Notiflix.Notify.failure("Please enter a more specific name.");
    }
    else {
    API.fetchCountries(countryName.trim())
        .then((data) => { 
            if (data.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                list.innerHTML = "";
                countryInfo.innerHTML = " ";
            }
            
            if (data.length === 1) {
                insertOneCountryInfo(data);
                // inputCountry.blur();
                // clear();                
            }
            else {
                insertListCountry(data);
            }
            
        })
    .catch(error => {        
        Notiflix.Notify.failure("Enter country name", error);
    })  
    } 
}

function createListItem(item) {
    
    const createEl = `<li>
    <table>
     <tbody>
        <tr>
        <td><img src="${item.flags.svg}" alt="${item.name.official}" width="20px"></td>
        <td><h2>${Object.values(item.name.common).join('')}</h2></td>
        </tr>        
     </tbody>          
    </table>     
    </li>`;
    return createEl;
}

function createCountryInfo(item) { 
    return  ` <table>
     <tbody>
        <tr>
        <td><img src="${item.flags.svg}" alt="${item.name.official}" width="20px"></td>
        <td><h2>${Object.values(item.name.common).join('')}</h2></td>
        </tr>        
     </tbody>          
    </table> 
    <p><b>Capital:</b> ${item.capital ? item.capital : ""}</p>
        <p><b>Population:</b> ${item.population ? item.population : ""}</p>
        <p><b>Language(s):</b> ${Object.values(item.languages) ? Object.values(item.languages) : ""}</p>`
}
     
        

const generateCountry = (array) => array?.reduce((acc, item) => acc + createListItem(item), "");

const generateInfo = (array) => array?.reduce((acc, item) => acc + createCountryInfo(item), "");

const insertListCountry = (array) => {
    const result = generateCountry(array);
    list.innerHTML = result;
}

const insertOneCountryInfo = (array) => {
    const result = generateInfo(array);
    countryInfo.innerHTML = result;
}