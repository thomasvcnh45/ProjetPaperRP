import React from 'react';
import { Button, Modal, ModalActions } from 'semantic-ui-react';

function CreationModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      className="Modale"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <ModalActions>Création</ModalActions>
    </Modal>
  );
}

export default CreationModal;
