import axios from 'axios';

export const FETCH_FOLDERS = 'FETCH_FOLDERS';
export const FOLDER_ADD = 'FOLDER_ADD';
export const FOLDER_EDIT = 'FOLDER_EDIT';
export const FOLDER_DELETE = 'FOLDER_DELETE';
export const FILE_ADD = 'FILE_ADD';
export const FILE_EDIT = 'FILE_EDIT';
export const FILE_DELETE = 'FILE_DELETE';
export const CODE_CHANGE = 'CODE_CHANGE';

//const RootURL 

export function getAllFolder() {
    const request = axios.get('/api/folder')
    return {
        type: FETCH_FOLDERS,
        payload: request
    }
}


export function addFolder() {
    const request = axios.post('/api/folder')
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

export function addFile(folderId) {
    const request = axios.post(`/api/file/${folderId}`);
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



