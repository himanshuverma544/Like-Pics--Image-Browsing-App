// react hooks
import React, { useState, useRef, useCallback, memo } from "react";

import Axios from "axios";

import { Container, Row, Col, Button, Form, Input, InputGroup } from "reactstrap";
import { BsSearch } from "react-icons/bs";

// functions
import { getImage } from "../functions";

// components
import ImagesShowCase from "./ImagesShowCase";
import AutoSuggestions from "./AutoSuggestions";

// redux
import { useDispatch } from "react-redux";
import { searchImages, loadImages } from "../redux/imagesSlice";



const Explore = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const vals = useRef({
    storeSearchQuery: "",
    loadPageNo: 1,
  });

  const searchValueNode = useRef(null);
  const loadBtnNode = useRef(null);
  const msgUserNode = useRef(null);

  const dispatch = useDispatch();


  const fetchPhotos = useCallback(async () => {

    const URL = "https://api.unsplash.com/search/photos";

    const { data: {results} } = await Axios.get(URL, {
      params: {
        query: vals.current.storeSearchQuery,
        page: vals.current.loadPageNo,
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


  const handleSearchImages = useCallback(async (event, selectedSearchVal = "") => {

    if (event) {
      event.preventDefault();
    }

    vals.current.storeSearchQuery = !selectedSearchVal ? searchQuery : selectedSearchVal;
    vals.current.loadPageNo = 1;

    if (msgUserNode.current) {
      msgUserNode.current.style.display = "none";
      msgUserNode.current = null;
    }
    
    const imagesToLoad = await fetchPhotos();
    dispatch(searchImages(imagesToLoad));

  }, [searchQuery, fetchPhotos, dispatch]);


  const handleLoadImages = useCallback(async () => {

    ++vals.current.loadPageNo;

    const imagesToLoad = await fetchPhotos();

    dispatch(loadImages(imagesToLoad));

  }, [fetchPhotos, dispatch]);


  return (
    
      <Container className="py-5">
        <Row>
          <div className="hero-sec d-flex justify-content-center align-items-center position-relative">
            <h1 className="me-3">Like-Pics</h1>
            <img className="app-icon" src={getImage("like-icon.png")} alt="Like Icon"/>
            <img className="theme-switch-icon position-absolute end-0 h-50" src={getImage("brightness (3).png")} alt="Theme Icon"/>
          </div>
        </Row>

        <Row>
          <Col md={12}>
            <Form className="position-relative" onSubmit={event => handleSearchImages(event)}>
              <InputGroup>
                <Input
                  type="text"
                  id="search-field"
                  className="ps-3"
                  innerRef={searchValueNode}
                  onChange={event => setSearchQuery(event.target.value)}
                  autoComplete="off"
                  placeholder="Search from the library of over 3.48 million plus photos"
                  autoFocus
                />
                <Button
                  className="search-btn"
                  color="danger"
                >
                  <BsSearch/>
                </Button>
              </InputGroup>
              <AutoSuggestions
                states={{searchQuery, setSearchQuery}}
                nodes={{searchValueNode}}
                variables={{limit: 5}}
                functions={{handleSearchImages}}
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
    </Container>

  );
};

export default memo(Explore);