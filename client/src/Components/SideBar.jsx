const SideBar = ({list, setActiveFile, setValue}) => {


   

    const getValueAndFile = (el) => {
        setActiveFile(el)
        fetch(`http://localhost:5000/file?name=${el}`).then((data) => data.json()).then((data) => setValue(data.value))
    }

    return (
        <>
         <div className="sidebar">
            <div className="names">
                {list.map((el) => {
                    return <p onClick={() => getValueAndFile(el)} >{el}</p>
                })}
            </div>
         </div>
        </>
    )
}
export default SideBar