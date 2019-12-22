import React from 'react';
class TextInput extends React.PureComponent{
    render(){
      let label = <p></p>;
      if(this.props.label){
        label = <label className="label" htmlFor={this.props.id} >{this.props.label}</label>;
      }
      return (<div className="field">
                {label}
                <div className="control">
                  <input className="input" id={this.props.id} type="text" value={this.props.value} onChange={this.props.onChange} />
                </div>
                {this.props.help ? <p className="help">{this.props.help}</p> : ""}
              </div>);
    }
}

export default TextInput;