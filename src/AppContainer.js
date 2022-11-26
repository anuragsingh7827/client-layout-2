import React, { useState } from "react";
import App from "./App";

function AppContainer(){
    const [file, setFile] = useState('');
    const [fileData, setFileData] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);

    function handleChange(e){
        setFile(e.target.files[0]);
    }

    function handleSubmit(e){
        e.preventDefault();
        const fileReader = new FileReader();
        fileReader.readAsText(file,'UTF-8');
        fileReader.onload = e => {
            setFileData(JSON.parse(e.target.result));
            setIsUploaded(true);
        }
    }

    return (
        isUploaded ? <App fileData={fileData} /> :  <form onSubmit={handleSubmit}>
                                                        <label htmlFor="layout">Choose Layout</label>
                                                        <input type="file" onChange={handleChange} />
                                                        <button type="submit">Upload</button>
                                                    </form>
    )
}

export default AppContainer;