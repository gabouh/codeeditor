import React from 'react';

//Materail-ui Components
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs,Tab} from 'material-ui/Tabs';
import {blue500, yellow600} from 'material-ui/styles/colors';

//custom Components 
import CodeEditor from './codeEditor';

export default class CodeTabs extends React.Component {
  
  constructor(props)
  {
      super(props);

      this.onCodeChange = this.onCodeChange.bind(this);
  }

  onCodeChange(folderIndex,fileIndex,newValue)
  {
      var currentNode = this.props.node;
      var currentFile =   currentNode[folderIndex].childNodes[fileIndex];      
      var code = currentFile.code;
      //debugger;
      var childNode = {...currentFile,code:{...code,value:newValue}};
      var childNodes = [...currentNode[folderIndex].childNodes.slice(0,fileIndex),childNode,...currentNode[folderIndex].childNodes.slice(fileIndex+1)];

      var newState= currentNode.slice();

      newState[folderIndex].childNodes = childNodes;

      if(this.props.onChange)
          this.props.onChange(newState,folderIndex,childNodes.length-1);
  }

  render() {
   
   var _this = this;
   console.log(yellow600);

      var childNodes=[];
      var folder=[];

      var initialSelectedFolderIndex = 0;
      var initialSelectedFileIndex = 0;

      if(this.props.initialSelectedFolderIndex)
        initialSelectedFolderIndex = this.props.initialSelectedFolderIndex;

      if(this.props.initialSelectedFileIndex)
        initialSelectedFileIndex = this.props.initialSelectedFileIndex;


      if(this.props.node)
      {
            folder = this.props.node.map(function(node,indexRoot){
       
            if (node.childNodes != null) {
                childNodes = node.childNodes.map(function(childnode, index) {
                            return (<Tab label={childnode.title} style={{'background':'rgb(33, 150, 243)'}}>
                                      <CodeEditor code={childnode.code} onChange={(newCode)=>_this.onCodeChange(indexRoot,index,newCode)}/>
                                   </Tab>)
                });
             }
  
             var childTabs;
             
             if(indexRoot==initialSelectedFolderIndex)
             {
                childTabs = <Tabs>{childNodes}</Tabs>
             }
             else
             {
                  childTabs = <Tabs>{childNodes}</Tabs>
             }

             return  (<Tab label={node.title} style={{'background':'rgb(253, 216, 53)' }}>   {childTabs}</Tab>);
             
             });

             if(folder.length> 0)
        return (<Tabs >{folder}</Tabs>);
      else
        return null;  
      } 

  }
}