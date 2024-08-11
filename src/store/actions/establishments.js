export const FETCH_ESTABLISHMENTS = 'FETCH_ESTABLISHMENTS';
export const FETCH_ESTABLISHMENTS_SUCCESS = 'FETCH_ESTABLISHMENTS_SUCCESS';
export const FETCH_ESTABLISHMENTS_FAILURE = 'FETCH_ESTABLISHMENTS_FAILURE';

export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const SET_FILTER_VALUE = 'SET_FILTER_VALUE'; 

export const FETCH_ESTABLISHMENT = 'FETCH_ESTABLISHMENT';
export const FETCH_ESTABLISHMENT_SUCCESS = 'FETCH_ESTABLISHMENT_SUCCESS';
export const FETCH_ESTABLISHMENT_FAILURE = 'FETCH_ESTABLISHMENT_FAILURE';

export const CREATE_ESTABLISHMENT = 'CREATE_ESTABLISHMENT';
export const CREATE_ESTABLISHMENT_SUCCESS = 'CREATE_ESTABLISHMENT_SUCCESS';
export const CREATE_ESTABLISHMENT_FAILURE = 'CREATE_ESTABLISHMENT_FAILURE';

export const UPDATE_ESTABLISHMENT = 'UPDATE_ESTABLISHMENT';
export const UPDATE_ESTABLISHMENT_SUCCESS = 'UPDATE_ESTABLISHMENT_SUCCESS';
export const UPDATE_ESTABLISHMENT_FAILURE = 'UPDATE_ESTABLISHMENT_FAILURE';

export const RESET_CREATE_ESTABLISHMENT = 'RESET_ESTABLISHMENT';
export const RESET_UPDATE_ESTABLISHMENT = 'RESET_UPDATE_ESTABLISHMENT';

export const FETCH_OWNED_ESTABLISHMENTS = 'FETCH_OWNED_ESTABLISHMENTS';
export const FETCH_OWNED_ESTABLISHMENTS_SUCCESS = 'FETCH_OWNED_ESTABLISHMENTS_SUCCESS';
export const FETCH_OWNED_ESTABLISHMENTS_FAILURE = 'FETCH_OWNED_ESTABLISHMENTS_FAILURE';


export function fetchEstablishments({
  search,
  type,
  barangay,
  currentPage,
}) {
  console.warn(search, type, barangay, currentPage);
  return {
    type: FETCH_ESTABLISHMENTS,
    payload: {
      search,
      type,
      barangay,
      currentPage,
    },
  };
}

export function fetchEstablishmentsSuccess(payload) {
  return {
    type: FETCH_ESTABLISHMENTS_SUCCESS,
    payload
  };
}

export function fetchEstablishmentsFailure({ error }) {
  return {
    type: FETCH_ESTABLISHMENTS_FAILURE,
    payload: {
      error,
    },
  };
}

export const setSearchValue = (searchValue) => ({
  type: SET_SEARCH_VALUE,
  payload: searchValue,
});

export const setFilterValue = (filterValue) => ({
  type: SET_FILTER_VALUE,
  payload: filterValue,
});

export function fetchEstablishment(id) {
  return {
    type: FETCH_ESTABLISHMENT,
    payload: id,
  };
}

export function fetchEstablishmentSuccess(payload) {
  return {
    type: FETCH_ESTABLISHMENT_SUCCESS,
    payload
  };
}

export function fetchEstablishmentFailure({ error }) {
  return {
    type: FETCH_ESTABLISHMENT_FAILURE,
    payload: {
      error,
    },
  };
}

export function createEstablishment(payload) {
  return {
    type: CREATE_ESTABLISHMENT,
    payload,
  };
}

export function createEstablishmentSuccess(payload) {
  return {
    type: CREATE_ESTABLISHMENT_SUCCESS,
    payload,
  };
}

export function createEstablishmentFailure({ error }) {
  return {
    type: CREATE_ESTABLISHMENT_FAILURE,
    payload: {
      error,
    },
  };
}


export function updateEstablishment(payload) {
  return {
    type: UPDATE_ESTABLISHMENT,
    payload,
  };
}

export function updateEstablishmentSuccess(payload) {
  return {
    type: UPDATE_ESTABLISHMENT_SUCCESS,
    payload,
  };
}

export function updateEstablishmentFailure({ error }) {
  return {
    type: UPDATE_ESTABLISHMENT_FAILURE,
    payload: {
      error,
    },
  };
}

export function fetchOwnedEstablishments({ userId }) {
  console.warn("action",userId);
  return {
    type: FETCH_OWNED_ESTABLISHMENTS,
    payload: {
      userId,
    },
  };
}

export function fetchOwnedEstablishmentsSuccess(payload) {
  return {
    type: FETCH_OWNED_ESTABLISHMENTS_SUCCESS,
    payload
  };
}

export function fetchOwnedEstablishmentsFailure({ error }) {
  return {
    type: FETCH_OWNED_ESTABLISHMENTS_FAILURE,
    payload: {
      error,
    },
  };
}



