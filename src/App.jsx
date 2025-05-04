import React, { useState } from "react";
import SearchPanel from "./components/SearchPanel";
import SearchResults from "./components/SearchResults";
import GoogleResults from "./components/GoogleResults";
import BingResults from "./components/BingResults";
import "./components/styles.css";
import GoogleSearchEngineWidget from "./components/GoogleSearchEngineWidget.jsx";

function App() {
    const [query, setQuery] = useState("");
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [searchOptions, setSearchOptions] = useState(null);

    const handleQuerySubmit = (q, options) => {
        setQuery(q);
        setSearchOptions(options);
        setTriggerSearch(!triggerSearch); // trigger reload for children
    };

    return (
        <div className="app-background">
            <div className="center-bar-container">
                <h1>Gymnastics Multi-Search Engine Results</h1>
                <SearchPanel onSubmit={handleQuerySubmit} />
            </div>
            <div className="frames">
                <div className="frame">
                    <h2>Custom Search Engine</h2>
                    <SearchResults query={query} options={searchOptions} trigger={triggerSearch} />
                </div>
                <div className="frame">
                    <h2>Google Results</h2>
                    <GoogleResults query={query} />
                    {/*<GoogleSearchEngineWidget/>*/}
                </div>
                <div className="frame">
                    <h2>Bing Results</h2>
                    <BingResults query={query} trigger={triggerSearch} />
                </div>
            </div>
        </div>
    );
}

export default App;