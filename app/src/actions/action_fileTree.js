import axios from 'axios';
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
//const RootURL 

export function getAllFolder() {
    const request = axios.get('/api/folder')
    return {
        type: FETCH_FOLDERS,
        payload: request
    }
}


export function addFolder(folder) {
    const request = axios.post('/api/folder',folder)
    return {
        type: FOLDER_ADD,
        payload: request
    }
}

export function editFolder(folder) {

    const request = axios.put('/api/folder/' + folder.id,folder);

    return {
        type: FOLDER_EDIT,
        payload: request
    }
}

export function deleteFolder(folder) {
    const request = axios.delete('/api/folder/' + folder.id);
    return {
        type: FOLDER_DELETE,
        payload: request
    }
}

export function addFile(folderId,file) {
    const request = axios.post(`/api/file/${folderId}`,file);
    return {
        type: FILE_ADD,
        payload: request
    }
}

export function editFile(file) {

    const request = axios.put(`/api/file/${file.folderId}/${file.file.id}`,file.file);

    return {
        type: FILE_EDIT,
        payload: request
    }
}
export function deleteFile(file) {
    const request = axios.delete(`/api/file/${file.folderId}/${file.file.id}`,file.file);
    return {
        type: FILE_DELETE,
        payload: request
    }
}

export function codeChange(file) {
    const request = axios.put(`/api/file/${file.folderId}/${file.file.id}`,file.file);
    return {
        type: CODE_CHANGE,
        payload: request
    }
}



