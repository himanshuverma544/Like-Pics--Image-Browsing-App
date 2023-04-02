// react hooks
import React, { useState, useEffect ,useRef, useCallback, memo, startTransition } from "react";

import Axios from "axios";

import { Row, Col, Button, Form, Input, InputGroup } from "reactstrap";
import { BsSearch } from "react-icons/bs";

// functions
import { getImage } from "../functions";
import {v4 as getKey} from "uuid";

// components
import ImagesShowCase from "./ImagesShowCase";
import AutoSuggestions from "./AutoSuggestions";

// redux
import { useDispatch } from "react-redux";
import { searchImages, loadImages } from "../redux/imagesSlice";



const Explore = () => {

  const [autoSuggestionsData, setAutoSuggestionsData] = useState([]);

  const axiosVals = useRef({
    loadPageNo : 1,
    cancelToken : null
  });

  const autoSuggestNode = useRef(null);
  const searchValueNode = useRef(null);
  const loadBtnNode = useRef(null);
  const msgUserNode = useRef(null);

  const dispatch = useDispatch();


  const fetchPhotos = useCallback(async () => {

    const URL = "https://api.unsplash.com/search/photos";

    const { data: {results} } = await Axios.get(URL, {
      params: {
        query: searchValueNode.current.value,
        page: axiosVals.current.loadPageNo,
        per_page: 20,
        client_id: process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY
      },
    });
    
    loadBtnNode.current.style.display = results.length ? "block" : "none";

    const imagesToLoad = results.map(image => {
      const imgReqData = {
        id : image.id,
        urls : {
          regular : image.urls.regular,
          thumb : image.urls.thumb
        },
        alt : image.alt_description,
        likes : image.likes
      }
      return imgReqData;
    });

    return imagesToLoad;

  }, []);


  const handleSearchImages = useCallback(async (event = null) => {

    if (event) {
      event.preventDefault();
    }

    axiosVals.current.loadPageNo = 1;

    if (msgUserNode.current) {
      msgUserNode.current.style.display = "none";
      msgUserNode.current = null;
    }
    
    const imagesToLoad = await fetchPhotos();
    dispatch(searchImages(imagesToLoad));

  }, [fetchPhotos, dispatch]);


  const handleLoadImages = useCallback(async () => {

    ++axiosVals.current.loadPageNo;

    const imagesToLoad = await fetchPhotos();

    dispatch(loadImages(imagesToLoad));

  }, [fetchPhotos, dispatch]);


  useEffect(() => {

    function hideAutoSuggsOnOutsideClick() {
      document.addEventListener("click", event => {
        if (event.target.closest(".auto-complete") === null) {
          autoSuggestNode.current.style.display = "none";
        }
      });
    }

    hideAutoSuggsOnOutsideClick();

  }, []);


  const handleSelectedSuggestion = useCallback(event => {

    const selectedSuggestion = event.target.closest("li");
    searchValueNode.current.value  = selectedSuggestion.textContent;
    handleSearchImages();
    autoSuggestNode.current.style.display = "none";

  }, [handleSearchImages])


  const getAutoSuggestions = useCallback(async () => {

    async function getAutoSuggestionsUtility() {
      try {
        if (axiosVals.current.cancelToken !== null) {
          axiosVals.current.cancelToken.cancel();
        }
        
        axiosVals.current.cancelToken = Axios.CancelToken.source(); 

        const URL = "https://api.bing.microsoft.com/v7.0/images/search";

        let  { data: { queryExpansions, pivotSuggestions: [{ suggestions: pivotSuggs }], relatedSearches } } = await Axios.get(URL, {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.REACT_APP_IMAGE_SEARCH_SUGGESTIONS_API_KEY
          },
          params: {
            q: searchValueNode.current.value,
            count: 1,
            safeSearch: "Strict"
          },
          cancelToken: axiosVals.current.cancelToken.token
        });

        axiosVals.current.cancelToken = null;
      
        let autoCompSuggesObjsArr = [];

        [queryExpansions, pivotSuggs, relatedSearches].forEach(dataArr => {
          if (dataArr) {
            autoCompSuggesObjsArr = [...dataArr];
          }
        });

        const autoCompSuggesArr = [];

        for ( let i = 0,
              counter = 0,
              limit = 10,
              searchValue = searchValueNode.current.value.toLowerCase();
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
                text
              }
              autoCompSuggesArr.push(suggestion);
              counter++;
            }
          }

        setAutoSuggestionsData(autoCompSuggesArr);
        autoSuggestNode.current.style.display = "block";

      } catch (exception) {}
    } 

    if (searchValueNode.current !== null) {
      if (searchValueNode.current.value.length) {
        await getAutoSuggestionsUtility();
      } 
      else {
        setTimeout(() => {
          autoSuggestNode.current.style.display = "none";
        }, 1000);
      }
    }

  }, []);

  //TODO:
  // key functionality
  // on the top of images functionality
  // api handling
  // corner cases

  return (
    <div>
      <Row>
        <div className="hero-sec d-flex justify-content-center align-items-center">
          <h1 className="me-3">Like-Pics</h1>
          <img src={getImage("like-icon.png")} alt="Like Icon"/>
        </div>
      </Row>

      <Row>
        <Col md={12}>
          <Form onSubmit={event => handleSearchImages(event)}>
            <InputGroup>
              <Input
                type="text"
                id="search-field"
                className="ps-3"
                innerRef={searchValueNode}
                onChange={() => getAutoSuggestions()}
                onFocus={() => getAutoSuggestions()}
                autoComplete="off"
                placeholder="Search from the library of over 3.48 million plus photos"
                autoFocus
              />
              <Button
                className="search-btn"
                color="danger">
                  <BsSearch/>
              </Button>
            </InputGroup>
            <AutoSuggestions
              customRef={autoSuggestNode}
              suggestions={autoSuggestionsData}
              selectedSuggestion={handleSelectedSuggestion}
            />
          </Form>
        </Col>
      </Row>

      <Row className="images-showcase">
          <ImagesShowCase/>
      </Row>
      
      <Row>
        <Button
          className="load-btn px-5 mx-auto mt-5"
          color="danger"
          innerRef={loadBtnNode}
          onClick={() => handleLoadImages()}>
            Load More
        </Button>
      </Row>

      <Row>
        <div className="msg-user" ref={msgUserNode}>
          <h6>Hi, some features of this app are still under development.</h6>
          <h6>In the meantime, feel free to use and enjoy the built features.</h6>
          <h6>Thanks for your cooperation.</h6>
        </div>
      </Row>
    </div>
  );
};

export default memo(Explore);