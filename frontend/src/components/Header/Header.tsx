import './Header.scss';
import { useEffect, useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../Modal/LoginForm/LoginModal';
import SignupModal from '../Modal/SignupModal/SignupModal';
import { AppDispatch, RootState } from '../../store';
import userActions, { logOutAction } from '../../store/actions/user';

function Header() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Tentative pour afficher
  const { username, logged } = useSelector((store: RootState) => store.user);
  const dispatch: AppDispatch = useDispatch();
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (logged) return;
    if (!pseudo) return;
    if (!password) return;
    dispatch(userActions.loginAction({ pseudo, password }));
    if (logged) navigate(`/user`);
  };

  const handleSignup = () => {
    if (logged) return;
    if (!pseudo) return;
    if (!password) return;
    if (!confirmPwd) return;
    dispatch(
      userActions.signupAction({
        pseudo,
        password,
        passwordConfirm: confirmPwd,
      })
    );
  };

  useEffect(() => {
    console.log('succes alert');
    if (logged) {
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }
  }, [logged]);
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    if (logged) {
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }
  }, [logged]);

  const handleLogout = () => {
    if (!logged) return;

    dispatch(logOutAction());
    navigate(`/`);
  };

  const changeField = (
    value: string,
    name: 'pseudo' | 'password' | 'passwordConfirm' | 'usernameInvitation'
  ) => {
    switch (name) {
      case 'pseudo':
        setPseudo(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordConfirm':
        setConfirmPwd(value);
        break;
      default:
        break;
    }
  };

  return (
    <header>
      {showSuccessAlert && ( // On affiche une alerte si true
        <div className="success-alert">
          Connexion réussie ! Bienvenue, {username} !
        </div>
      )}
      <Button className="burger-menu" onClick={toggleMenu}>
        ☰
      </Button>
      <Container className={`home_header ${isMenuVisible ? 'visible' : ''}`}>
        {!logged ? (
          <>
            <LoginModal
              isLogged={logged}
              pseudo={pseudo}
              password={password}
              changeField={changeField}
              handleLogin={handleLogin}
            />
            <img
              src="src/assets/images/logorppaper.png"
              className="header-logo"
              alt="Logo paperRp"
            />
            <SignupModal
              pseudo={pseudo}
              password={password}
              confirmPassword={confirmPwd}
              changeField={changeField}
              handleSignup={handleSignup}
            />
          </>
        ) : (
          <div>
            <Button href="https://www.aidedd.org/adj/" target="_blank">
              Liens d&apos;aide
            </Button>
            <Link to="/">
              <img
                src="src/assets/images/logorppaper.png"
                className="header-logo"
                alt="Logo paperRp"
              />
            </Link>

            <Button onClick={handleLogout}>Déconnexion</Button>
          </div>
        )}
        <Button className="close-menu" onClick={toggleMenu}>
          X
        </Button>
      </Container>
    </header>
  );
}

export default Header;
