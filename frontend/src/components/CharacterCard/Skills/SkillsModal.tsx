import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
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
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

type SkillsModalProps = {
  charId: number;
  onAddSkill: (charId: number, skillId: number) => void;
};

function SkillsModal({ charId, onAddSkill }: SkillsModalProps) {
  const [open, setOpen] = useState(false);
  const skills = useSelector((state: RootState) => state.globalData.skills);
  // const dispatch = useDispatch<AppDispatch>();
  // const handleCloseModalAndUpdate = () => {
  //   setOpen(false);
  //   dispatch(fetchCharacterData(charId.toString()));
  // };

  return (
    <Modal
      onClose={() => setOpen(false)}
      // onClose={() => handleCloseModalAndUpdate()}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={
        <Button>
          <RiAddLine size={20} />
        </Button>
      }
    >
      <ModalHeader>Sélectionner compétences</ModalHeader>
      <ModalContent>
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Nom de la compétence</TableHeaderCell>
              <TableHeaderCell>Description de la compétence</TableHeaderCell>
              <TableHeaderCell>Type de compétence</TableHeaderCell>
              <TableHeaderCell>Apprendre la compétence</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.note}</TableCell>
                <TableCell>{skill.is_active ? 'Active' : 'Passive'}</TableCell>
                <TableCell>
                  <Button onClick={() => onAddSkill(charId, skill.id)}>
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

export default SkillsModal;
