import React, { Component } from 'react'

class Input extends Component {

  static defaultProps = {
    defaultValue: ''
  }

  state = {
    value: this.props.defaultValue
  }

  handleChange = (event) => {
    const { value } = event.target
    this.setState({ value })
  }

  handleBlur = (event) => {
    const { onBlur } = this.props
    onBlur && onBlur(event.target.value)
  }

  handleSave = (event) => {
    if(event.key == 'Enter') {
      this.props.onChange(this.state.value)
      this.setState({ value: '' })
    }
  }

  render() {
    const { value } = this.state

    return (
      <div className="container">
        <input className="textbox" autoFocus type="text" value={value} onChange={this.handleChange}
               onKeyPress={this.handleSave} onBlur={this.handleBlur}/>
      </div>
    );
  }
}

export default Input
