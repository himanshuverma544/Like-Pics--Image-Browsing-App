import { useState, useEffect, useRef, useCallback, memo } from "react";
import Axios from "axios";
import { v4 as getKey } from "uuid";

const AutoSuggestions = ({ states: { searchQuery, setSearchQuery }, nodes: { searchValueNode }, variables: { limit }, functions: { handleSearchImages } }) => {
  
  const [autoSuggestionsData, setAutoSuggestionsData] = useState([]);

  const autoSuggestNode = useRef(null);

  const vals = useRef({
    cancelToken: null,
  });

  const handleSelectedSuggestion = useCallback((event) => {
    
      const selectedSuggestion = event.target.closest(".auto-complete ul li");
      searchValueNode.current.value = selectedSuggestion.textContent;
      handleSearchImages(null, selectedSuggestion.textContent);
      autoSuggestNode.current.style.display = "none";

      setSearchQuery(selectedSuggestion.textContent);
    },
    [searchValueNode, setSearchQuery, handleSearchImages]
  );

  const getAutoSuggestions = useCallback(async () => {
    try {
      if (vals.current.cancelToken !== null) {
        vals.current.cancelToken.cancel();
      }

      vals.current.cancelToken = Axios.CancelToken.source();

      const URL = "https://api.bing.microsoft.com/v7.0/images/search";

      let {
        data: {
          queryExpansions,
          pivotSuggestions: [{ suggestions: pivotSuggs }],
          relatedSearches,
        },
      } = await Axios.get(URL, {
        headers: {
          "Ocp-Apim-Subscription-Key":
            process.env.REACT_APP_IMAGE_SEARCH_SUGGESTIONS_API_KEY,
        },
        params: {
          q: searchQuery,
          count: 1,
          safeSearch: "Strict",
        },
        cancelToken: vals.current.cancelToken.token,
      });

      vals.current.cancelToken = null;

      let autoCompSuggesObjsArr = [];

      [queryExpansions, pivotSuggs, relatedSearches].forEach((dataArr) => {
        if (dataArr) {
          autoCompSuggesObjsArr = [...dataArr];
        }
      });

      const autoCompSuggesArr = [];

      for (
        let i = 0, counter = 0, searchValue = searchQuery.toLowerCase();
        i < autoCompSuggesObjsArr.length;
        i++
      ) {
        if (counter >= limit) {
          break;
        }

        const { text } = autoCompSuggesObjsArr[i];

        if (text.toLowerCase().includes(searchValue)) {
          const suggestion = {
            id: getKey(),
            text,
          };
          autoCompSuggesArr.push(suggestion);
          counter++;
        }
      }

      setAutoSuggestionsData(autoCompSuggesArr);
      autoSuggestNode.current.style.display = "block";
    } catch (exception) {
      console.log(exception.message);
    }
  }, [searchQuery, limit]);

  const getAutoSuggestionsUtility = useCallback(
    (event) => {
      if (event.type === "keyup" && event.key === "Enter") {
        autoSuggestNode.current.style.display = "none";
      } else if (
        (event.type === "keyup" &&
          ((event.key >= "A" && event.key <= "Z") ||
            (event.key >= "a" && event.key <= "z") ||
            (event.key >= "0" && event.key <= "9") ||
            event.key === " " ||
            event.key === "Backspace")) ||
        event.type === "focus"
      ) {
        if (searchQuery.length > 1) {
          getAutoSuggestions();
        } else if (searchQuery.length <= 1) {
          autoSuggestNode.current.style.display = "none";
        }
      }
    },
    [searchQuery, getAutoSuggestions]
  );

  useEffect(() => {
    let tempSearchValueNode = searchValueNode.current;

    function addingEventsListeners() {
      ["focus", "keyup"].forEach((currentEvent) => {
        tempSearchValueNode.addEventListener(
          currentEvent,
          getAutoSuggestionsUtility
        );
      });
    }

    addingEventsListeners();

    return () => {
      ["focus", "keyup"].forEach((currentEvent) => {
        tempSearchValueNode.removeEventListener(
          currentEvent,
          getAutoSuggestionsUtility
        );
      });
    };
  }, [searchValueNode, getAutoSuggestionsUtility]);

  useEffect(() => {
    function hideAutoSuggsOnOutsideClick() {
      document.addEventListener("click", (event) => {
        if (
          event.target.closest(".auto-complete") === null &&
          autoSuggestNode.current.style.display === "block"
        ) {
          autoSuggestNode.current.style.display = "none";
        }
      });
    }

    hideAutoSuggsOnOutsideClick();
  }, []);

  return (
    <div className="auto-complete position-absolute" ref={autoSuggestNode}>
      {autoSuggestionsData.length ? 
        <ul
          className="ps-0"
          onClick={event => handleSelectedSuggestion(event)}
        >
          {autoSuggestionsData.map(autoSuggestionData => (
            <li key={autoSuggestionData.id} className="ps-3 py-1">
              {autoSuggestionData.text}
            </li>
          ))}
        </ul>
       : 
        <></>
      }
    </div>
  );
};

export default memo(AutoSuggestions);

// TODOs:
// key functionality
// api handling (x)
// corner cases ():
// - keep the autosuggestion box hidden if there is no suggestion return by the api
// - react query library for API's
