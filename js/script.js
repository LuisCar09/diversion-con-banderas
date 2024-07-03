const countriesContainer = document.getElementById('countries-list')
const API = 'https://restcountries.com/v3/all'
let countriesToRender = []
let country = ''
const getCountries = async () => {
    try {
        const getData = await fetch(API);
        const responseData = await getData.json()
        // console.log(responseData)

        countriesToRender = responseData.map((item) => {
            const country = {
                flags: item.flags[1],
                name: item.name.official,
                capital: item.capital,
                population: item.population,
                carSide: item.car.side,
                ISO: item.cca2
            }
            return country
        })

        countriesToRender.sort((a, b) => {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase())

        })
        renderCountries(countriesToRender)
        console.log(countriesToRender);
    } catch (error) {
        console.log(error.message);
    }

}
const renderCountries = (countries) => {
    // console.log(countries)
    const renderData = countries.map((item) => {
        const {name,flags,capital,population,carSide,ISO} = item
        return(`
        <article  class="country ${ISO}">
            <img id="${ISO}" class="countryImage" src=${flags} alt="${name}">
            <h2 class="countryName">${name}</h2>
            <div class="overlay">
            <?xml version="1.0" ?><svg id="eye" class="${ISO}" enable-background="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="  M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z" fill="none" id="XMLID_10_" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><circle cx="16" cy="16" fill="none" id="XMLID_12_" r="5" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/></svg></div>
        </article>`)
    }).join('')
    
    countriesContainer.innerHTML = renderData
    const listenImg = document.querySelectorAll('.countryImage')
    const listenArticle = document.querySelectorAll('.country')
    const overlayEye = document.querySelectorAll('#eye')
    listenImg.forEach((item) => item.addEventListener('mouseover',show))
    listenArticle.forEach((item) => item.addEventListener('mouseleave',close))
    overlayEye.forEach((item) => item.addEventListener('click',countryDetails))
   
    // console.log(listen)
}

const show = (e) =>{
    // console.log(e.target.id);
    const articleContainer = document.querySelector(`.${e.target.id}`)
    // console.log(articleContainer);
    const overlay = articleContainer.querySelector('.overlay')
    overlay.classList.add('show')
    // console.log(overlay);

}
const close = (e) =>{
    
    const article = e.target
    const overlay =article.querySelector('.overlay')
    overlay.classList.remove('show')
   
}
const countryDetails = (event) =>{
    let element = ''
    const countrySelected = event.target.classList.value
    
    const countryFiltered = countriesToRender.filter((country) => {
        return country.ISO === countrySelected ? country : null
    } )
    console.log(countryFiltered);
    if (countryFiltered.length >= 1) {
       
        const {capital,carSide,name,population,flags} = countryFiltered[0]
        // console.log(capital);
        // console.log(carSide);
        // console.log(name);
        // console.log(population);
        element =` 
                        <article class="country-info--article">
                            <aside>

                                <img src="${flags}" alt="${name}">

                                <div>
                                    <h2>${name}</h2>
                                    <p>Capital:${capital} </p>
                                    <p>Poblaci&oacute;n: ${population}</p>
                                    <p>Lado de la carretera: ${carSide}</p>
                                </div>
                            </aside>
                            <button id='closeInfo'>Cerrar</button>
                        </article>
                    `
        const countryInfoContainer = document.querySelector('.country-info')
        
        
        console.log(countriesContainer);
        countryInfoContainer.innerHTML = element
        countryInfoContainer.classList.add('show')
        const buttonClose = document.getElementById('closeInfo')
        buttonClose.addEventListener('click',closeInforContainer)
    }
    
   

    // const countryInfoContainer = document.getElementById('country-info')
    // countryInfoContainer.innerHTML = element
}

const closeInforContainer = () =>{
    const countryInfoContainer = document.querySelector('.country-info')

    countryInfoContainer.classList.contains('show') ? countryInfoContainer.classList.remove('show') : null
}

getCountries()

