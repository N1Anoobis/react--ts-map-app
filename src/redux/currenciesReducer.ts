import { Currencies, CurrenciesActions, CurrenciesActionsTypes } from './actions';

export const currenciesReducer = (
  state: Currencies[] = [],
  action: CurrenciesActionsTypes,
): Currencies[] => {
  switch (action.type) {
    case CurrenciesActions.IMPORT_CURRENCIES:
      return action.payload;
    // case CurrenciesActions.RESET_INTEL:
    //   return (state = []);
    default:
      return state;
      break;
  }
};
