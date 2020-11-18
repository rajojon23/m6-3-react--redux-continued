import React from 'react';
import { BrowserRouter as Router,
   Switch,
   Route,
   Redirect,

} from 'react-router-dom';
import GlobalStyles from "../../GlobalStyles";

import ArtistRoute from "../ArtistRoute";



import { useDispatch } from 'react-redux';
import { requestAccessToken , receiveAccessToken , receiveAccessTokenError } from '../../actions';


const DEFAULT_ARTIST_ID = '6cEuCEZu7PAE9ZSzLLc2oQ';
const App = () => {
  const dispatch = useDispatch();



  React.useEffect(() => {

    dispatch(requestAccessToken());
    
    fetch("/spotify_access_token")
    .then((res) => res.json())
    .then((json) => {
      // console.log("received data", json);
      dispatch(receiveAccessToken(json.access_token));

    })
    .catch((err) => {
      // console.error(err);
      dispatch(receiveAccessTokenError());
    });


  }, []);





  return (
  <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to= {`/artist/${DEFAULT_ARTIST_ID}`} />
            </Route>
            <Route exact path="/artist/:id">
              <ArtistRoute />
            </Route>
          </Switch>
    <GlobalStyles />
  </Router>);

};

export default App;
