
import {
  FOLDER_ADD,
  FOLDER_EDIT,
  FOLDER_DELETE,
  FILE_ADD,
  FILE_EDIT,
  FILE_DELETE,
  CODE_CHANGE
} from '../actions/action_fileTree';
import _ from 'lodash';


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function findIndex(arr, name, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][name] == value) {
      return i;
    }
  }
  return -1;
}





export default function (state = [], action) {

  let fileTemplate = {
    id: guid(),
    title: '',
    code: {
      value: 'function(){console.log("Hello")}',
      language: 'javascript'
    }
  };
  let folderTemplate = {
    id: guid(),
    title: '',
    childNodes: [fileTemplate]
  };

  let folderIndex = 0;

  if (state.length == 0)
    return [...state, folderTemplate];

  switch (action.type) {
    case FOLDER_ADD:
      return [...state, folderTemplate];
    case FOLDER_EDIT:
      folderIndex = findIndex(state, 'id', action.payload.id);
      let find = { ...state[folderIndex], title: action.payload.title };
      let result = [...state.slice(0, folderIndex), find, ...state.slice(folderIndex + 1)]
      return result;
    case FOLDER_DELETE:
      return _.reject(state, function (o) { return o.id == action.payload.id; });

    case FILE_ADD:
      folderIndex = findIndex(state, 'id', action.payload.id);
      let newChildNodes = [...state[folderIndex].childNodes, fileTemplate];
      let newState = [...state]
      newState[folderIndex].childNodes = newChildNodes;
      return [...newState];

    case FILE_EDIT:
      {
        folderIndex = findIndex(state, 'id', action.payload.folderId);
        let fileIndex = findIndex(state[folderIndex].childNodes, 'id', action.payload.file.id);
        //let currentFile = { ...state[folderIndex].childNodes[fileIndex], title: action.payload.title };
        let currentFile = { ...action.payload.file };
        let newChildNodes = [...state[folderIndex].childNodes.slice(0, fileIndex), currentFile, ...state[folderIndex].childNodes.slice(fileIndex + 1)];
        let newState = [...state];
        newState[folderIndex].childNodes = newChildNodes;

        return newState;
      }
      break;
    case FILE_DELETE:
      {
        folderIndex = findIndex(state, 'id', action.payload.folderId);
        let fileIndex = findIndex(state[folderIndex].childNodes, 'id', action.payload.file.id);
        let newChildNodes = [...state[folderIndex].childNodes.slice(0, fileIndex), ...state[folderIndex].childNodes.slice(fileIndex + 1)];
        let newState = [...state];
        newState[folderIndex].childNodes = newChildNodes;
        return newState;
      }
      break;

    case CODE_CHANGE:
      {
        console.log(Date()); 
        let folderIndex = findIndex(state, 'id', action.payload.folderId);
        let fileIndex = findIndex(state[folderIndex].childNodes, 'id', action.payload.file.id);
        //let currentFile = { ...state[folderIndex].childNodes[fileIndex], code.value: action.payload.title };
        let currentFile = { ...action.payload.file };
        let newChildNodes = [...state[folderIndex].childNodes.slice(0, fileIndex), currentFile, ...state[folderIndex].childNodes.slice(fileIndex + 1)];
        let newState = [...state];
        newState[folderIndex].childNodes = newChildNodes;

        console.log(newState);
        return newState;

      }
      break;

    default:
      return [...state];
  }
}