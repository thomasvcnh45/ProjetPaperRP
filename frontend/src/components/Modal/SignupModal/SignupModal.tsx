import { FormEvent, useState } from 'react';
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from 'semantic-ui-react';
import Field from '../../Field';

interface SignupFormProps {
  pseudo: string;
  password: string;
  confirmPassword: string;
  changeField: (
    value: string,
    name: 'pseudo' | 'password' | 'passwordConfirm'
  ) => void;
  handleSignup: () => void;
}

function SignupModal({
  pseudo,
  password,
  confirmPassword,
  changeField,
  handleSignup,
}: SignupFormProps) {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignup();
    setOpen(false);
  };

  const handleChangeUsername = (value: string) => {
    changeField(value, 'pseudo');
  };

  const handleChangePassword = (value: string) => {
    changeField(value, 'password');

    // Validation du mot de passe
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(value)) {
      setErrorMessage(
        'Le mot de passe doit contenir au minimum 8 caractères avec au moins une majuscule et un chiffre.'
      );
    } else {
      setErrorMessage('');
    }
  };

  const handleChangeConfirmPwd = (value: string) => {
    changeField(value, 'passwordConfirm');
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button>Inscription</Button>}
    >
      <ModalHeader>Inscription</ModalHeader>
      <ModalContent>
        <form autoComplete="off" id="personForm" onSubmit={handleSubmit}>
          Votre pseudo :
          <Field
            placeholder="Entrer un pseudo"
            value={pseudo}
            onChange={handleChangeUsername}
          />
          Votre mot de passe :
          <Field
            type="password"
            placeholder="********"
            value={password}
            onChange={handleChangePassword}
          />
          Confirmer le mot de passe :
          <Field
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={handleChangeConfirmPwd}
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </ModalContent>
      <ModalActions>
        <Button type="submit" form="personForm">
          OK
        </Button>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </ModalActions>
    </Modal>
  );
}

export default SignupModal;
