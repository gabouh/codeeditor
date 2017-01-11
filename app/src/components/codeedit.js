import React from 'react';
//Custom Components
import TreeNode from '../containers/fileTree'
import CodeTabs from '../containers/codeTabs'

import io from 'socket.io-client';
const socket = io('', { path: '/api/codeeditor' });

class CodeEdit extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // const { socket, user, dispatch } = this.props;
    socket.emit('coder mounted', 'Helo World');
     socket.on('receive socket', msg =>
       // dispatch(actions.receiveRawMessage(msg))
       console.log('receive socket')
    );
    // socket.on('typing bc', user =>
    //     dispatch(actions.typing(user))
    // );
    // socket.on('stop typing bc', user =>
    //     dispatch(actions.stopTyping(user))
    // );
    // socket.on('new channel', channel =>
    //     dispatch(actions.receiveRawChannel(channel))
    // );
    // socket.on('receive socket', socketID =>
    //     dispatch(authActions.receiveSocket(socketID))
    // );
    // socket.on('receive private channel', channel =>
    //     dispatch(actions.receiveRawChannel(channel))
    // );
  }

  render() {
    console.log('socket',socket);
    return (<div className="row">
      <div className="col-md-3">
        <TreeNode socket={socket} />

      </div>
      <div className="col-md-9">
        <CodeTabs socket={socket} />
      </div>
    </div>);
  }
};

export default CodeEdit;

