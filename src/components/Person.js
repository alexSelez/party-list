import React, { Component } from 'react'

import Input from 'components/Input'

import deleteIcon from 'delete.svg'

class Person extends Component {

  state = {
    editMode: false,
  }

  handleRemove = () => {
    const { person, onRemove } = this.props
    onRemove(person.id)
  }

  handleChangeProperty = (property, value) => {
    const { person, onChangeProperty } = this.props
    onChangeProperty(person.id, property, value)
  }

  handleChangeName = (value) => {
    this.handleChangeProperty('name', value)
    this.setState({ editMode: false })
  }

  render() {
    const { person } = this.props
    const { editMode } = this.state

    return (
      <tr>
        <td className="name">
          {!editMode && <div onDoubleClick={() => this.setState({ editMode: true })}>{person.name}</div>}
          {editMode &&
            <Input defaultValue={person.name} onChange={this.handleChangeName} onBlur={this.handleChangeName}/>
          }
        </td>
        <td className="pair">
          <input className="mark-pair" type="checkbox" checked={person.withPair}
                 onChange={() => this.handleChangeProperty('withPair', !person.withPair)}/>
        </td>
        <td className="delete">
          <img onClick={this.handleRemove} src={deleteIcon} className="deleteIcon" alt="delete" />
        </td>
      </tr>
    )
  }
}

export default Person
