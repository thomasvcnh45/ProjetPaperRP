import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'semantic-ui-react';
import { RootState } from '../../../state/store';
import React from 'react';

type ClassesModalProps = {
  charId: number;
  onAddSpell: (charId: number, skillId: number) => void;
};

function ClassesModal({ charId, onAddSpell }: ClassesModalProps) {
  const [open, setOpen] = useState(false);
  const classes = useSelector((state: RootState) => state.globalData.classes);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={
        <Button>
          <RiAddLine size={20} />
        </Button>
      }
    >
      <ModalHeader>Sélectionner une Classe</ModalHeader>
      <ModalContent>
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Nom de la Classe</TableHeaderCell>
              <TableHeaderCell>Description de la Classe</TableHeaderCell>
              <TableHeaderCell>Apprendre la Classe</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((classe) => (
              <TableRow key={classe.id}>
                <TableCell>{classe.name}</TableCell>
                <TableCell>{classe.note}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      onAddSpell(charId, classe.id);
                      setOpen(false);
                    }}
                  >
                    <RiAddLine />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={() => setOpen(false)}>Terminé</Button>
      </ModalContent>
    </Modal>
  );
}

export default ClassesModal;
