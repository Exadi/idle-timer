import React from 'react';
class InputWithLabel extends React.PureComponent{
    render(){
      let label = <p></p>;
      if(this.props.label){
        label = <label htmlFor={this.props.id} >{this.props.label}</label>;
      }
      return (<span>
              {label}
              <input id={this.props.id} type={this.props.type} value={this.props.value} onChange={this.props.onChange} checked={this.props.checked ? "checked": ""} />
              </span>);
    }
}

export default InputWithLabel;