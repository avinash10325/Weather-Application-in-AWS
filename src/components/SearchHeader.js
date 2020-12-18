import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

function SearchHeader(props) {
  return (
    <div>
      <PlacesAutocomplete
        value={props.address}
        onChange={props.setAddress}
        onSelect={props.handleLocationSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <header className="grid grid-cols-6">
            <div
              onClick={props.toggleMenu}
              className="px-4 mt-4 cursor-pointer md:hidden"
            >
              <svg
                className="h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>
            <input
              {...getInputProps({
                placeholder: "Enter location",
                className:
                  "col-start-2 col-span-5 h-12 px-4 md:px-14 mr-8 mt-4 w-11/12 md:w-full bg-gray-100 rounded-full",
              })}
            />

            <div className="col-start-2 col-span-5 px-4 md:px-14 mr-8 mb-4 w-11/12 md:w-full bg-gray-100 rounded-b-3xl">
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? "bg-blue-700 text-white"
                  : "bg-transparent";

                return (
                  <div {...getSuggestionItemProps(suggestion, { className, key: index })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </header>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default SearchHeader;
