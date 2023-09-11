import Main from "./Main"
import ManageBar from "./ManageBar"
import SideBar from "./SideBar"

const Major = ({value, setValue, list, activeFile, setActiveFile}) => {
    return (
        <div className="flex">
            <SideBar setValue={setValue} list={list} setActiveFile={setActiveFile}/>
            <Main value={value} activeFile={activeFile} setValue={setValue}/>
            <ManageBar value={value} activeFile={activeFile}/>
        </div>
    )
}
export default Major