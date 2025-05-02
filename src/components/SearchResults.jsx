import React, { useEffect, useState } from "react";

// Dummy data for illustration; replace with your actual API call
const mockResults = {
    clusters: [
        { title: "Cluster 1", items: ["Result 1A", "Result 1B"] },
        { title: "Cluster 2", items: ["Result 2A", "Result 2B"] },
    ],
    expansions: ["Expansion 1", "Expansion 2"],
    results: ["Your Engine Result 1", "Your Engine Result 2"],
};

function SearchResults({ query, trigger }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!query) return;
        // Replace with your search logic/API call
        setTimeout(() => setData(mockResults), 500);
    }, [query, trigger]);

    if (!query) return <div>Enter a query to see results.</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h3>Query Expansions</h3>
            <ul>
                {data.expansions.map((exp, i) => (
                    <li key={i}>{exp}</li>
                ))}
            </ul>
            <h3>Clusters</h3>
            {data.clusters.map((cluster, i) => (
                <div key={i}>
                    <strong>{cluster.title}</strong>
                    <ul>
                        {cluster.items.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                </div>
            ))}
            <h3>Results</h3>
            <ul>
                {data.results.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
        </div>
    );
}

export default SearchResults;