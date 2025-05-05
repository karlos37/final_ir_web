import React, { useEffect, useState } from "react";

// In SearchResults.jsx, update the getApiParams function:

function getApiParams(options, query) {
    const params = new URLSearchParams({ query });

    // Add relevance parameter if selected
    if (options.relevanceModel === "pagerank") {
        params.append("relevance", "page_rank");
    } else if (options.relevanceModel === "hits") {
        params.append("relevance", "hits");
    }

    // Add clustering parameter if selected
    if (options.clusteringOption === "flat") {
        params.append("clustering", "flat_clustering");
    } else if (options.clusteringOption === "single_hac") {
        params.append("clustering", "single_hac");
    } else if (options.clusteringOption === "average_hac") {
        params.append("clustering", "average_hac");
    }

    // Add query expansion parameter if selected
    if (options.queryExpansion === "rocchio") {
        params.append("expansion", "rocchio");
    } else if (options.queryExpansion === "association") {
        params.append("expansion", "association_qe");
    } else if (options.queryExpansion === "metric") {
        params.append("expansion", "metric_qe");
    } else if (options.queryExpansion === "scalar") {
        params.append("expansion", "scalar_qe");
    }

    // Add hybrid parameter
    params.append("hybrid", options.useHybrid ? "true" : "false");

    return params;
}

function truncate(text, maxLength = 150) {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function SearchResults({ query, options, trigger }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query || !options) return;

        // Check if at least one option is selected
        const hasSelection =
            options.relevanceModel ||
            options.clusteringOption ||
            options.queryExpansion;

        if (!hasSelection) {
            setError("Please select at least one search option");
            return;
        }

        setLoading(true);
        setError(null);

        // Get parameters for the API call
        const params = getApiParams(options, query);

        fetch(`http://127.0.0.1:5000/api/v1/search?${params.toString()}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Server responded with status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Search error:", err);
                setError(`Error fetching results: ${err.message}`);
                setLoading(false);
                setData(null);
            });
    }, [query, options, trigger]);

    if (!query) return <div>Enter a query to see results.</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (loading) return <div>Loading...</div>;
    if (!data) return <div>No results found.</div>;

    // Display applied methods
    const appliedMethods = data.applied_methods || {};
    const isQueryExpanded = data.query !== query;

    return (
        <div className="search-results-container">
            <div className="search-summary">
                <div className="original-query">
                    <strong>Original Query:</strong> {query}
                </div>

                {isQueryExpanded && (
                    <div className="expanded-query">
                        <strong>Expanded Query:</strong> {data.query}
                        {options.queryExpansion && (
                            <span className="expansion-method">
                                (using {options.queryExpansion} expansion)
                            </span>
                        )}
                    </div>
                )}

                <div className="applied-methods">
                    <strong>Applied Methods:</strong>
                    <ul>
                        {appliedMethods.relevance && appliedMethods.relevance !== "default" && (
                            <li>Relevance: {appliedMethods.relevance}</li>
                        )}
                        {appliedMethods.clustering && appliedMethods.clustering !== "none" && (
                            <li>Clustering: {appliedMethods.clustering}</li>
                        )}
                        {appliedMethods.expansion && appliedMethods.expansion !== "none" && (
                            <li>Query Expansion: {appliedMethods.expansion}</li>
                        )}
                    </ul>
                </div>
            </div>

            <h3>Results ({data.query_results?.length || 0})</h3>

            {data.query_results && data.query_results.length > 0 ? (
                <ul className="search-results-list">
                    {data.query_results.map((item, i) => (
                        <li key={i} className="result-item">
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="result-title"
                            >
                                {item.title || item.url}
                            </a>
                            {/*<div className="result-url">{item.url}</div>*/}
                            <div className="result-snippet">
                                {truncate(item.snippet || item.content, 150)}
                            </div>
                            {item.cluster_num !== undefined && (
                                <div className="cluster-info">
                                    Cluster: {item.cluster_num}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No results found for your query.</div>
            )}
        </div>
    );
}

export default SearchResults;