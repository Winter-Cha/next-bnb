import React, { useState } from "react";
import styled from "styled-components";
import AirbnbLogoIcon from "../public/static/svg/logo/logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import Link from "next/link";
import useModal from "../hooks/useModal";
import { useSelector } from "../store";
import { useDispatch } from "react-redux";
import AuthModal from "./auths/AuthModal";
import HeaderUserProfile from "./HeaderUserProfile";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }
`;

const Header: React.FC = () => {
  const { openModalPotal, ModalPortal, closeModalPotal } = useModal();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //* 유저 메뉴 열고, 닫힘 여부
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);

  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <AirbnbLogoIcon className="header-logo" />
          <AirbnbLogoTextIcon />
        </a>
      </Link>
      <HeaderUserProfile />
      <ModalPortal>
        <AuthModal closeModalPotal={closeModalPotal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
