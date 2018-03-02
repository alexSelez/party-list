import React, { Component } from 'react'

import Person from 'components/Person'

class List extends Component {

  state = {
    editMode: false,
  }

  render() {
    const { persons, onRemove, onChangeProperty } = this.props

    return (
      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <td className="name">Name</td>
              <td className="pair">Pair</td>
              <td className="delete">Delete</td>
            </tr>
          </thead>
          <tbody>
            {persons.map(person =>
              <Person key={person.id} person={person}
                      onRemove={onRemove} onChangeProperty={onChangeProperty}/>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default List
