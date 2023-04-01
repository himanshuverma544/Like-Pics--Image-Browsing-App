// react hooks
import React, { useState, useRef, useCallback, memo, startTransition } from "react";

import Axios from "axios";

import { Row, Col, Button, Form, Input, InputGroup } from "reactstrap";
import { BsSearch } from "react-icons/bs";

// functions
import { getImage } from "../functions";

// components
import ImagesShowCase from "./ImagesShowCase";

// redux
import { useDispatch } from "react-redux";
import { searchImages, loadImages } from "../redux/imagesSlice";
import axios from "axios";


const Explore = () => {

  const axiosVals = useRef({
    loadPageNo : 1,
    cancelToken : null
  });
  const loadBtnNode = useRef(null);
  const msgUserNode = useRef(null);
  const searchValueNode = useRef(null);

  const dispatch = useDispatch();


  const fetchPhotos = useCallback(async () => {

    if (axiosVals.current.cancelToken !== null) {
      axiosVals.current.cancelToken.cancel();
    }

    axiosVals.current.cancelToken = axios.CancelToken.source(); 

    const URL = "https://api.unsplash.com/search/photos";

    const { data: {results} } = await Axios.get(URL, {
      params: {
        query: searchValueNode.current.value,
        page: axiosVals.current.loadPageNo,
        per_page: 20,
        client_id: process.env.UNSPLASH_API_ACCESS_KEY
      },
      cancelToken: axiosVals.current.cancelToken.token
    });
    
    axiosVals.current.cancelToken = null;

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


  const handleLoadImages = useCallback(async () => {

    ++axiosVals.current.loadPageNo;

    const imagesToLoad = await fetchPhotos();

    dispatch(loadImages(imagesToLoad));

  }, [fetchPhotos, dispatch]);


  const handleSearchImages = useCallback(async (event) => {

    event.preventDefault();

    axiosVals.current.loadPageNo = 1;

    if (msgUserNode.current) {
      msgUserNode.current.style.display = "none";
      msgUserNode.current = null;
    }
    
    try {
      const imagesToLoad = await fetchPhotos();
      dispatch(searchImages(imagesToLoad));
    } 
    catch(exception) {}

  }, [fetchPhotos, dispatch]);


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
                placeholder="Search from the library of over 3.48 million plus photos"
                onChange={event => { startTransition(() => handleSearchImages(event)) }}
                autoFocus
              />
              <Button
                className="search-btn"
                color="danger">
                  <BsSearch/>
              </Button>
            </InputGroup>
            <div className="auto-complete">
              <ul className="ps-0">
                <li className="ps-3 py-1">cars</li>
                <li className="ps-3 py-1">bikes</li>
                <li className="ps-3 py-1">airplanes</li>
              </ul>
            </div>
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