import React, { FormEvent } from 'react';
import {
  ModalContent,
  ModalActions,
  Button,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react';
import Field from '../../Field';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface InvitationFormProps {
  usernameInvitation: string;
  changeField: (value: string, name: 'usernameInvitation') => void;
  handleInvitation: () => void;
}

function InvitationForm({
  usernameInvitation,
  changeField,
  handleInvitation,
}: InvitationFormProps) {
  const [open, setOpen] = React.useState(false);

  const { isPending } = useSelector((store: RootState) => store.user);

  const handleSubmtInvitation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;
    handleInvitation();
    setOpen(false);
  };

  const handleChangeUserInvitation = (value: string) => {
    changeField(value, 'usernameInvitation');
  };

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button>Invitation</Button>}
    >
      <Header icon>
        <Icon name="shield alternate" />
        Invitation
      </Header>
      <ModalContent>
        <form autoComplete="off" onSubmit={handleSubmtInvitation} id="addForm">
          <Field
            placeholder="aventurier a appeler"
            value={usernameInvitation}
            onChange={handleChangeUserInvitation}
          />
        </form>
      </ModalContent>
      <ModalActions>
        <Button color="green" form="addForm" type="submit" inverted>
          <Icon name="checkmark" /> Valider
        </Button>
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" /> Retour
        </Button>
      </ModalActions>
    </Modal>
  );
}

export default InvitationForm;
