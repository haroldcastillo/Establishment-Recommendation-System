export const FETCH_ESTABLISHMENTS = 'FETCH_ESTABLISHMENTS';
export const FETCH_ESTABLISHMENTS_SUCCESS = 'FETCH_ESTABLISHMENTS_SUCCESS';
export const FETCH_ESTABLISHMENTS_FAILURE = 'FETCH_ESTABLISHMENTS_FAILURE';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';

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