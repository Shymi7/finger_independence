import {MainView} from "./MainView.tsx";
import {Header} from "./Header.tsx";

function App() {


    return (
        <div className={'flex-row h-screen w-full overflow-y-scroll no-scrollbar'}>
            <Header/>
            <div className={'flex flex-col bg-dark-custom h-full'}>
                <MainView/>
                {/*<Footer/>*/}
            </div>

        </div>
    )
}

export default App
