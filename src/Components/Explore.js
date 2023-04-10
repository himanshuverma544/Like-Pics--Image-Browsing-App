// react hooks
import { useState, useRef, useCallback, memo } from "react";

// remote-data management libraries
import Axios from "axios";

// frontend libraries
import { Container, Row, Col, Button, Form, Input, InputGroup } from "reactstrap";
import { BsSearch } from "react-icons/bs";

// functions
import { memoGetImage, memoTypewriter } from "../functions";

// components
import ThemeSwitcher from "./ThemeSwitcher";
import AutoSuggestions from "./AutoSuggestions";
import ImagesShowCase from "./ImagesShowCase";

// redux
import { useDispatch } from "react-redux";
import { searchImages, loadImages } from "../redux/imagesSlice";

// data
import popularImageSearchWords from "../assets/arrays/popularImageSearchWords";



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
        actions: {
        likes : image.likes,
        download: image.links.download
        },
        photographer: {
          fullName: image.user.name,
          profile: `${image.user.links.html}/?utm_source=like_pics&utm_medium=referral`
        },
        unsplashUrl: "https://unsplash.com/?utm_source=like_pics&utm_medium=referral"
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
      <Container className="py-3">
       
        <ThemeSwitcher/>

        <Row>
          <Col md={12}>
            <div className="hero-sec d-flex justify-content-center align-items-center position-relative">
              <h1 className="me-3">Like Pics</h1>
              <img className="app-icon" src={memoGetImage("like-icon.png")} alt="Like Icon"/>
            </div>
          </Col>
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
                  onChange={event => setSearchQuery(event.target.value.trim())}
                  autoComplete="off"
                  placeholder={
                    memoTypewriter({
                      leftStaticStr: "Search for ", 
                      words: popularImageSearchWords, 
                      rightStaticStr: " from the library of over 3.48 million plus photos",
                    })
                  }
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

        <ImagesShowCase/>
          
        <Row>
          <Col md={12}>
            <Button
              className="load-btn px-5 mx-auto mt-5"
              color="danger"
              innerRef={loadBtnNode}
              onClick={() => handleLoadImages()}>
                Load More
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div className="msg-user" ref={msgUserNode}>
              <h6>Hi, some features of this app are still under development.</h6>
              <h6>In the meantime, feel free to use and enjoy the built features.</h6>
              <h6>Thanks for your cooperation.</h6>
            </div>
          </Col>
        </Row>
    </Container>
  );
};

export default memo(Explore);

// TODO: link in placeholder