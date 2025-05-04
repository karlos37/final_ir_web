import React, { useEffect, useState } from "react";

function getApiType(options) {
    if (options.relevanceModel === "pagerank") return "page_rank";
    if (options.relevanceModel === "hits") return "hits";
    if (options.clusteringOption === "flat") return "flat_clustering";
    if (options.clusteringOption === "single_hac") return "single_hac";
    if (options.clusteringOption === "average_hac") return "average_hac";
    if (options.queryExpansion === "rocchio") return "rocchio";
    if (options.queryExpansion === "association") return "association_qe";
    if (options.queryExpansion === "metric") return "metric_qe";
    if (options.queryExpansion === "scalar") return "scalar_qe";
    return "";
}

function truncate(text, maxLength = 150) {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function SearchResults({ query, options, trigger }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!query || !options) return;

        const type = getApiType(options);
        if (!type) return;

        const params = new URLSearchParams({
            query,
            type,
        });

        // fetch(`http://127.0.0.1:5000/ping`)
        //     .then((res) => res.json())
        //     .then((data) => setData(data))
        //     .catch(() => setData(null));
        fetch(`http://127.0.0.1:5000/api/v1/search?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch(() => setData(null));
    }, [query, options, trigger]);

    if (!query) return <div>Enter a query to see results.</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <div><strong>Expanded Query:</strong> {data.query}</div>
            <h3>Results</h3>
            <ul>
                {(data.query_results || []).map((item, i) => (
                    <li key={i}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title || item.url}</a>
                        <div>{truncate(item.snippet || item.content, 150)}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;