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
                Notiflix.Notify.failure("Too many matches found. Please enter a more specific name.");
                list.innerHTML = "";
            }
            else {
                return insertContent(data)
            }
            
        })
    .catch(error => {        
        Notiflix.Notify.failure(error);
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
    <p><b>Capital:</b> ${item.capital ? item.capital : ""}</p>
        <p><b>Population:</b> ${item.population ? item.population : ""}</p>
        <p><b>Language(s):</b> ${Object.keys(item.languages) ? Object.keys(item.languages) : ""}</p>       
    </li>`;
    return createEl;
}

// function createCountryInfo(item) { 
//     return  `<p><b>Capital:</b> ${item.capital ? item.capital : ""}</p>
//         <p><b>Population:</b> ${item.population ? item.population : ""}</p>
//         <p><b>Language(s):</b> ${Object.keys(item.languages) ? Object.keys(item.languages) : ""}</p>`
// }
     
        

const generateCountry = (array) => array?.reduce((acc, item) => acc + createListItem(item), "");

// const generateInfo = (array) => array?.reduce((acc, item) => acc + createCountryInfo(item), "");

const insertContent = (array) => {    
    const result = generateCountry(array);
    list.insertAdjacentHTML("beforeend", result);

    // const info = generateInfo(array)    
    // countryInfo.insertAdjacentHTML("beforeend", info);
}