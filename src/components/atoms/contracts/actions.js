import { createAction } from 'redux-act';

export const setContracts = createAction('BG_ONGOING_CONTRACTS_SET');
export const setContractDetail = createAction('BG_ONGOING_CONTRACT_SET_DETAIL');

export const loadContract = (id, index = 0, contracts = null) => (dispatch) => {
  fetch(`http://localhost:3000/api/contract/${id}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  })
    .then(response => {
      return response.json();
    })
    .then((json) => {
      if (contracts) {
        dispatch(setContracts(contracts));
      }

      dispatch(setContractDetail({
        ...json,
        active_contract: index
      }));
    });
};

export const loadContracts = () => (dispatch) => {
  fetch('http://localhost:3000/api/contracts/values', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      const { 0 : firstContract } = json;

      if (firstContract && firstContract.nummer) {
        dispatch(loadContract(firstContract.nummer, 0, json));
      } else {
        console.error('There was an issue on the JSON loading the contracts array. Response:', json);
      }
    });
};
