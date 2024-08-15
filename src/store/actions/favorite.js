export const FETCH_FAVORITE_ESTABLISHMENTS = 'FETCH_FAVORITE_ESTABLISHMENTS';
export const FETCH_FAVORITE_ESTABLISHMENTS_SUCCESS = 'FETCH_FAVORITE_ESTABLISHMENTS_SUCCESS';
export const FETCH_FAVORITE_ESTABLISHMENTS_FAILURE = 'FETCH_FAVORITE_ESTABLISHMENTS_FAILURE';

export const FETCH_FAVORITE_USERS = 'FETCH_FAVORITE_USERS';
export const FETCH_FAVORITE_USERS_SUCCESS = 'FETCH_FAVORITE_USERS_SUCCESS';
export const FETCH_FAVORITE_USERS_FAILURE = 'FETCH_FAVORITE_USERS_FAILURE';

export const ADD_FAVORITE = 'ADD_FAVORITE';
export const ADD_FAVORITE_SUCCESS = 'ADD_FAVORITE_SUCCESS';
export const ADD_FAVORITE_FAILURE = 'ADD_FAVORITE_FAILURE';

export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const REMOVE_FAVORITE_SUCCESS = 'REMOVE_FAVORITE_SUCCESS';
export const REMOVE_FAVORITE_FAILURE = 'REMOVE_FAVORITE_FAILURE';

export const FETCH_MY_FAVORITES = 'FETCH_MY_FAVORITES';
export const FETCH_MY_FAVORITES_SUCCESS = 'FETCH_MY_FAVORITES_SUCCESS';
export const FETCH_MY_FAVORITES_FAILURE = 'FETCH_MY_FAVORITES_FAILURE';


export function fetchFavoriteEstablishments() {
  return {
    type: FETCH_FAVORITE_ESTABLISHMENTS,
  };
}

export function fetchFavoriteEstablishmentsSuccess(payload) {
  return {
    type: FETCH_FAVORITE_ESTABLISHMENTS_SUCCESS,
    payload
  };
}

export function fetchFavoriteEstablishmentsFailure({ error }) {
  return {
    type: FETCH_FAVORITE_ESTABLISHMENTS_FAILURE,
    payload: {
      error,
    },
  };
}


export function fetchFavoriteUsers({ userId }) {
  return {
    type: FETCH_FAVORITE_USERS,
    payload: {
      userId,
    },
  };
}

export function fetchFavoriteUsersSuccess(payload) {
  return {
    type: FETCH_FAVORITE_USERS_SUCCESS,
    payload
  };
}

export function fetchFavoriteUsersFailure({ error }) {
  return {
    type: FETCH_FAVORITE_USERS_FAILURE,
    payload: {
      error,
    },
  };
}


export function addFavorite({ userId, establishmentId,type }) {
  return {
    type: ADD_FAVORITE,
    payload :{
      userId,
      establishmentId,
      type
    }
  };
}

export function addFavoriteSuccess(payload) {
  return {
    type: ADD_FAVORITE_SUCCESS,
    payload
  };
}

export function addFavoriteFailure({ error }) {
  return {
    type: ADD_FAVORITE_FAILURE,
    payload: {
      error,
    },
  };
}


export function removeFavorite(payload) {
  return {
    type: REMOVE_FAVORITE,
    payload
  };
}

export function removeFavoriteSuccess(payload) {
  return {
    type: REMOVE_FAVORITE_SUCCESS,
    payload
  };
}


export function removeFavoriteFailure({ error }) {
  return {
    type: REMOVE_FAVORITE_FAILURE,
    payload: {
      error,
    },
  };
}


export function fetchMyFavorites({ userId }) {
  return {
    type: FETCH_MY_FAVORITES,
    payload: {
      userId,
    },
  };
}

export function fetchMyFavoritesSuccess(payload) {
  return {
    type: FETCH_MY_FAVORITES_SUCCESS,
    payload
  };
}

export function fetchMyFavoritesFailure({ error }) {
  return {
    type: FETCH_MY_FAVORITES_FAILURE,
    payload: {
      error,
    },
  };
}
