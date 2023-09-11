const Main = ({activeFile, value, setValue}) => {
    return (
        <>
        <div className="main">
            <h2 className="title">{activeFile ? activeFile : 'Ваш файл'}</h2>
            <textarea onChange={(e) => setValue(e.target.value)} value={value}></textarea>
        </div>
        </>
    )
}
export default Main