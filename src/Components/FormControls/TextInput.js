import React from 'react';
//combines label and input into one component, used for text inputs (default) but also can be passed a prop and used for similar input types
class TextInput extends React.PureComponent{
  static defaultProps = {
    "type": "text"
  }

  render(){
    const value = this.props.value.toString();
    let label = <p></p>;
    if(this.props.label){
      label = <label className="label" htmlFor={this.props.id} >{this.props.label}</label>;
    }
    return (<div className="field">
              {label}
              <div className="control">
                <input className="input" id={this.props.id} type={this.props.type} value={value} onChange={this.props.onChange} />
              </div>
              {this.props.help ? <p className="help">{this.props.help}</p> : ""}
            </div>);
  }
}

export default TextInput;