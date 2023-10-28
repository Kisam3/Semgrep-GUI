import React, {useState} from "react";

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            fetch('/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (

        <div>

            <input type="file" accept=".json" onChange={handleFileChange} />
            <button className={' px-3 py-1 mb-1'} onClick={handleUpload}>Upload</button>
            <img src={require("./img/background.jpg")} alt={'Backgroung'} />
        </div>
    );
}

export default FileUpload