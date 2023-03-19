import React, { useState, useRef, useCallback, memo } from "react";
import Axios from "axios";
import { Row, Col, Button, Form, Input, InputGroup } from "reactstrap";
import {v4 as getKey} from "uuid";
import { getImage } from "../functions";
import ImagesShowCase from "./ImagesShowCase";


const Explore = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [imagesToLoad, setImagesToLoad] = useState([]);
  const metaValues = useRef({
    searchValue : "",
    loadPageNo : 1
  });
  const loadBtnNode = useRef(null);
  const msgUserNode = useRef(null);


  const fetchPhotos = useCallback(async (URL, action) => {

    const { data: {results} } = await Axios.get(URL, {});
    
    const imagesToLoad = results.map(image => {
      const imgReqData = {
        id : image.id,
        regular : image.urls.regular,
        thumb : image.urls.thumb,
        alt : image.alt_description
      }
      return imgReqData;
    });
  
    setImagesToLoad(prev => {    
      switch (action) {
        case "search" : return [imagesToLoad];
        case "load" : return [...prev, imagesToLoad];
        default : return [];
      }
    });

  }, []);


  const handleSearch = useCallback((event, action, perPage = 16) => {

    event.preventDefault();
    
    if (!searchQuery) {
      return;
    }

    switch(action) {

      case "search" :
        metaValues.searchValue.current = searchQuery;
        metaValues.loadPageNo.current = 1;

        if (loadBtnNode.current) {
          setTimeout(() => {
            loadBtnNode.current.style.display = "block";
            loadBtnNode.current = null;
          }, 1500);
        }

        if (msgUserNode.current) {
          msgUserNode.current.style.display = "none";
          msgUserNode.current = null;
        }
        break;

      case "load" :
        ++metaValues.loadPageNo.current;
        break;
        
      default: break;
    }

    const unsplashApiUrl = 
    `https://api.unsplash.com/search/photos?query=${metaValues.searchValue.current}&page=${metaValues.loadPageNo.current}&per_page=${perPage}&client_id=${process.env.REACT_APP_API_ACCESS_KEY}`;

    fetchPhotos(unsplashApiUrl, action);

  }, [searchQuery, fetchPhotos]);


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
          <Form onSubmit={event => handleSearch(event, "search")}>
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
        {imagesToLoad.map(data => 
          <ImagesShowCase key={getKey()} imagesToLoad={data}/>
        )}
      </Row>
      
      <Row>
        <Button
          className="load-btn px-5 mx-auto mt-5"
          color="danger"
          innerRef={loadBtnNode}
          onClick={event => handleSearch(event, "load")}>
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
}

export default memo(Explore);