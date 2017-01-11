
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


export function newFolderReceive(folder) {
    const payload = { data: folder };
    return {
        type: FOLDER_ADD,
        payload: payload
    }
}

export function editedFolderReceive(folder) {
    const payload = { data: folder };
    return {
        type: FOLDER_EDIT,
        payload: payload
    }
}

export function deletedFolderReceive(folder) {
    const payload = { data: folder };
    return {
        type: FOLDER_DELETE,
        payload: payload
    }
}

export function newFileReceive(data) {
    const payload = { data: data };
    return {
        type: FILE_ADD,
        payload: payload
    }
}

export function editedFileReceive(file) {
    const payload = { data: file };
    return {
        type: FILE_EDIT,
        payload: payload
    }
}

export function deletedFileReceive(file) {
    const payload = { data: file };
    return {
        type: FILE_DELETE,
        payload: payload
    }
}

export function codeReceive(file) {
    const payload = { data: file };
    return {
        type: CODE_CHANGE,
        payload: payload
    }
}



