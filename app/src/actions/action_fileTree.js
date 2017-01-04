
export const FOLDER_ADD = 'FOLDER_ADD';
export const FOLDER_EDIT = 'FOLDER_EDIT';
export const FOLDER_DELETE = 'FOLDER_DELETE';
export const FILE_ADD = 'FILE_ADD';

export function addFolder() {
    return {
        type: FOLDER_ADD
    }
}

export function editFolder(folder) {
    return {
        type: FOLDER_EDIT,
        payload: folder
    }
}

export function deleteFolder(folder) {
    return {
        type: FOLDER_DELETE,
        payload: folder
    }
}

export function addFile(folder) {
    return {
        type: FILE_ADD,
        payload: folder
    }
}