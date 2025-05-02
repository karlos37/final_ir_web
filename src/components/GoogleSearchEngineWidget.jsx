import React, { useEffect } from "react";

const CSE_ID = "d519ff19684034ba6"; // Replace with your CSE ID

function GoogleSearchWidget() {
    useEffect(() => {
        // Remove any existing CSE script (prevents duplicates on hot reload)
        const prevScript = document.getElementById("google-cse-script");
        if (prevScript) prevScript.remove();

        // Create new script
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.id = "google-cse-script";
        script.src = `https://cse.google.com/cse.js?cx=${CSE_ID}`;

        document.body.appendChild(script);

        // Cleanup on unmount
        return () => {
            script.remove();
            const widget = document.querySelector(".gcse-search");
            if (widget) widget.innerHTML = "";
        };
    }, []);

    return (
        <div>
            <div className="gcse-search"></div>
        </div>
    );
}

export default GoogleSearchWidget;