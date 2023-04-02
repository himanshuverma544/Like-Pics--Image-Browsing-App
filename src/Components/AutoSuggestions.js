import { memo } from "react";

const AutoSuggestions = ({ customRef, selectedSuggestion, suggestions }) => {

  return (
    <div className="auto-complete" ref={customRef}>
      <ul className="ps-0" onClick={event => selectedSuggestion(event)}>
        {suggestions.map(suggestion => 
          <li key={suggestion.id} className="ps-3 py-1">{suggestion.text}</li>
        )}
      </ul>
    </div>
  );
};

export default memo(AutoSuggestions);