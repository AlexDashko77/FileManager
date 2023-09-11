import { useState } from "react"
import { useNavigate } from "react-router-dom";

const CreateFile = ({user}) => {

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState(false)

    let navigate = useNavigate();


    const createFile = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/workFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, type, text: '', email: user})
        }).then((data) => data.json()).then((data) => setStatus(data.value))
    }
    setTimeout(() => {
        if(status) {
            return navigate('/main')
        }
    },1000)

    return (
        <>
         <div className="container">
            <h1 className="title">Cоздание файла</h1>
            <form className="registration">
                <div>
                    <label>Название файла:</label>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Введите название файла" />
                </div>
                <div>
                    <label>Расширение файла:</label>
                    <input onChange={(e) => setType(e.target.value)} value={type} type="text" placeholder="Введите расширение файла" />
                </div>
                <button onClick={(e) => createFile(e)} >Создать файл</button>
            </form>
         </div>
        </>
    )
}
export default CreateFile