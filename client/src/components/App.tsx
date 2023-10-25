import {Training} from "./Training.tsx";
import {Header} from "./Header.tsx";
import {KeyWaterfall} from "./KeyWaterfall.tsx";

function App() {

    return (
        <div className={'flex-row h-screen w-full overflow-y-scroll no-scrollbar'}>
            <Header/>
            <div className={'flex flex-col bg-dark-custom h-full'}>
                <KeyWaterfall/>
                <Training/>
                {/*<Footer/>*/}
            </div>

        </div>
    )
}

export default App
