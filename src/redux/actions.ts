import Axios from 'axios';

export enum PostActions {
  ADD_POST = 'Add post',
  REMOVE_POST = 'Remove post',
  EDIT_POST = 'Edit post',
  ADD_COORD = 'Add coord',
  IMPORT_POSTS = 'Import tasks',
}

export enum IntelActions {
  IMPORT_INTEL = 'Import intel',
  RESET_INTEL = 'Remove intel',
}

export enum CurrenciesActions {
  IMPORT_CURRENCIES = 'Import currencies',
  FETCH_COIN = 'Fetch coin',
}

export interface Intel {
  id?: number;
  flag?: string;
  subregion?: string;
  name?: string;
  capital?: string;
  nativeName?: string;
}

export interface Task {
  id: number;
  content: string;
  coord?: Coord;
  savedStyle?: string;
}

export interface Coord {
  lat: number;
  lng: number;
}

export interface Currencies {
  code: string;
  currency?: string;
  mid: number;
}

/*Post*/
interface AddPost {
  type: PostActions.ADD_POST;
  payload: Task;
}

interface RemovePost {
  type: PostActions.REMOVE_POST;
  payload: { id: number };
}

interface EditPost {
  type: PostActions.EDIT_POST;
  payload: Task;
}

interface ImportPosts {
  type: PostActions.IMPORT_POSTS;
  payload: Task[];
}

/*Intel*/
interface ImportIntel {
  type: IntelActions.IMPORT_INTEL;
  payload: Record<string, unknown>[];
}

interface ResetIntel {
  type: IntelActions.RESET_INTEL;
}

/*Currencies*/
interface ImportCurrencies {
  type: CurrenciesActions.IMPORT_CURRENCIES;
  payload: Currencies[];
}

interface FetchCoin {
  type: CurrenciesActions.FETCH_COIN;
  payload: Currencies[];
}

export type PostActionsTypes = AddPost | RemovePost | EditPost | ImportPosts;
export type IntelActionsTypes = ImportIntel | ResetIntel;
export type CurrenciesActionsTypes = ImportCurrencies | FetchCoin;

/*Post*/
export const addPostAction = (id: number, content: string): PostActionsTypes => ({
  type: PostActions.ADD_POST,
  payload: { id, content },
});

export const removePostAction = (id: number): PostActionsTypes => ({
  type: PostActions.REMOVE_POST,
  payload: { id },
});

export const editPostAction = (post: Task): PostActionsTypes => ({
  type: PostActions.EDIT_POST,
  payload: post,
});

export const importedPostsAction = (posts: Task[]): PostActionsTypes => ({
  type: PostActions.IMPORT_POSTS,
  payload: posts,
});

/*Intel*/
export const importedIntelAction = (intel: Record<string, unknown>): IntelActionsTypes => ({
  type: IntelActions.IMPORT_INTEL,
  payload: [ intel ],
});

export const resetIntelAction = (): IntelActionsTypes => ({
  type: IntelActions.RESET_INTEL,
});

/*Currencies*/
export const importedCurrenciesAction = (currencies: Currencies[]): CurrenciesActionsTypes => ({
  type: CurrenciesActions.IMPORT_CURRENCIES,
  payload: currencies,
});

export const fetchSingleCoinAction = (coin: Currencies[]): CurrenciesActionsTypes => ({
  type: CurrenciesActions.FETCH_COIN,
  payload: coin,
});


/* thunk creators */

/*Post*/
export const fetchPosts = () => {
  return (dispatch: (arg0: PostActionsTypes) => void, state: Task[]) => {
    Axios.get(`http://localhost:3000/posts`)
      .then((res) => {
        dispatch(importedPostsAction(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removePost = (id: number) => {
  return (dispatch: (arg0: PostActionsTypes) => void, state: Task[]) => {
    Axios.delete(`http://localhost:3000/posts/${id}`);
    dispatch(removePostAction(id));
  };
};

export const addPost = (id: number, content: string) => {
  return (dispatch: (arg0: PostActionsTypes) => void, state: Task[]) => {
    Axios.post(`http://localhost:3000/posts/`, {
      id,
      content,
    });
    dispatch(addPostAction(id, content));
  };
};

export const addCoord = (id: number, content: string, coord: Coord) => {
  return (dispatch: (arg0: PostActionsTypes) => void, state: Task[]) => {
    Axios.put(`http://localhost:3000/posts/${id}`, {
      id,
      content,
      coord,
    });
    dispatch(editPostAction({ id, content, coord }));
  };
};

/*Intel*/
export const fetchIntel = (code: string) => {
  return (dispatch: (arg0: IntelActionsTypes) => void, state: Intel[]) => {
    Axios.get(`https://restcountries.eu/rest/v2/name/${code}`)
      .then((res) => {
        dispatch(importedIntelAction(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/*Currencies*/
export const fetchCurrencies = () => {
  return (dispatch: (arg0: CurrenciesActionsTypes) => void, state: Currencies[]) => {
    Axios.get("http://api.nbp.pl/api/exchangerates/tables/a/")
      .then(res => {
        dispatch(importedCurrenciesAction(res.data[0].rates));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchSingleCoin =(code: string)=> {
  return (dispatch: (arg0: CurrenciesActionsTypes) => void, state: Currencies[]) => {
    Axios.get(
      `http://api.nbp.pl/api/exchangerates/rates/a/${code}/last/20/?format=json`,
    )
      .then((res) => {
        dispatch(fetchSingleCoinAction(res.data.rates));
      })
      .catch((error) => {
        console.log(error);
      });
    }
}