const initialState = {
    currentArtist: null,
    status: "loading",
  };
  
  export default function artistReducer(state = initialState, action) {


    console.log("inside reducer action", action);
    
    switch (action.type) {

      case 'REQUEST_ARTIST_PROFILE': {
        return {
          ...state,
          status: 'loading',
        };
      }
      case 'RECEIVE_ARTIST_PROFILE': {
        return {
          ...state,
          currentArtist : action.profile,
          status: 'idle',
        };
      }    
      case 'RECEIVE_ARTIST_PROFILE_ERROR': {
        return {
          ...state,
          status: 'error',
        };
      }        
      default: {
        return state;
      }
    }
  }