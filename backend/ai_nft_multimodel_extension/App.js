
import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
    const [image, setImage] = useState(null);
    const [model, setModel] = useState("general");
    const [result, setResult] = useState("");

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("model", model);

        const response = await axios.post("http://localhost:5000/classify", formData);
        setResult(response.data.result);
    };

    return (
        <div className="App">
            <h1>AI Image Classifier</h1>
            <input type="file" onChange={handleFileChange} />
            <select value={model} onChange={handleModelChange}>
                <option value="general">General</option>
                <option value="style">Art Style</option>
                <option value="nsfw">NSFW Detection</option>
            </select>
            <button onClick={handleSubmit}>Classify</button>
            {result && <p><strong>Classification Result:</strong> {result}</p>}
        </div>
    );
}

export default App;
