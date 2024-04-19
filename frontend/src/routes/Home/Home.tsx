import './Home.scss';
import React, { useEffect } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';

function Home() {
  const navigate = useNavigate();
  const { logged } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    if (logged) {
      navigate(`/user`);
    }
  }, [logged]);
  return (
    <Container text classname="homeContainer">
      <Container text classname="Container">
        <Header as="h2">PAPER RP</Header>

        <p>Bienvenue dans l&apos;antre virtuel où les légendes prennent vie!</p>
        <p>
          Qu&apos;il s&apos;agisse de livrer bataille contre d&apos;impitoyables
          dragons, de percer les mystères d&apos;anciens artefacts ou de sauver
          des royaumes entiers des ombres rampantes, chaque quête vous
          entraînera plus loin dans l&apos;aventure et plus profondément dans
          l&apos;histoire.
        </p>
        <p>
          Rejoignez nous, braves aventuriers, dans ce monde ou l'imagination n'a
          pas de limite, laissez vous emporter par les frissons de l'inconu, par
          le charme de la magie et par la camaraderie forgée au fil des
          épreuves!
        </p>
        <p>
          Que votre quête commence et que les dés soient à jamais en votre
          faveur.
        </p>
      </Container>
    </Container>
  );
}

export default Home;
