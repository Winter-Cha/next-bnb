import SignUpModal from "./SignUpModal";
import { useSelector, RootState } from "../../store/";
import LoginModal from "./LoginModal";

interface IProps {
  closeModalPotal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModalPotal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);
  return (
    <div>
      {authMode === "signup" && (
        <SignUpModal closeModalPotal={closeModalPotal} />
      )}
      {authMode === "login" && <LoginModal closeModalPotal={closeModalPotal} />}
    </div>
  );
};

export default AuthModal;
