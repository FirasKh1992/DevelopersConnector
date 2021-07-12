import { GET_POSTS, POST_ERROR } from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function post(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        posts: payload,
        post: null,
        loading: false,
      };
    case POST_ERROR:
      return {
        error: payload,
      };
    default:
      return state;
  }
}
