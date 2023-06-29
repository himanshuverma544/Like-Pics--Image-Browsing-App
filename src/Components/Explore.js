// react hooks
import { useState, useEffect, useRef, useCallback, memo } from "react";

// remote-data management libraries
import { useInfiniteQuery } from "react-query";
import Axios from "axios";

// utility libraries
import { useInView } from "react-intersection-observer";

// frontend libraries
import { Container, Row, Col, Button, Form, Input, InputGroup } from "reactstrap";
import { BsSearch } from "react-icons/bs";

// functions
import { getImage, typewriter } from "../customFunctions";

// components
import ButtonsPanel from "./ButtonsPanel";
import ThemeSwitcher from "./ThemeSwitcher";
import AutoSuggestions from "./AutoSuggestions";
import ImagesShowCase from "./ImagesShowCase";

// redux
import { useDispatch } from "react-redux";
import { loadImages, searchImages } from "../redux/imagesSlice";

// data
import popularImageSearchWords from "../assets/arrays/popularImageSearchWords";


const Explore = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const vals = useRef({
    storeSearchQuery: "",
    IMAGES_PER_PAGE: 20,
    pageNum: 1
  });

  const searchValueNode = useRef(null);

  const imagesDispatch = useDispatch();


  const fetchImages = useCallback(async (searchQuery, pageParam, selectedSearchVal = "") => {

    vals.current.storeSearchQuery = !selectedSearchVal ? searchQuery : selectedSearchVal;

    const URL = "https://api.unsplash.com/search/photos";

    const { data: { results } } = await Axios.get(URL, {
      params: {
        query: vals.current.storeSearchQuery,
        page: pageParam,
        per_page: vals.current.IMAGES_PER_PAGE,
        client_id: process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY
      },
    });

    return {
      results,
      currPage: pageParam 
    };
  }, []);

 
  const {
    data, 
    isSuccess, 
    hasNextPage, 
    fetchNextPage, 
    isFetchingNextPage, 
    refetch: handleSearchImages
  } = 
  useInfiniteQuery({
    queryKey: ["images"], 
    queryFn: ({ pageParam = 1 }) => fetchImages(searchQuery, pageParam),
    getNextPageParam: lastPage => lastPage.results.length ? lastPage.currPage + 1 : undefined,
    enabled: false
  });


  const handleLoadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);


  useEffect(() => {

    if (isSuccess) {
      
      function storeFetchedImages() {

        const { pages, pageParams } = data;
        const { results } = pages[pages.length - 1];     

        const images = results.map(image => {
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

      pageParams.at(-1) === undefined ? imagesDispatch(searchImages(images)) : imagesDispatch(loadImages(images));
      }
      storeFetchedImages();
    }
  }, [data, isSuccess, imagesDispatch]);


  return (
    <Container className="py-3">
    
      <ThemeSwitcher/>

      <Row>
        <Col md={12}>
          <div className="hero-sec d-flex justify-content-center align-items-center position-relative">
            <h1 className="me-3">Like Pics</h1>
            <img className="app-icon" src={getImage("like-icon.png")} alt="Like Icon"/>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Form
            className="position-relative"
            onSubmit={event => {
              event.preventDefault();
              handleSearchImages();
          }}>
            <InputGroup>
              <Input
                type="text"
                id="search-field"
                className="ps-3"
                innerRef={searchValueNode}
                onChange={event => setSearchQuery(event.target.value.trim())}
                autoComplete="off"
                // placeholder={
                //   typewriter({
                //     leftStaticStr: "Search for ", 
                //     words: popularImageSearchWords, 
                //     rightStaticStr: " from the library of over 3.48 million plus photos",
                //   })
                // }
                autoFocus
              />
              <Button
                className="search-btn"
                color="danger"
              >
                <BsSearch/>
              </Button>
            </InputGroup>
            {/* <AutoSuggestions
              states={{searchQuery, setSearchQuery}}
              nodes={{searchValueNode}}
              variables={{limit: 5}}
              functions={{handleSearchImages}}
            /> */}
          </Form>
        </Col>
      </Row>
    
      <Row className="images-showcase-row">
        <ImagesShowCase/>
      </Row>

      <Row>
        <Button 
          className="load-more-btn"
          onClick={handleLoadMore}
          disabled={isFetchingNextPage}
        >
          Load More
        </Button>
      </Row>
    
      <Row className="btns-panel-row">
        <Col>
          <div className="btns-panel-container d-flex justify-content-center">
            <ButtonsPanel 
              nodes={{ searchValueNode }}
            />
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default memo(Explore);

// TODO: link in placeholder