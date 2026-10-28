import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import Country from './components/Country'


function App() {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleChange = (event) => setSearch(event.target.value)

  const handleClick = (name) => setSearch(name)

  const countriesToShow = search.trim().length
    ? countries.filter( country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : []

  return (
    <div>
      <Filter search={search} handleChange={handleChange} />
      {countriesToShow.length === 1 ? 
        <Country country={countriesToShow[0]} /> 
      : 
        <CountryList countries={countriesToShow} handleClick={handleClick} />}
    </div>
  )
}

export default App
