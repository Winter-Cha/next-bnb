import { useDispatch } from "react-redux";
import useModal from "../hooks/useModal";
import { authActions } from "../store/auth";
import AuthModal from "./auths/AuthModal";
import styled from "styled-components";
import palette from "../styles/palette";

const Container = styled.div`
  /** 헤더 로그인 회원가입 버튼 */
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
`;

const HeaderAuths: React.FC = () => {
  const { openModalPotal, ModalPortal, closeModalPotal } = useModal();
  const dispatch = useDispatch();

  return (
    <Container>
      <div className="header-auth-buttons">
        <button
          className="header-sign-up-button"
          onClick={() => {
            dispatch(authActions.setAuthMode("signup"));
            openModalPotal();
          }}
          type="button"
        >
          회원가입
        </button>
        <button
          className="header-login-button"
          onClick={() => {
            dispatch(authActions.setAuthMode("login"));
            openModalPotal();
          }}
          type="button"
        >
          로그인
        </button>
      </div>
      <ModalPortal>
        <AuthModal closeModalPotal={closeModalPotal} />
      </ModalPortal>
    </Container>
  );
};

export default HeaderAuths;
