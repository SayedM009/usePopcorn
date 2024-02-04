import { useEffect, useState } from "react"

export default function Countries() {

    return <div style={{display:"flex", gap:"20px"}}>
        <Country />
    </div>
}

function Country({onSetCountries}) {
    const [img, setImg] = useState()
    const [countryName, setCountryName] = useState()
    const [region, setRegions] = useState()
    const [population, setPopulation] = useState()
    const [lanuage, setLanuage] = useState()
    const [currencies, setCurrencies] = useState()

    function countryInfos(details) {
            setImg(details.flags.png)
            setCountryName(details.name.common)
            setRegions(details.subregion)
            setPopulation(details.population.toLocaleString('en-US', {style: 'decimal'}))
            setLanuage(Object.values(details.languages)[0])
            setCurrencies(Object.values(details.currencies)[0].name)
    }

    useEffect(function () {
        const whereAmI = async function() {
            // Getting latitude and longitude from user browser
            const geoLocation = await new Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })
        
            // Latitude and longitude
            const {latitude : lat, longitude : long} = geoLocation.coords
            
            // Fetching counrty details from an API
            const countryDetails = await fetch(`https://geocode.xyz/${lat},${long}?geoit=json&auth=937336459165770613635x80380`);
            const data = await countryDetails.json()
        
            // Fetching country information
            const countryInformation = await fetch(`https://restcountries.com/v3.1/name/${data.country}`)
            const res = await countryInformation.json()
        
            // Setting Country Information
            const [country] = res;
            countryInfos(country)

            onSetCountries(country.borders)

        }
        whereAmI()

    }, [])
    return <div>
        {img ? <img src={img} alt="flag" style={{width: "320px", height :"160px"}}></img> : ""}
        <h1>{countryName}</h1>
        <p>{region}</p>
        <p>{population ? `${population} Person` : ""} </p>
        <p>{lanuage}</p>
        <p>{currencies}</p>
    </div>
}
