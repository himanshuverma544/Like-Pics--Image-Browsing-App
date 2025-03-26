import { useState, useRef, useCallback } from "react";

import { Outlet, Link } from "react-router-dom";

import { 
  MdExplore, MdOutlineExplore,
  MdOutlineLightMode, MdOutlineNightlight 
} from "react-icons/md";

import { BsBookmarkCheckFill, BsBookmarkCheck } from "react-icons/bs";

import { FaUser, FaRegUser } from "react-icons/fa";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { FaCode } from "react-icons/fa6";

import AuthenticationModal from "../components/modals/AuthenticationModal";

import SmartNavLink from "../components/SmartNavLink";
import ThemeSwitcher from "../components/ThemeSwitcher";
import ButtonsPanel from "../components/ButtonsPanel";

import { isClickedOutsideOfModal } from "../utils/functions";

import { EXPLORE, SAVED, AUTHENTICATION } from "../utils/constants";


const Layout = () => {

  const [showAuthenticationModal, setShowAuthenticationModal] = useState(false);
  const authenticationModalNode = useRef(null);

  const openAuthenticationModal = useCallback(() => 
    setShowAuthenticationModal(true)
  , []);

  const closeAuthenticationModal = useCallback(event => {
    if (isClickedOutsideOfModal(event, authenticationModalNode)) {
      setShowAuthenticationModal(false);
    }
  }, []);


  return (
    <>
      <header className="header">
        <nav className="app-navbar">
          <ul className="d-flex gap-4 p-3">
            {/* <SmartNavLink  
              path={EXPLORE.pathname}
              activeIcon={<MdExplore/>}
              inactiveIcon={<MdOutlineExplore/>}
              title={EXPLORE.title}
            />    
            
            <SmartNavLink
              path={SAVED.pathname}
              activeIcon={<BsBookmarkCheckFill/>}
              inactiveIcon={<BsBookmarkCheck/>}
              title={SAVED.title}
            />
             */}
            <ThemeSwitcher/>
     
            {/* <SmartNavLink 
              path={AUTHENTICATION.pathname}
              activeIcon={<FaUser className="user-icon-active nav-icon"/>}
              inactiveIcon={
                <FaRegUser
                  className="user-icon-inactive nav-icon"
                  onClick={openAuthenticationModal}
                />
              }
            />*/}

            {/* { showAuthenticationModal && 
              <AuthenticationModal
                authenticationModalNode={authenticationModalNode}
                closeAuthenticationModal={closeAuthenticationModal}
              />
            }*/}
          </ul>
        </nav>
      </header>

      <main>
        <Outlet/>
        <ButtonsPanel/>
      </main>
    
      <footer className="d-flex justify-content-around p-3">
        <Link 
          to="https://www.linktr.ee/himanshuverma544"
          target="_blank"
        >
          About Developer
        </Link>

        <p className="d-flex align-items-center gap-1">
          Made with Love
          <AiOutlineHeart className="heart-like"/>
          <AiFillHeart className="heart-like-filled"/>
        </p>

        <Link
          to="https://www.github.com/himanshuverma544/Like-Pics"
          target="_blank"
        >
          <span className="d-flex align-items-center">
            <FaCode/>
            <p className="ps-1">Source Code</p>
          </span>
        </Link>
      </footer>


    </>
  );
}

export default Layout;