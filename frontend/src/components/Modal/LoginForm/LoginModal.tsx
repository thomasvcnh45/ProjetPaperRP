import React, { FormEvent } from 'react';
import {
  ModalContent,
  ModalActions,
  Button,
  Modal,
  ModalHeader,
} from 'semantic-ui-react';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux';
import Field from '../../Field';
import { RootState } from '../../../store';

interface LoginFormProps {
  pseudo: string;
  password: string;
  changeField: (value: string, name: 'pseudo' | 'password') => void;
  handleLogin: () => void;
  // eslint-disable-next-line react/no-unused-prop-types
  isLogged?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  loggedMessage?: string;
}

function LoginForm({
  pseudo,
  password,
  changeField,
  handleLogin,
}: LoginFormProps) {
  const [open, setOpen] = React.useState(false);
  const { isPending } = useSelector((store: RootState) => store.user);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;
    handleLogin();
    setOpen(false);
  };

  const handleChangeUsername = (value: string) => {
    changeField(value, 'pseudo');
  };

  const handleChangePassword = (value: string) => {
    changeField(value, 'password');
  };
  return (
    <Modal
      className="Modale"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button>Connexion</Button>}
    >
      <ModalHeader>Connexion</ModalHeader>
      <ModalContent>
        <form autoComplete="off" onSubmit={handleSubmit} id="personForm">
          <Field
            placeholder="Nom d'utilisateur"
            value={pseudo}
            onChange={handleChangeUsername}
          />
          <Field
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handleChangePassword}
          />
        </form>
      </ModalContent>
      <ModalActions>
        <Button
          form="personForm"
          type="submit"
          className="login-form-button"
          disabled={isPending}
        >
          Connexion
        </Button>
        <Button type="button" onClick={() => setOpen(false)}>
          Annuler
        </Button>
      </ModalActions>
    </Modal>
  );
}
LoginForm.defaultProps = {
  isLogged: false,
  loggedMessage: 'Connecté',
};
export default LoginForm;
