import React, { useState } from "react";

function QueryInput({ onSubmit }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSubmit(input.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="query-form">
            <input
                type="text"
                placeholder="Enter your query..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="query-input"
            />
            <button type="submit" className="query-btn">Search</button>
        </form>
    );
}

export default QueryInput;