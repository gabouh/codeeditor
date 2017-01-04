import React from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    addFolder,
    editFolder,
    deleteFolder,
    addFile
} from '../actions/action_fileTree'

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
        'maxHeight': '80%'
    }
}


const newFileTemplate = {
    title: '',
    id: 1,
    code: {
        language: 'javascript',
        value: '//Code'
    }
}

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
        this.props.addFolder();
        this.setState((prevState) => {
            return { ...prevState, snackbarMsg: 'New Folder added', snackbaropen: true }
        });

        setTimeout(function () {
            var element = document.getElementById("lastFolder");
            element.scrollIntoView();
        }, 0);
    }

    handleEditFolder(id, name) {
        this.props.editFolder({ id: id, title: name });
    }

    handleDeleteFolder(folder) {
        this.props.deleteFolder(folder);
    }

    //Files

    // Add More File Click Event 
    handleAddFile(event, folder) {

        this.props.addFile(folder)
        // var currentNode = this.props.node;
        // var id = 1;
        // if (currentNode) {
        //     var currentFolderChilds = currentNode[folderIndex].childNodes;
        //     if (currentFolderChilds.length > 0)
        //         id = currentFolderChilds[currentFolderChilds.length - 1].id + 1;
        // }
        // var childNode = { ...newFileTemplate, id: id }
        // var childNodes = [...currentNode[folderIndex].childNodes, childNode];
        // var newState = currentNode.slice();

        // newState[folderIndex].childNodes = childNodes;

        this.setState((prevState) => {
            return { ...prevState, snackbarMsg: 'New file added', snackbaropen: true }
        });

    }

    //handle File name Edit
    OnEditFileName(folderIndex, fileIndex, filename) {
        var currentNode = this.props.node;
        var currentFile = currentNode[folderIndex].childNodes[fileIndex];

        var childNode = { ...currentFile, title: filename };
        var childNodes = [...currentNode[folderIndex].childNodes.slice(0, fileIndex), childNode, ...currentNode[folderIndex].childNodes.slice(fileIndex + 1)];

        var newState = currentNode.slice();

        newState[folderIndex].childNodes = childNodes;

        //   if(this.props.onChange)
        //       this.props.onChange(newState,folderIndex,childNodes.length-1);

    }



    // handle file delete  
    onFileDelete(folderIndex, fileIndex) {

        var currentNode = this.props.node;

        var childNodes = [...currentNode[folderIndex].childNodes.slice(0, fileIndex), ...currentNode[folderIndex].childNodes.slice(fileIndex + 1)];

        var newState = currentNode.slice();

        newState[folderIndex].childNodes = childNodes;

        //   if(this.props.onChange)
        //       this.props.onChange(newState,folderIndex,childNodes.length-1); 
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




    render() {
        var childNodes = [];
        var classObj;

        var _this = this;


        var OnEditFileName = this.OnEditFileName;


        console.log("REnder", this.props.node)
        var folder = [];

        if (this.props.node) {
            folder = this.props.node.map(function (node, indexRoot) {

                console.log("div Id ", node.id);
                if (node.childNodes != null) {
                    childNodes = node.childNodes.map(function (childnode, index) {

                        return (<ListItem leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                            rightIconButton={<IconButton onClick={() => { _this.onFileDelete(indexRoot, index) } }  ><ActionDelete color={grey400} /></IconButton>}
                            innerDivStyle={styles.listItem}
                            key={childnode.id} >
                            <TextField
                                defaultValue={childnode.title}
                                style={styles.listTextBox}
                                hintText="Enter file name"
                                onBlur={(e) => { _this.OnEditFileName(indexRoot, index, e.target.value) } } />
                        </ListItem>)
                    });
                }


                return (<div key={"div_" + node.id}>
                    <List>

                        <ListItem
                            leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={yellow600} />}
                            rightIconButton={<IconButton onClick={() => { _this.handleDeleteFolder(node) } }  ><ActionDelete color={grey400} /></IconButton>}
                            key={node.id}
                            innerDivStyle={styles.listItem}
                            >
                            <TextField
                                defaultValue={node.title}
                                style={styles.listTextBox}
                                hintText="Enter folder name"
                                onBlur={(e) => { _this.handleEditFolder(node.id, e.target.value) } }
                                />
                        </ListItem>
                        {childNodes}
                        <ListItem key={"add" + node.id}
                            primaryText="Add More File"
                            rightIcon={<ContentAdd />}
                            onClick={(event) => _this.handleAddFile(event, node)} />
                    </List>
                    <Divider inset={true} />
                </div>)
            });
        }
        return (<div>
            <div style={styles.fileTree}>
                {folder}
                <div id="lastFolder"></div>
            </div>
            <RaisedButton label="New Folder" secondary={true} style={styles.addFolder} onClick={_this.handleNewFolder} />
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
        addFile
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeNode);