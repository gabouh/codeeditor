import React from 'react';

//Material Components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { blue500, yellow600 } from 'material-ui/styles/colors';

//Custom Components
import TreeNode from '../containers/fileTree'
import CodeTabs from '../containers/codeTabs'
import AppBarIcon from './appBar';


export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBarIcon/>
          {this.props.children}
        </div>
      </MuiThemeProvider>);
  }

}

