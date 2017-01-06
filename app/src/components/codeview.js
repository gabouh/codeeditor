import React from 'react';
//Custom Components

import CodeTabs from '../containers/codeTabs'

const CodeView = () => (

  <div className="row">
    <div className="col-md-12">
      <CodeTabs readOnly={true}/>
    </div>
  </div>
);

export default CodeView;
