import {Training} from "./Training.tsx";
import {Header} from "./Header.tsx";

function App() {

    return (
        <div className={'flex-row h-full w-full'}>
            <Header/>

            <div className={'w-full h-24 bg-gray-300'}>

            </div>
            <Training/>
        </div>
    )
}

export default App
