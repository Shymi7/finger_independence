import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import "./index.css"
import {defaultTrainingMode, Training, TrainingContext} from "./utils/Training.ts";
import {UserSettings, UserSettingsContext} from "./utils/UserSettings.ts";



ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <UserSettingsContext.Provider value={new UserSettings()}>
        <TrainingContext.Provider value={new Training(defaultTrainingMode)}>
            <App/>
        </TrainingContext.Provider>
    </UserSettingsContext.Provider>
    // </React.StrictMode>,
)
