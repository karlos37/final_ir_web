import React from "react";

function BingResults({ query }) {
    if (!query) return <div>Enter a query to see Bing results.</div>;
    const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
    return (
        <iframe
            title="Bing Results"
            src={bingUrl}
            className="results-iframe"
            sandbox="allow-scripts allow-same-origin allow-popups"
        />
    );
}

export default BingResults;