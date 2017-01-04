import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Tab} from 'material-ui/Tabs'
import Snackbar from 'material-ui/Snackbar';
import {red500} from 'material-ui/styles/colors';

import CodeMirror from 'react-codemirror';
import CopyToClipboard from 'react-copy-to-clipboard';

import javascript from 'codemirror/mode/javascript/javascript';



const styles = {
language: {
    width: 200,
    float:'right'
  },
  copy:{
      float:'right'
  },
  clear:{
      color:red500,
      float:'right'
  }
};
class CodeEditor extends React.Component
{
    

    constructor(props)
    {
        super(props);
          this.state ={
                snackBar:{
                          open:false,
                          message:'',
                          action:'',
                          timeout:4000 
                        }
                
            };
        
        this.updateCode = this.updateCode.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.interact = this.interact.bind(this);

        this.handleClearCode = this.handleClearCode.bind(this);

        this.openSnackBar = this.openSnackBar.bind(this);
        //Snackbar
        this.handleSnackbarTouchTap = this.handleSnackbarTouchTap.bind(this);
        this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
    }
    updateCode (newCode) {
		this.props.code.value=newCode;

        if(this.props.onChange)
            this.props.onChange(newCode);

	};
	changeMode(event, index, value)
    {
        this.props.code.language = value;
    } 
	
	interact (cm) {
		console.log(cm.getValue());
	};

openSnackBar()
{
        this.setState((prevState)=>{

            return {...prevState,snackBar:
                                    {...prevState.snackBar,
                                        open:true,
                                        message:'Code has been copied.',
                                        timeout:4000,
                                        action:"close"}
                                    };
        });
}
    //Snackbar methods..
   handleSnackbarTouchTap(type){

       //TODO: Implement UNDO for type== clear

       // console.log(type);
       this.setState((prevState)=>{
       return {...prevState,snackBar:
                                    {...prevState.snackBar,
                                        open:false}
                                    };
        });
  }  

  handleSnackbarRequestClose(){
       this.setState((prevState)=>{

            return {...prevState,snackBar:
                                    {...prevState.snackBar,
                                        open:false}
                                    };
        });
  }
  
  handleClearCode()
  {
      var newCode = '';
      this.props.code.value=newCode;

      this.setState((prevState)=>{
            return {...prevState,snackBar:
                                    {...prevState.snackBar,
                                        open:true,
                                        message:'Code has been cleared.',
                                        timeout:4000,
                                        action:"close"}
                                    };
        });

        if(this.props.onChange)
            this.props.onChange(newCode);
  }
 
  
	render () {

        console.log(this.props.code.language);
		var options = {
			lineNumbers: true,
			readOnly: this.state.readOnly,
			mode: this.props.code.language
		};
		return (
			<div className="row">
                
                <div className="col-md-12">
				<CodeMirror ref="editor" 
                            value={this.props.code.value} 
                            onChange={this.updateCode} 
                            options={options} 
                            interact={this.interact} />
                </div>
                <div className="col-md-12">
                 
                  
                   <FlatButton 
                        label="Clear" 
                        style={styles.clear}
                        onClick={this.handleClearCode}
                    />
                   <CopyToClipboard text={this.props.code.value}
                            onCopy={()=>this.openSnackBar()}>
                            <FlatButton 
                                        label="Copy" 
                                        primary={true}
                                        style={styles.copy}
                                        />
                    </CopyToClipboard>
                   
                    <SelectField 
                            floatingLabelText="Language"
                            onChange={this.changeMode} 
                            value={this.props.code.language}
                           >
                            <MenuItem value={"markdown"} primaryText="markdown" />
                            <MenuItem value={"javascript"} primaryText="javascript" />
                    </SelectField>  
                </div>

                        <Snackbar
                            open={this.state.snackBar.open}
                            message={this.state.snackBar.message}
                            autoHideDuration={this.state.snackBar.timeout}
                            action={this.state.snackBar.action}
                            onActionTouchTap={()=>this.handleSnackbarTouchTap(this.state.snackBar.action)}
                            onRequestClose={this.handleSnackbarRequestClose}
                            />
                  
			</div>
		);
	}
}

export default CodeEditor;