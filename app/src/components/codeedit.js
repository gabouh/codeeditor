import React from 'react';
//Custom Components
import TreeNode from '../containers/fileTree'
import CodeTabs from '../containers/codeTabs'

const CodeEdit = () => (

  <div className="row">
    <div className="col-md-3">
      <TreeNode />

    </div>
    <div className="col-md-9">
      <CodeTabs/>
    </div>
  </div>
);

export default CodeEdit;

