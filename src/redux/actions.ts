export enum PostActions {
  ADD_POST = 'Add post',
  REMOVE_POST = 'Remove post',
  EDIT_POST = 'Edit post',
  ADD_COORD = 'Add coord',
  IMPORT_POSTS = 'Import tasks',
}

export interface Task {
  id: number;
  content: string;
  coord?: {
    lat: number;
    lng: number;
  };
  savedStyle?: string;
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

interface AddCoord {
  type: PostActions.ADD_COORD;
  payload: Task;
}

interface ImportPosts {
  type: PostActions.IMPORT_POSTS;
  payload: Task[];
}

export type PostActionsTypes = AddPost | RemovePost | EditPost | AddCoord | ImportPosts;

export const addPostAction = (id:number,content: string): PostActionsTypes => ({
  type: PostActions.ADD_POST,
  payload: {id,content},
});

export const removePostAction = (id: number): PostActionsTypes => ({
  type: PostActions.REMOVE_POST,
  payload: { id },
});

export const editPostAction = (post: Task): PostActionsTypes => ({
  type: PostActions.EDIT_POST,
  payload: post,
});

export const addCoordAction = (post: Task): PostActionsTypes => ({
  type: PostActions.ADD_COORD,
  payload: post,
});

export const importPostsAction = (posts: Task[]): PostActionsTypes => ({
  type: PostActions.IMPORT_POSTS,
  payload: posts,
});