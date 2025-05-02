import React, { useEffect, useState } from "react";

const API_KEY = "AIzaSyBI7SpX26jOYBgW0IADeWe10SNy765ZeNA";
const CX = "d519ff19684034ba6"; // Your Custom Search Engine ID

function GoogleResults({ query }) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query) {
            setResults([]);
            setError("");
            return;
        }
        setLoading(true);
        setError("");
        fetch(
            `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error.message);
                    setResults([]);
                } else {
                    setResults(data.items || []);
                }
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch Google results.");
                setLoading(false);
            });
    }, [query]);

    if (!query) return <div>Enter a query to see Google results.</div>;
    if (loading) return <div>Loading Google results...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (!results.length) return <div>No Google results found.</div>;

    return (
        <ul>
            {results.map((item) => (
                <li key={item.link} style={{ marginBottom: "1em" }}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <strong>{item.title}</strong>
                    </a>
                    <div>{item.snippet}</div>
                </li>
            ))}
        </ul>
    );
}

export default GoogleResults;