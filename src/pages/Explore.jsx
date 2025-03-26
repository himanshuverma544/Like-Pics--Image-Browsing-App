// ui libraries
import { Container, Row, Col, Button, Form, Input, InputGroup } from "reactstrap";
import { BsSearch } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// react hooks
import { useState, useEffect, useContext, useRef, useCallback, useMemo } from "react";

// context
import { tsContext } from "../context-API/context";

// remote-data management libraries
import { useInfiniteQuery } from "react-query";
import Axios from "axios";

// utility libraries
import { useInView } from "react-intersection-observer";

// components
import AutoSuggestions from "../components/AutoSuggestions";
import ImagesGridView from "../components/ImagesGridView";

// modals component
import AuthenticationModal from "../components/modals/AuthenticationModal";

// functions
import { typewriter } from "../utils/functions";

// images
import LikeIcon from "../assets/images/like-icon.png";

// array
import popularImageSearchWords from "../assets/data/arrays/popularImageSearchWords";


const Explore = () => {

  
  const [searchQuery, setSearchQuery] = useState("");

  const vals = useRef({
    storeSearchQuery: "",
    IMAGES_PER_PAGE: 20,
    pageNum: 1
  });

  const searchValueNode = useRef(null);

  const { ref, inView } = useInView();


  

  const fetchImages = useCallback(async (searchQuery, pageParam, selectedSearchVal = "") => {

    vals.current.storeSearchQuery = !selectedSearchVal ? searchQuery : selectedSearchVal;

    const URL = "https://api.unsplash.com/search/photos";

    const { data: { results } } = await Axios.get(URL, {
      params: {
        query: vals.current.storeSearchQuery,
        page: pageParam,
        per_page: vals.current.IMAGES_PER_PAGE,
        client_id: import.meta.env.VITE_UNSPLASH_API_ACCESS_KEY
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
    queryKey: [searchQuery], 
    queryFn: ({ pageParam = 1 }) => fetchImages(searchQuery, pageParam),
    getNextPageParam: lastPage => lastPage.results.length ? lastPage.currPage + 1 : undefined,
    enabled: false
  });


  const imagesData = useMemo(() => {

    if (isSuccess) {
      return data?.pages;
    }
  }, [isSuccess, data]);


  useEffect(() => {

    function fetchingNextPage() {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    }
    fetchingNextPage();
  }, [inView, hasNextPage, fetchNextPage]);


  const handleOnSubmit = event => {
    event.preventDefault();
    handleSearchImages();
  };


  return (
    <>
      <Container>
        <Row>
          <Col md={12}>
            <div className="hero-sec d-flex justify-content-center align-items-center position-relative">
              <h1 className="me-3">Like Pics</h1>
              <img className="app-icon" src={LikeIcon} alt="Like Icon"/>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form
              className="position-relative"
              onSubmit={handleOnSubmit}
            >
              <InputGroup>
                <Input
                  type="text"
                  id="search-field"
                  className="ps-3"
                  innerRef={searchValueNode}
                  onChange={event => setSearchQuery(event.target.value.trim())}
                  autoComplete="off"
                  placeholder={
                    typewriter({
                      leftStaticStr: "Search for ", 
                      words: popularImageSearchWords, 
                      rightStaticStr: " from the library of over 3.48 million plus photos",
                    })
                  }
                  autoFocus
                />
                <Button className="search-btn" color="danger">
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
        
        { (isSuccess && imagesData.length > 0) && 
          <Row className="images-showcase-row">
            <ImagesGridView 
              ref={ref} 
              imagesData={imagesData} 
            />
          </Row>
        }

        { isFetchingNextPage &&
          <></>
        }
          
      </Container>   
    </>
  );
};

export default Explore;

// TODO: link in placeholder
// This component renders 2 times because of using context
// react query cache is not working properly