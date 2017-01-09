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

class CodeTabs extends React.Component {

  constructor(props) {
    super(props);
     if (this.props.node)
            this.props.getAllFolder();
  }

  renderFileTab(node, childnode) {
    return (<Tab key={childnode.id} label={childnode.title} style={{ 'background': 'rgb(33, 150, 243)' }}>
      <CodeEditor file={childnode} parentId={node.id} readOnly={this.props.readOnly?this.props.readOnly:false}/>
    </Tab>)
  }

  renderFoldertab(node) {
    let _this = this;

    let filetabs = node.childNodes.map(function (childnode, index) {
      return _this.renderFileTab(node, childnode);
    })

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
        getAllFolder
    }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(CodeTabs);