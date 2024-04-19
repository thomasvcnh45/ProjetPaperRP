import {
  Button,
  Form,
  Grid,
  GridColumn,
  Segment,
  TextArea,
} from 'semantic-ui-react';
import './Stats.scss';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../../state/store';
import { Stat } from '../../../@types/character';
import { updateCharacterStats } from '../../../state/character/characterSlice';

type StatsProps = {
  stats: Stat[];
  note: string;
  charId: number;
  onChangeNotes: (newNote: string) => void;
};
function Stats({ stats, note: charNotes, charId, onChangeNotes }: StatsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [notes, setNotes] = useState(charNotes);

  useEffect(() => {
    setNotes(charNotes);
  }, [charNotes]);

  const handleChangeNotes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChangeNotes(notes);
  };

  const handleChangeStat = (
    event: React.ChangeEvent<HTMLInputElement>,
    statId: number
  ) => {
    const newValue = parseInt(event.target.value, 10);
    dispatch(updateCharacterStats({ charId, statId, value: newValue }));
  };
  const sortedStats = [...stats].sort((a, b) => a.id - b.id);
  return (
    <Grid stackable>
      <GridColumn width={16} mobile={16} tablet={8} computer={4}>
        <Segment className="stat">
          {sortedStats.map((stat) => (
            <Segment className="stat-name" key={stat.id}>
              {stat.name}
              <input
                className="stat-value"
                value={stat.value}
                onChange={(e) => handleChangeStat(e, stat.id)}
              />
            </Segment>
          ))}
        </Segment>
      </GridColumn>
      <GridColumn width={16} mobile={16} tablet={8} computer={12}>
        <Segment>
          <Form onSubmit={handleSubmit}>
            Attaques et Incantations
            <TextArea
              rows={10}
              value={notes}
              placeholder="Renseignez vos notes ici"
              onChange={handleChangeNotes}
            />
            <Button type="submit" style={{ marginTop: '20px' }}>
              Enregistrer
            </Button>
          </Form>
        </Segment>
      </GridColumn>
    </Grid>
  );
}

export default Stats;
