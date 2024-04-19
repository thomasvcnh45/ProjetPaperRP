import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './routes/App/App';
import CharacterInfo from './routes/CharacterInfo/CharacterInfo';
import HomeConnected from './routes/Home/HomeConnected';
import Home from './routes/Home/Home';
import GameDetails from './routes/GameDetails/GameDetails';
import { store } from './state/store';

// eslint-disable-next-line import/prefer-default-export
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <Error />,
    // loader: appLoader,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/user',
        element: <HomeConnected />,
      },
      {
        path: '/gameDetails',
        element: <GameDetails />,
      },
      {
        path: '/character',
        element: (
          <Provider store={store}>
            <CharacterInfo />
          </Provider>
        ),
      },
    ],
  },
]);
