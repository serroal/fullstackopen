
const Person = ({person, handleDelete}) => 
        <div>
          {person.name} {person.number} <button type="button" onClick={() => handleDelete(person)}>delete</button>
        </div>

const Persons = ({persons, handleDelete}) => {
  
  return (
    <div>
      {persons.map(person => 
        <Person key={person.id} person={person} handleDelete={handleDelete} />
      )}
    </div> 
  )
}

export default Persons