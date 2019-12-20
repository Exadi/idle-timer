import React from 'react';
class InputWithLabel extends React.Component{
    render(){
      let label = <p></p>;
      if(this.props.label){
        label = <label for={this.props.id} >{this.props.label}</label>;
      }
      return (<span>
              {label}
              <input type={this.props.type} value={this.props.value} onChange={this.props.onChange} />
              </span>);
    }
}

export default InputWithLabel;