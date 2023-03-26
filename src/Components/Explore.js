// react hooks
import React, { useState, useRef, useCallback, memo } from "react";

import Axios from "axios";

import { Row, Col, Button, Form, Input, InputGroup } from "reactstrap";

// functions
// import {v4 as getKey} from "uuid";
import { getImage } from "../functions";

// components
import ImagesShowCase from "./ImagesShowCase";

// redux
import { useDispatch } from "react-redux";
import { searchImages, loadImages } from "../redux/action/action-creators";



const Explore = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const metaValues = useRef({
    searchValue : "",
    loadPageNo : 1
  });
  const loadBtnNode = useRef(null);
  const msgUserNode = useRef(null);

  const dispatch = useDispatch();

    
  const fetchPhotos = useCallback(async () => {

    const URL = "https://api.unsplash.com/search/photos";

    const { data: {results} } = await Axios.get(URL, {
      params: {
        query: metaValues.current.searchValue,
        page: metaValues.current.loadPageNo,
        per_page: 20,
        client_id: process.env.REACT_APP_API_ACCESS_KEY
      }
    });
    
    loadBtnNode.current.style.display = results.length ? "block" : "none";

    const imagesToLoad = results.map(image => {
      const imgReqData = {
        id : image.id,
        regular : image.urls.regular,
        thumb : image.urls.thumb,
        alt : image.alt_description
      }
      return imgReqData;
    });

    return imagesToLoad;

  }, []);


  const handleLoadImages = useCallback(async () => {

    ++metaValues.current.loadPageNo;

    const imagesToLoad = await fetchPhotos();

    dispatch(loadImages(imagesToLoad));

  }, [fetchPhotos, dispatch]);


  const handleSearchImages = useCallback(async (event) => {

    event.preventDefault();
    
    if (!searchQuery) {
      return;
    }

    metaValues.current.searchValue = searchQuery;
    metaValues.current.loadPageNo = 1;

    if (msgUserNode.current) {
      msgUserNode.current.style.display = "none";
      msgUserNode.current = null;
    }

    const imagesToLoad = await fetchPhotos();

    dispatch(searchImages(imagesToLoad));

  }, [searchQuery, fetchPhotos, dispatch]);


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
                placeholder="Search Photos"
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                autoFocus
              />
              <Button
                className="search-btn"
                color="danger">
                  SEARCH
              </Button>
            </InputGroup>
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