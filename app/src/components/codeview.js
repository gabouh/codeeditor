import React from 'react';

import io from 'socket.io-client';
const socket = io('', { path: '/api/codeeditor' });

//Custom Components
import CodeTabs from '../containers/codeTabs'

const CodeView = () => (

  <div className="row">
    <div className="col-md-12">
      <CodeTabs readOnly={true} socket={socket}/>
    </div>
  </div>
);

export default CodeView;
