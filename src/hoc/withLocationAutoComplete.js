import React, {useEffect, useRef} from "react";

let autoComplete;

const loadScript = (url, callback) => {
    let script = document.getElementById(url);
    if (!script){
        script = document.createElement("script");
        script.id = url;
        script.type = "text/javascript";

        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = () => callback();
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    else {
        callback();
    }
};

const clear = () => {
    window.google.maps.event.clearInstanceListeners(autoComplete);
    document.querySelector("head style").remove();
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ["address"], componentRestrictions: { country: "ua" } }
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
        handlePlaceSelect(updateQuery)
    );
}

async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
}

const withLocationAutoComplete = WrappedComponent => props => {
    const autoCompleteRef = useRef(null);
    useEffect(() => {
        const setField = props.form.setFieldValue.bind(null, props.field.name);
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
            () => handleScriptLoad(setField, autoCompleteRef)
        );
        return () => {
            clear();
        }
    }, [props.field.name, props.form.setFieldValue]);

    return (
        <WrappedComponent
            {...props}
            ref={autoCompleteRef}
        />
    );
};


export default withLocationAutoComplete;
