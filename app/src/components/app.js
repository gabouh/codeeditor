import React from 'react';
import ReactDOM from 'react-dom';



//Material Components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { blue500, yellow600 } from 'material-ui/styles/colors';

//Custom Components
import TreeNode from '../containers/fileTree'
import CodeTabs from '../containers/codeTabs'
import AppBarExampleIcon from './appBar';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBarExampleIcon />
          <div className="row">
            <div className="col-md-3">
              <TreeNode />

            </div>
            <div className="col-md-9">
              <CodeTabs />
            </div>
          </div>

        </div>
      </MuiThemeProvider>);
  }

}

  // <CodeTabs node={this.state.node} 
  //                   initialSelectedFolderIndex={this.state.folderIndex} 
  //                   initialSelectedFileIndex={this.state.fileIndex}
  //                   onChange= {this.onNodeChange}
  //                   /> 