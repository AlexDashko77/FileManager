import { useState } from "react"
import CreateFile from "./Components/CreateFile"
import Login from "./Components/Login"
import NavBar from "./Components/NavBar"
import Registration from "./Components/Registration"
import {Routes, Route} from 'react-router-dom'
import Major from "./Components/Major"

const App = () => {
  const [user, setUser] = useState('')
  const [list, setList] = useState([])
  const [activeFile, setActiveFile] = useState("")
  const [value, setValue] = useState('')

  

  setTimeout(() => {
    fetch('http://localhost:5000/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: user})
    }).then((data) => data.json()).then((data) => setList(data))
  },1000)
  return (
    <div>
      <NavBar setList={setList} setUser={setUser} user={user}/>
      <Routes>
        <Route path="/" element={<Registration/>} />
        <Route path="/login" element={<Login setUser={setUser} user={user}/>} />
        <Route path="/createFile" element={<CreateFile user={user}/>}/>
        <Route path="/main" element={<Major value={value} setValue={setValue} list={list} setActiveFile={setActiveFile} activeFile={activeFile}/>}/>
      </Routes>
    </div>
  )
}

export default App