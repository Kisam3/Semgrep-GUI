import FileUpload from './upload';
import ResultsPage from "./fetch";
import {BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
=======
import Landing from "./landingpage";
>>>>>>> UI-Development


function App() {
    return (
        <BrowserRouter>
            <Routes>
<<<<<<< HEAD
=======
                <Route path = "/" element = {<Landing />} />
>>>>>>> UI-Development
                <Route path = "/upload" element = {<FileUpload />} />
                <Route path = "/result" element = {<ResultsPage />} />
            </Routes>
        </BrowserRouter>

    )
}

export default App