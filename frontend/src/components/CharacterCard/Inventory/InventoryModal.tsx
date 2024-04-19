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

type InventoryModalProps = {
  charId: number;
  onAddItem: (charId: number, itemId: number) => void;
};

function InventoryModal({ charId, onAddItem }: InventoryModalProps) {
  const [open, setOpen] = useState(false);
  const items = useSelector((state: RootState) => state.globalData.items);

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
      <ModalHeader>Sélectionner équipement</ModalHeader>
      <ModalContent>
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Nom de l&apos;objet</TableHeaderCell>
              <TableHeaderCell>Description de l&apos;objet</TableHeaderCell>
              <TableHeaderCell>Mettre l&apos;objet dans le sac</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.note}</TableCell>
                <TableCell>
                  <Button onClick={() => onAddItem(charId, item.id)}>
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

export default InventoryModal;
