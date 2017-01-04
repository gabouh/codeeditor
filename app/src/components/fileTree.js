import React from 'react';
import ReactDOM from 'react-dom';

//Material Components
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ContentAdd from 'material-ui/svg-icons/content/add-circle';
import EditorEdit from 'material-ui/svg-icons/editor/mode-edit';
import {blue500, yellow600,grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
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
      addFolder:{
          'marginTop':'5px',
           width: '100%'
      },
      listTextBox : {
          width:'inherit'
      },
      listItem :{
          paddingTop:'5px',
          'paddingBottom':'5px'
      },
       fileTree : {
                overflowY: 'scroll',
                'maxHeight': '80%'
            }
  }

  
const newFileTemplate ={title:'',
                        id:1,
                        code:{language:'javascript',
                            value:'//Code'}}

class TreeNode extends React.Component {
  constructor(props) {
    super(props);

    //state
    this.state ={
        snackbaropen:false,
        snackbarMsg:''
    };
 
    //File
    this.onAddFile = this.onAddFile.bind(this);
    this.OnEditFileName = this.OnEditFileName.bind(this);
    this.onFileDelete = this.onFileDelete.bind(this);
    //Folder
    this.handlenNewFolder = this.handlenNewFolder.bind(this);
    this.handleEditFolder = this.handleEditFolder.bind(this);
    this.onFolderDelete = this.onFolderDelete.bind(this);

    //Snackbar
    this.handleSnackbarCloseTouchTap = this.handleSnackbarCloseTouchTap.bind(this);
    this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
    
  }

   
  //folder methods
  // new folder

  handlenNewFolder(){

       var currentNode = this.props.node;
       var id =1;

       if(currentNode && currentNode.length >=1)
       {
            id =currentNode[currentNode.length-1].id +1
       }

       var newFolder =   {
                    title: name,
                    id: id,
                    childNodes: [{...newFileTemplate,id:1}]}

        var newNodes = [...currentNode,newFolder];

        if(this.props.onChange)
            this.props.onChange(newNodes,newNodes.length-1,0);

        this.setState((prevState)=>{
                     return {...prevState,snackbarMsg:'New Folder added',snackbaropen:true}
                });

        setTimeout(function(){
            var element = document.getElementById("lastFolder");
            element.scrollIntoView();
            },0);
        
       
  
  }  

 handleEditFolder(folderIndex,name){
    var currentNode = this.props.node;
    currentNode[folderIndex].title = name;
    if(this.props.onChange)
        this.props.onChange(currentNode,folderIndex,0);
 }

onFolderDelete(folderIndex){
      var currentNode = this.props.node;
   
      var newState = [...currentNode.slice(0,folderIndex),...currentNode.slice(folderIndex+1)];
     
      if(this.props.onChange)
          this.props.onChange(newState,folderIndex,0); 
 
}

//Files

//handle File name Edit
 OnEditFileName(folderIndex,fileIndex,filename){
     var currentNode = this.props.node;
     var currentFile =   currentNode[folderIndex].childNodes[fileIndex];      
   
      var childNode = {...currentFile,title:filename};
      var childNodes = [...currentNode[folderIndex].childNodes.slice(0,fileIndex),childNode,...currentNode[folderIndex].childNodes.slice(fileIndex+1)];

      var newState= currentNode.slice();

      newState[folderIndex].childNodes = childNodes;

      if(this.props.onChange)
          this.props.onChange(newState,folderIndex,childNodes.length-1);
    
 }      
 
// Add More File Click Event 
 onAddFile(event,folderIndex){
    var currentNode = this.props.node;
    var id =1;
    if(currentNode)
    {
     var currentFolderChilds = currentNode[folderIndex].childNodes;
     if(currentFolderChilds.length >0)
        id =  currentFolderChilds[currentFolderChilds.length-1].id +1;
    }
    
    //  var childNode = {
    //         title:'',
    //         id:id,
    //         code:{value:'//Code',
    //         language:'javascript'
    //         }
    //   };

      var childNode = {...newFileTemplate,id:id}

      var childNodes = [...currentNode[folderIndex].childNodes,childNode];
      var newState= currentNode.slice();

      newState[folderIndex].childNodes = childNodes;

      if(this.props.onChange)
          this.props.onChange(newState,folderIndex,childNodes.length-1);

     this.setState((prevState)=>{
         return {...prevState,snackbarMsg:'New file added',snackbaropen:true}
     });

 }

// handle file delete  
  onFileDelete(folderIndex,fileIndex){
    
      var currentNode = this.props.node;
   
      var childNodes = [...currentNode[folderIndex].childNodes.slice(0,fileIndex),...currentNode[folderIndex].childNodes.slice(fileIndex+1)];

      var newState= currentNode.slice();

      newState[folderIndex].childNodes = childNodes;

      if(this.props.onChange)
          this.props.onChange(newState,folderIndex,childNodes.length-1); 
  }

  //Snackbar methods

   handleSnackbarCloseTouchTap(){
         this.setState((prevState)=>{
                    return {...prevState,snackbaropen:false}
                });
  }  

  handleSnackbarRequestClose(){
       this.setState((prevState)=>{
                    return {...prevState,snackbaropen:false}
                });
  }
  



  render() {
  	var childNodes=[];
    var classObj;
    
    var _this = this;

   
    var OnEditFileName = this.OnEditFileName;

    console.log(this.refs)   
    var folder = [];

    if(this.props.node)
    {
        folder = this.props.node.map(function(node,indexRoot){
       
            if (node.childNodes != null) {
                childNodes = node.childNodes.map(function(childnode, index) {
                    
                            return (<ListItem  leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                              rightIconButton={<IconButton  onClick={()=>{_this.onFileDelete(indexRoot,index)}}  ><ActionDelete color={grey400}/></IconButton>} 
                              innerDivStyle = {styles.listItem} 
                              key={node.id+""+childnode.id} >
                            <TextField 
                                defaultValue={childnode.title} 
                                style = {styles.listTextBox}
                                hintText="Enter file name"
                                onBlur={(e)=>{ _this.OnEditFileName(indexRoot,index,e.target.value)}}/> 
                            </ListItem>)
                });
             }

             return  (<div key={node.id}>
                            <List>
                            
                                <ListItem
                                    leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={yellow600}/>}
                                    rightIconButton={<IconButton  onClick={()=>{_this.onFolderDelete(indexRoot)}}  ><ActionDelete color={grey400}/></IconButton>} 
                                    key={node.id}
                                    innerDivStyle = {styles.listItem} 
                                >
                                    <TextField 
                                        defaultValue={node.title} 
                                        style = {styles.listTextBox}
                                         hintText="Enter folder name"
                                        onBlur={(e)=>{_this.handleEditFolder(indexRoot,e.target.value)}}
                                       /> 
                                </ListItem>
                                {childNodes}
                                <ListItem key={"add"+node.id} 
                                    primaryText="Add More File"  
                                    rightIcon={<ContentAdd />} 
                                    onClick={(event)=> _this.onAddFile(event,indexRoot)} />
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
                  <RaisedButton label="New Folder" secondary={true} style={styles.addFolder} onClick={_this.handlenNewFolder}/>
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

export default TreeNode;