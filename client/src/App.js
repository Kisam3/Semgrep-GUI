import FileUpload from './upload';
import ResultsPage from "./fetch";
import {BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/upload" element = {<FileUpload />} />
                <Route path = "/result" element = {<ResultsPage />} />
            </Routes>
        </BrowserRouter>

    )
}

export default App