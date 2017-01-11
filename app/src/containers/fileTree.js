import React from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Material Components
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ContentAdd from 'material-ui/svg-icons/content/add-circle';
import EditorEdit from 'material-ui/svg-icons/editor/mode-edit';
import { blue500, yellow600, grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';

//action
import {
    addFolder,
    editFolder,
    deleteFolder,
    addFile,
    editFile,
    deleteFile
} from '../actions/action_fileTree';


//styles
const styles = {
    addFolder: {
        'marginTop': '5px',
        width: '100%'
    },
    listTextBox: {
        width: 'inherit'
    },
    listItem: {
        paddingTop: '5px',
        'paddingBottom': '5px'
    },
    fileTree: {
        overflowY: 'scroll',
        'height': '500px'
    }
}
//Helperfunction 
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

//file and folder template
function getFileTemplate() {
    let fileTemplate = {
        id: guid(),
        title: 'New file',
        code: {
            value: 'function(){console.log("Hello")}',
            language: 'javascript'
        }
    };
    return fileTemplate;
}
function getFolderTemplate() {
    let folderTemplate = {
        id: guid(),
        title: 'New folder',
        childNodes: [getFileTemplate()]
    };
    return folderTemplate;
}

//Custom Cointainer
class TreeNode extends React.Component {
    constructor(props) {
        super(props);

        //state
        this.state = {
            snackbaropen: false,
            snackbarMsg: ''
        };

        //Folder
        this.handleNewFolder = this.handleNewFolder.bind(this);
        this.handleEditFolder = this.handleEditFolder.bind(this);
        this.handleDeleteFolder = this.handleDeleteFolder.bind(this);

        //File
        this.handleAddFile = this.handleAddFile.bind(this);
        this.OnEditFileName = this.OnEditFileName.bind(this);
        this.onFileDelete = this.onFileDelete.bind(this);

        //Snackbar
        this.handleSnackbarCloseTouchTap = this.handleSnackbarCloseTouchTap.bind(this);
        this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
    }

    //folder methods
    handleNewFolder() {
        let folderTemplate = getFolderTemplate();
        const {socket, addFolder} = this.props;
        socket.emit('folder add', folderTemplate);
        addFolder(folderTemplate);

        this.setState((prevState) => {
            return { ...prevState, snackbarMsg: 'New Folder added', snackbaropen: true }
        });

        setTimeout(function () {
            var element = document.getElementById("lastFolder");
            element.scrollIntoView();
        }, 0);
    }

    handleEditFolder(folder, name) {
        var payload = {};
        payload = { ...folder, title: name };
        const {socket, editFolder} = this.props;
        socket.emit('folder edit', payload);
        editFolder({ id: folder.id, title: name });
    }

    handleDeleteFolder(folder) {
        const {socket, deleteFolder} = this.props;
        socket.emit('folder delete', folder);
        deleteFolder(folder);
    }

    //Files

    // Add More File Click Event 
    handleAddFile(event, folder) {
        let fileTemplate = getFileTemplate();
        const {socket, addFile} = this.props;
        let payload = { folderId: folder.id, file: fileTemplate };
        socket.emit('file add', payload);
        addFile(folder.id, fileTemplate);
        this.setState((prevState) => {
            return { ...prevState, snackbarMsg: 'New file added', snackbaropen: true }
        });
    }

    //handle File name Edit
    OnEditFileName(folderId, file, filename) {
        var payload = {};
        payload.file = { ...file, title: filename };
        payload.folderId = folderId;
        const {socket, editFile} = this.props;
        socket.emit('file edit', payload);
        editFile(payload);
    }

    // handle file delete  
    onFileDelete(folderId, file) {
        var payload = {};
        payload.file = { ...file };
        payload.folderId = folderId;
        const {socket, deleteFile} = this.props;
        socket.emit('file delete', payload);
        deleteFile(payload);
    }

    //Snackbar methods
    handleSnackbarCloseTouchTap() {
        this.setState((prevState) => {
            return { ...prevState, snackbaropen: false }
        });
    }

    handleSnackbarRequestClose() {
        this.setState((prevState) => {
            return { ...prevState, snackbaropen: false }
        });
    }

    // Render Helper
    renderFileListItem(node, childnode) {
        return (<ListItem leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
            rightIconButton={
                <IconButton onClick={() => { this.onFileDelete(node.id, childnode) } }  >
                    <ActionDelete color={grey400} /></IconButton>}
            innerDivStyle={styles.listItem}
            key={childnode.id} >
            {this.renderFileTextBox(node, childnode)}
        </ListItem>)
    }

    renderFileTextBox(node, childnode) {
        // let _this = context;
        return (<TextField
            defaultValue={childnode.title}
            style={styles.listTextBox}
            hintText="Enter file name"
            onBlur={(e) => { this.OnEditFileName(node.id, childnode, e.target.value) } } />

        );
    }

    renderFolderTextBox(node) {
        return (<TextField
            defaultValue={node.title}
            style={styles.listTextBox}
            hintText="Enter folder name"
            onBlur={(e) => { this.handleEditFolder(node, e.target.value) } }
            />)
    }

    renderFolderListItem(node) {
        return (<ListItem
            leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={yellow600} />}
            rightIconButton={<IconButton onClick={() => { this.handleDeleteFolder(node) } }  >
                <ActionDelete color={grey400} /></IconButton>}
            key={node.id}
            innerDivStyle={styles.listItem}
            >
            {this.renderFolderTextBox(node)}
        </ListItem>);
    }

    renderAddMoreFileListItem(node) {
        return (<ListItem key={"add" + node.id}
            primaryText="Add More File"
            rightIcon={<ContentAdd />}
            onClick={(event) => this.handleAddFile(event, node)} />);
    }

    renderListTree() {
        let _this = this;
        return (this.props.node.map(function (node, indexRoot) {

            let fileListItem = node.childNodes.map(function (childnode, index) {
                return _this.renderFileListItem.call(_this, node, childnode);
            })

            return (<div key={"div_" + node.id}>
                <List>
                    {_this.renderFolderListItem.call(_this, node)}
                    {fileListItem}
                    {_this.renderAddMoreFileListItem.call(_this, node)}
                </List>
                <Divider inset={true} />
            </div>)
        }));
    }

    render() {
        return (<div>
            <RaisedButton label="New Folder" secondary={true} style={styles.addFolder} onClick={this.handleNewFolder} />
            <div style={styles.fileTree}>
                {this.renderListTree()}
                <div id="lastFolder"></div>
            </div>
            <Snackbar
                open={this.state.snackbaropen}
                message={this.state.snackbarMsg}
                autoHideDuration={3000}
                action="close"
                onActionTouchTap={this.handleSnackbarCloseTouchTap}
                onRequestClose={this.handleSnackbarRequestClose}
                />
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        node: state.codeTree
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addFolder,
        editFolder,
        deleteFolder,
        addFile,
        editFile,
        deleteFile
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeNode);