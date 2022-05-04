import styled from "styled-components";
import MailIcon from "../../public/static/svg/input/mail.svg";
import OpenedEyeIcon from "../../public/static/svg/input/opened-eye.svg";
import CloseEyeIcon from "../../public/static/svg/input/closed_eye.svg";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { loginAPI } from "../../lib/api/auth";
import useValidateMode from "../../hooks/useValidationMode";
import { userActions } from "../../store/user";

const Container = styled.div`
  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }
  .login-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModalPotal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModalPotal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHided, setIsPasswordHided] = useState(true);
  const { setValidateMode } = useValidateMode();
  const dispatch = useDispatch();

  //* 이메일 주소 변경시
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  //* 비밀번호 변경 시
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  //* 비밀번호 숨김 토글하기
  const toggleHidePassword = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  //* 회원가입 모달로 변경하기
  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode("signup"));
  };

  //* 로그인 클릭 시
  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력 해주세요.");
    } else {
      const loginBody = { email, password };
      try {
        const { data } = await loginAPI(loginBody);
        dispatch(userActions.setLoggedUser(data));
        closeModalPotal();
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container>
      <form onSubmit={onSubmitLogin}>
        <div className="login-input-wrapper">
          <Input
            placeholder="이메일 주소"
            name="email"
            type="email"
            icon={<MailIcon />}
            value={email}
            onChange={onChangeEmail}
            isValid={email !== ""}
            errorMessage="이메일이 필요합니다."
          />
        </div>
        <div className="login-input-wrapper login-password-input-wrapper">
          <Input
            placeholder="비밀번호 설정하기"
            type={isPasswordHided ? "password" : "text"}
            icon={
              isPasswordHided ? (
                <CloseEyeIcon onClick={toggleHidePassword} />
              ) : (
                <OpenedEyeIcon onClick={toggleHidePassword} />
              )
            }
            name="password"
            value={password}
            onChange={onChangePassword}
            isValid={password !== ""}
            errorMessage="비밀번호를 입력하세요."
          />
        </div>
        <div className="login-modal-submit-button-wrapper">
          <Button type="submit">로그인</Button>
        </div>
        <p>
          계정이 없으신가요?
          <span
            className="login-modal-set-login "
            role="presentation"
            onClick={changeToSignUpModal}
          >
            회원가입
          </span>
        </p>
      </form>
    </Container>
  );
};

export default LoginModal;
