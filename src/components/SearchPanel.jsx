import React, { useState } from "react";

const defaultOptions = {
    relevanceModel: "pagerank",
    clusteringOption: "flat",
    queryExpansion: "association",
    useHybrid: true,  // Default to using hybrid scoring
};

function SearchPanel({ onSubmit }) {
    const [query, setQuery] = useState("");
    const [options, setOptions] = useState(defaultOptions);

    const handleOptionChange = (e) => {
        const { name, value, type, checked } = e.target;
        setOptions((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSubmit(query, options);
        }
    };

    return (
        <form className="search-panel" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your query..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="query-input"
            />

            <div className="options-group">
                <strong>Relevance Model Options:</strong>
                <label>
                    <input type="radio" name="relevanceModel" value="pagerank"
                           checked={options.relevanceModel === "pagerank"}
                           onChange={handleOptionChange}
                    /> Page Rank
                </label>
                <label>
                    <input type="radio" name="relevanceModel" value="hits"
                           checked={options.relevanceModel === "hits"}
                           onChange={handleOptionChange}
                    /> Hits
                </label>

                {/* Hybrid option as a checkbox */}
                <div className="hybrid-option">
                    <label>
                        <input
                            type="checkbox"
                            name="useHybrid"
                            checked={options.useHybrid}
                            onChange={handleOptionChange}
                        />
                        Use Vector Space Hybrid Scoring
                    </label>
                    {/*<span className="option-tooltip">*/}
                    {/*    Combines selected relevance model with vector space similarity*/}
                    {/*</span>*/}
                </div>
            </div>

            <div className="options-group">
                <strong>Clustering Options:</strong>
                <label>
                    <input type="radio" name="clusteringOption" value="flat"
                           checked={options.clusteringOption === "flat"}
                           onChange={handleOptionChange}
                    /> Flat Clustering
                </label>
                <label>
                    <input type="radio" name="clusteringOption" value="single_hac"
                           checked={options.clusteringOption === "single_hac"}
                           onChange={handleOptionChange}
                    /> Single HAC
                </label>
                <label>
                    <input type="radio" name="clusteringOption" value="average_hac"
                           checked={options.clusteringOption === "average_hac"}
                           onChange={handleOptionChange}
                    /> Average HAC
                </label>
            </div>

            <div className="options-group">
                <strong>Query Expansion Option:</strong>
                <label>
                    <input type="radio" name="queryExpansion" value="association"
                           checked={options.queryExpansion === "association"}
                           onChange={handleOptionChange}
                    /> Association
                </label>
                <label>
                    <input type="radio" name="queryExpansion" value="metric"
                           checked={options.queryExpansion === "metric"}
                           onChange={handleOptionChange}
                    /> Metric
                </label>
                <label>
                    <input type="radio" name="queryExpansion" value="scalar"
                           checked={options.queryExpansion === "scalar"}
                           onChange={handleOptionChange}
                    /> Scalar
                </label>
                <label>
                    <input type="radio" name="queryExpansion" value="rocchio"
                           checked={options.queryExpansion === "rocchio"}
                           onChange={handleOptionChange}
                    /> Rocchio
                </label>
            </div>

            <button type="submit" className="query-btn">Search</button>
        </form>
    );
}

export default SearchPanel;