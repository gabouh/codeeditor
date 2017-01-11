
import {
  FETCH_FOLDERS,
  FOLDER_ADD,
  FOLDER_EDIT,
  FOLDER_DELETE,
  FILE_ADD,
  FILE_EDIT,
  FILE_DELETE,
  CODE_CHANGE
} from '../constants/actionTypes';
import _ from 'lodash';

function findIndex(arr, name, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][name] == value) {
      return i;
    }
  }
  return -1;
}





export default function (state = [], action) {
  let folderIndex = 0;
  switch (action.type) {

    case FETCH_FOLDERS:
      return action.payload.data;

    case FOLDER_ADD:
      console.log(action.payload);
      return [...state, action.payload.data];

    case FOLDER_EDIT:
      console.log(action.payload);
      folderIndex = findIndex(state, 'id', action.payload.data.id);
      let find = { ...state[folderIndex], title: action.payload.data.title };
      let result = [...state.slice(0, folderIndex), find, ...state.slice(folderIndex + 1)]
      return result;

    case FOLDER_DELETE:
      return _.reject(state, function (o) { return o.id == action.payload.data.id; });

    case FILE_ADD:
      folderIndex = findIndex(state, 'id', action.payload.data.folderId);
      let newChildNodes = [...state[folderIndex].childNodes, action.payload.data.file];
      let newState = [...state]
      newState[folderIndex].childNodes = newChildNodes;
      return [...newState];

    case FILE_EDIT:
      {
        folderIndex = findIndex(state, 'id', action.payload.data.folderId);
        let fileIndex = findIndex(state[folderIndex].childNodes, 'id', action.payload.data.file.id);
        //let currentFile = { ...state[folderIndex].childNodes[fileIndex], title: action.payload.title };
        let currentFile = { ...action.payload.data.file };
        let newChildNodes = [...state[folderIndex].childNodes.slice(0, fileIndex), currentFile, ...state[folderIndex].childNodes.slice(fileIndex + 1)];
        let newState = [...state];
        newState[folderIndex].childNodes = newChildNodes;

        return newState;
      }
      break;

    case FILE_DELETE:
      {
        console.log('delete file', action.payload.data.file.id);

        folderIndex = findIndex(state, 'id', action.payload.data.folderId);
        let fileIndex = findIndex(state[folderIndex].childNodes, 'id', action.payload.data.file.id);
        let newChildNodes = [...state[folderIndex].childNodes.slice(0, fileIndex), ...state[folderIndex].childNodes.slice(fileIndex + 1)];
        let newState = [...state];
        newState[folderIndex].childNodes = newChildNodes;
        return newState;
      }
      break;

    case CODE_CHANGE:
      return onCodeChange(state, action);
      break;
    default:
      return [...state];
  }
}

function onCodeChange(state, action) {
  console.log('before code change state', state);
  let folderIndex = findIndex(state, 'id', action.payload.data.folderId);
  let fileIndex = findIndex(state[folderIndex].childNodes, 'id', action.payload.data.file.id);
  //let currentFile = { ...state[folderIndex].childNodes[fileIndex], code.value: action.payload.title };
  let currentFile = { ...action.payload.data.file };
  let newChildNodes = [...state[folderIndex].childNodes.slice(0, fileIndex), currentFile, ...state[folderIndex].childNodes.slice(fileIndex + 1)];
  let newState = [...state];
  newState[folderIndex].childNodes = [...newChildNodes];

  console.log('code change state', newState);
  return newState;
}