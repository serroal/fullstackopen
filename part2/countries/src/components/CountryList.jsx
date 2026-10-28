
const CountryItem= ({country, handleClick}) => {
  
  return (
    <div>
      {country} <button type="button" onClick={() => handleClick(country)}>show</button>
    </div>
  )
}

const CountryList = ({countries, handleClick}) => {

  if(countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  
  return (
    <div>
      {countries.map( country => 
        <CountryItem key={country.name.common} country={country.name.common} handleClick={handleClick} />
      )}
    </div> 
  )
}

export default CountryList 