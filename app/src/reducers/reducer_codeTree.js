
import {
  FETCH_FOLDERS,
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
    title: 'New file',
    code: {
      value: 'function(){console.log("Hello")}',
      language: 'javascript'
    }
  };
  let folderTemplate = {
    id: guid(),
    title: 'New folder',
    childNodes: [fileTemplate]
  };

  let folderIndex = 0;

  if (action.type == '@@redux/INIT') {
    return state;
  }

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
      console.log(action.payload);

      if (action.payload.status == 200) {
        return _.reject(state, function (o) { return o.id == action.payload.data.id; });
      }
      else {
        return state;
      }

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
        folderIndex = findIndex(state, 'id', action.payload.data.folderId);
        let fileIndex = findIndex(state[folderIndex].childNodes, 'id', action.payload.data.file.id);
        let newChildNodes = [...state[folderIndex].childNodes.slice(0, fileIndex), ...state[folderIndex].childNodes.slice(fileIndex + 1)];
        let newState = [...state];
        newState[folderIndex].childNodes = newChildNodes;
        return newState;
      }
      break;

    case CODE_CHANGE:
      {
       
        let folderIndex = findIndex(state, 'id', action.payload.data.folderId);
        let fileIndex = findIndex(state[folderIndex].childNodes, 'id', action.payload.data.file.id);
        //let currentFile = { ...state[folderIndex].childNodes[fileIndex], code.value: action.payload.title };
        let currentFile = { ...action.payload.data.file };
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