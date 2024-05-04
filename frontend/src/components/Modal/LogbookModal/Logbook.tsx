import React from 'react';
import {
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  TextArea,
  Form,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserData, saveUserData } from '../../../store/actions/logBook';

import './Logbook.scss';
import { RootState } from '../../../store';

function LogbookModal() {
  const [open, setOpen] = React.useState(false);
  const [text1, setText1] = React.useState('');
  const [text2, setText2] = React.useState('');
  const dispatch = useDispatch();
  const { id } = useSelector((store: RootState) => store.user);
  const userId = id;
  React.useEffect(() => {
    dispatch(loadUserData(userId));
  }, [dispatch, userId]);

  const handleSave = () => {
    dispatch(saveUserData(userId, text1));
    setOpen(false);
  };

  return (
    <Modal
      className="Modale"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>Journal d aventure</Button>}
    >
      <ModalContent image scrolling>
        <ModalDescription>
          <p>Les notes sont précieuses</p>
          <div>
            <Form>
              <TextArea
                placeholder="Aujourd'hui j'ai tué une douzaine de dragons"
                style={{ minHeight: 50 }}
                value={text1}
                onChange={(e) => setText1(e.target.value)}
              />
              <TextArea
                placeholder="Quelle incroyable séance ! j'ai gagné 15 niveaux"
                style={{ minHeight: 50 }}
                value={text2}
                onChange={(e) => setText2(e.target.value)}
              />
            </Form>
          </div>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button onClick={() => setOpen(false)} primary>
          Retour
        </Button>
        <Button onClick={handleSave} primary>
          Enregistrer
        </Button>
      </ModalActions>
    </Modal>
  );
}

export default LogbookModal;
