import { call, put, takeEvery } from 'redux-saga/effects';

import API from '../services';
import { PostsActions, PostsActionTypes } from '../redux/posts';

function* fetchTasks(action) {
  const response = yield call(API.fetchPosts);

  if (response.ok) {
    yield put(PostsActions.receivePosts(response.data));
  } else {
    const { status, problem, data: { message } } = response;
    yield put(PostsActions.receivePostsFailed({ status, problem, message }));
  }
}

function* watcher() {
  yield takeEvery(PostsActionTypes.POSTS_REQUEST, fetchTasks);
}

export default {
  watcher,
};
