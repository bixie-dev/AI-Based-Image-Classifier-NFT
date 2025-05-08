
import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function AdminDashboard() {
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        async function fetchUploads() {
            const response = await axios.get("http://localhost:5000/pending");
            setUploads(response.data);
        }
        fetchUploads();
    }, []);

    const handleVerify = async (id) => {
        await axios.post("http://localhost:5000/verify", { id });
        setUploads(uploads.filter(item => item.id !== id));
    };

    return (
        <div className="dashboard">
            <h1>Admin Verification Dashboard</h1>
            <ul>
                {uploads.map(item => (
                    <li key={item.id}>
                        <img src={item.image} alt="upload" width="100" />
                        <p>Prediction: {item.prediction}</p>
                        <button onClick={() => handleVerify(item.id)}>Verify</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminDashboard;
