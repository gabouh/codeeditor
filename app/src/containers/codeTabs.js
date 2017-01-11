import React from 'react';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Materail-ui Components
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import { blue500, yellow600 } from 'material-ui/styles/colors';
//custom Components 
import CodeEditor from './codeEditor';
//action
import {
  getAllFolder
} from '../actions/action_fileTree'
import {
  newFileReceive,
  codeReceive,
  deletedFileReceive,
  editedFileReceive,
  newFolderReceive,
  editedFolderReceive,
  deletedFolderReceive
} from '../actions/socket_actions'
//custom Container
class CodeTabs extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.node)
      this.props.getAllFolder();

    var _this = this;
    const {socket} = this.props;

    socket.on('folder add bc', (data) => {
      console.log('folder add bc', data);
      _this.props.newFolderReceive(data);
    });

    socket.on('folder edit bc', (data) => {
      console.log('folder edit bc', data);
      _this.props.editedFolderReceive(data);
    });

    socket.on('folder delete bc', (data) => {
      console.log('folder delete bc', data);
      _this.props.deletedFolderReceive(data);
    });

    socket.on('file add bc', (data) => {
      console.log('file add bc', data);
      _this.props.newFileReceive(data);
    });

    socket.on('code edit bc', (data) => {
      console.log('Broadcast data', data);
      _this.props.codeReceive(data);
    });

    socket.on('file delete bc', (data) => {
      console.log('file deleted bc');
      _this.props.deletedFileReceive(data);
    });

    socket.on('file edit bc', (data) => {
      console.log('file edited bc');
      _this.props.editedFileReceive(data);
    });

  }

  renderFileTab(node, childnode) {
    return (<Tab key={childnode.id} label={childnode.title} style={{ 'background': 'rgb(33, 150, 243)' }}>
      <CodeEditor socket={this.props.socket} file={childnode} parentId={node.id} readOnly={this.props.readOnly ? this.props.readOnly : false} />
    </Tab>)
  }

  renderFoldertab(node) {
    let _this = this;
    let filetabs = node.childNodes.map(function (childnode, index) {
      return _this.renderFileTab(node, childnode);
    });
    return (<Tab key={node.id} label={node.title} style={{ 'background': 'rgb(253, 216, 53)' }}>
      <Tabs>
        {filetabs}
      </Tabs>
    </Tab>)
  }
  renderTab() {
    let _this = this;
    return this.props.node.map(function (node, indexRoot) {
      return _this.renderFoldertab.call(_this, node);
    });
  }

  render() {
    return (<Tabs >{this.renderTab()}</Tabs>);
  }
}

function mapStateToProps(state) {
  return {
    node: state.codeTree
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllFolder,
    newFileReceive,
    codeReceive,
    deletedFileReceive,
    editedFileReceive,
    newFolderReceive,
    editedFolderReceive,
    deletedFolderReceive
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeTabs);