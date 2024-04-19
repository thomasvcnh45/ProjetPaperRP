import { Container, Tab } from 'semantic-ui-react';
import './HomeConnected.scss';
import GMGamesList from '../../components/GamesList/GMGamesList';
import { useState } from 'react';

function HomeConnected() {
  const [gm, setGm] = useState(false);

  const handleTabChange = (index: number) => {
    setGm(index === 1);
  };

  const panes = [
    {
      menuItem: 'Joueur',

      pane: (
        <Tab.Pane key="tabpane1">
          <GMGamesList gm={false} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Maître du jeu',

      pane: (
        <Tab.Pane className="tabpane" key="tabpane2">
          <GMGamesList gm />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Container text className="TabContaineTest">
      <Tab
        className="tab  test"
        style={{ padding: 10 }}
        panes={panes}
        renderActiveOnly={false}
        onTabChange={(_, { activeIndex }) =>
          handleTabChange(activeIndex as number)
        } // Appel de handleTabChange lorsqu'un onglet est changé
      />
    </Container>
  );
}

export default HomeConnected;
