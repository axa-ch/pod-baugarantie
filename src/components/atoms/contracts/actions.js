import { createAction } from 'redux-act';

export const setContracts = createAction('BG_ONGOING_CONTRACTS_SET');
export const setContractDetail = createAction('BG_ONGOING_CONTRACT_SET_DETAIL');

export const loadContract = (id, index = 0, contracts = null) => (dispatch, getState) => {
  const {
    config: { config: { apiUrl } },
    authentication: { at },
    contracts: { contracts: _contracts }
  } = getState();

  fetch(`${apiUrl}/api/contract/${id}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'authorization': at
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  })
    .then(response => {
      return response.json();
    })
    .then((json) => {
      let usedContracts = contracts;
      if (usedContracts) {
        dispatch(setContracts(usedContracts));
      } else {
        usedContracts = _contracts;
      }

      dispatch(setContractDetail({
        ...json,
        active_contract: usedContracts[index].nummer,
        active_index: index
      }));
    });
};

export const loadContracts = () => (dispatch, getState) => {
  const {
    config: { config: { apiUrl } },
    authentication: { at },
  } = getState();
  fetch(`${apiUrl}/api/contracts/values`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'authorization': at
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
