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

type SpellsModalProps = {
  charId: number;
  onAddSpell: (charId: number, skillId: number) => void;
};

function SpellsModal({ charId, onAddSpell }: SpellsModalProps) {
  const [open, setOpen] = useState(false);
  const spells = useSelector((state: RootState) => state.globalData.spells);

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
      <ModalHeader>Sélectionner sorts</ModalHeader>
      <ModalContent>
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Nom du sort</TableHeaderCell>
              <TableHeaderCell>Description du sort</TableHeaderCell>
              <TableHeaderCell>Apprendre le sort</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {spells.map((spell) => (
              <TableRow key={spell.id}>
                <TableCell>{spell.name}</TableCell>
                <TableCell>{spell.note}</TableCell>
                <TableCell>
                  <Button onClick={() => onAddSpell(charId, spell.id)}>
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

export default SpellsModal;
