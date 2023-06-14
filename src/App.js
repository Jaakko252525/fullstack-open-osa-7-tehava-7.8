
import { useState, useEffect } from 'react'
import axios from 'axios'


// importing personServices
import personServices from './services/personServices'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}




const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [persons, setPersons] = useState([])
  
  // note
  const [noteState, setNoteState] = useState('')

  useEffect(() => {
    personServices
    .getAll(baseUrl)
    .then(data => {
      setPersons(data)
    },[])
    
  })




  const create = async resources => {
    
    setResources(resources)
    const response = await axios.post(baseUrl, resources)
    return response
  }



  const service = {
    create
  }
  

  return [
    persons,
    resources,
    service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')


  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, resources, personServices] = useResource('http://localhost:3005/persons')


  // states for making new note


  const handleNoteSubmit = (event) => {
    event.preventDefault()
  
  }


 



  const handlePersonSubmit = (event) => {
    event.preventDefault()
   // personService.create({ name: name.value, number: number.value})
    services(name.value)
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App
