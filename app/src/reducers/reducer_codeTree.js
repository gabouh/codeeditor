
import {
  FOLDER_ADD,
  FOLDER_EDIT,
  FOLDER_DELETE,
  FILE_ADD
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

  let index = 0;

  if (state.length == 0)
    return [...state, folderTemplate];

  switch (action.type) {
    case FOLDER_ADD:
      return [...state, folderTemplate];
    case FOLDER_EDIT:
      index = findIndex(state, 'id', action.payload.id);
      let find = { ...state[index], title: action.payload.title };
      let result = [...state.slice(0, index), find, ...state.slice(index + 1)]
      return result;
    case FOLDER_DELETE:
      return _.reject(state, function (o) { return o.id == action.payload.id; });

    case FILE_ADD:
      index = findIndex(state, 'id', action.payload.id);
      let newChildeNodes = [...state[index].childNodes, fileTemplate];
      let newState = [...state]
      newState[index].childNodes = newChildeNodes;
      return [...newState];

    default:
      return [...state];
  }
}