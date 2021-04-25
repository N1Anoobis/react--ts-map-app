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

interface ImportIntel {
  type: IntelActions.IMPORT_INTEL;
  payload: Record<string, unknown>[];
}

interface ResetIntel {
  type: IntelActions.RESET_INTEL;
}

export type PostActionsTypes = AddPost | RemovePost | EditPost | ImportPosts;
export type IntelActionsTypes = ImportIntel | ResetIntel;

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

export const importedIntelAction = (intel: Record<string, unknown>): IntelActionsTypes => ({
  type: IntelActions.IMPORT_INTEL,
  payload: [ intel ],
});

export const resetIntelAction = (): IntelActionsTypes => ({
  type: IntelActions.RESET_INTEL,
});

/* thunk creators */
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

export const fetchIntel = (code: string) => {
  return (dispatch: (arg0: IntelActionsTypes) => void, state: Intel[]) => {
    Axios.get(`https://restcountries.eu/rest/v2/name/${code}`)
      .then((res) => {
        console.log(res.data)
        dispatch(importedIntelAction(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
