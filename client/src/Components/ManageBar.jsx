const ManageBar = ({activeFile, value}) => {

    const arr = activeFile.split('.')
    console.log(arr);

    const saveFile = () => {
        fetch('http://localhost:5000/workFile',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: arr[0], type: arr[1], text: value})
        })
    }

    const downloadFile = () => {
        fetch('http://localhost:5000/download',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: activeFile}),
            responseType: 'blob'
        }).then((res) => res.blob()).then((res) => {
            const url = URL.createObjectURL(res)
            const link = document.createElement('a');
            link.href = url
            link.setAttribute('download', `${activeFile}`)
            document.body.appendChild(link)
            link.click()
        })
    }

    return (
        <>
         <div className="managebar">
            <button onClick={saveFile} className="save">Сохранить</button>
            <button onClick={downloadFile} className="download">Скачать</button>
         </div>
        </>
    )
}

export default ManageBar