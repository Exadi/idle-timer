import React from 'react';
class CheckboxInput extends React.PureComponent{
    render(){
      let label = <p></p>;
      if(this.props.label){
        label = <label className="label" htmlFor={this.props.id} >{this.props.label}</label>;
      }
      return (<div className="field">
                <label className="checkBox" htmlFor={this.props.id} >
                  <input id={this.props.id} type="checkbox" checked={this.props.checked} onChange={this.props.onChange} />
                  {this.props.label}
                </label>
              </div>);
    }
}

export default CheckboxInput;