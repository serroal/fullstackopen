import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [search, setSearch] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault();

    const personFound = persons.find(person => person.name === newName)

    if(personFound){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const personObj = { ...personFound, number: newPhone }

        personService
        .update(personFound.id, personObj)
        .then(updatedPerson => {
          setErrorMessage({
            text: `Updated ${updatedPerson.name}`,
            type: "success"
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
          setNewName("");
          setNewPhone("");
        })
        .catch(() => {
          setErrorMessage({
            text: `Information of ${personFound.name} has alredy been removed from the server`,
            type: "error"
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== personFound.id))
        })
      }
    } else {

      const personObj = { name: newName, number: newPhone }

      personService
      .create(personObj)
      .then(createdPerson => {
        setErrorMessage({
          text: `Added ${createdPerson.name}`,
          type: "success"
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons([...persons, createdPerson]);
        setNewName("");
        setNewPhone("");
      })
    }
  }

  const handleDelete = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)){
      personService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const personsToShow = search.trim().length
    ? persons.filter( person => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm 
        handleSubmit={handleSubmit} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App