import React, { Component } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import Input from 'components/Input'
import Filter from 'components/Filter'
import List from 'components/List'

const filters = ['All', 'No pair', 'With pair']

class App extends Component {

  state = {
    persons: initPersons(),
    showMode: 'All'
  }

  addPerson = (personName) => {
    const { persons } = this.state
    const newPerson = {
      id: getNextId(persons),
      name: personName,
      withPair: false
    }
    this.setState({ persons: persons.concat(newPerson) }, this.saveStorage)
  }

  removePerson = (id) => {
    const { persons } = this.state
    this.setState({ persons: persons.filter(p => p.id !== id) }, this.saveStorage)
  }

  changeProperty = (id, property, value) => {
    let persons = cloneDeep(this.state.persons) 
    if (property === 'name' && value === '') {
      persons = persons.filter(p => p.id !== id)
    } else {
      const person = persons.find(p => p.id === id)
      person[property] = value
    }
    this.setState({ persons }, this.saveStorage)
  }

  changeFilter = (filter) => {
    this.setState({ showMode: filter })
  }

  saveStorage = () => {
    localStorage.setItem('persons', JSON.stringify(this.state.persons))
  }

  render() {
    const { persons, showMode } = this.state
    const list = getFilteredPersons(persons, showMode)
    const total = getTotal(persons)

    return (
      <div className="app">
        <h1 className="app-title">Party list</h1>
        <div className="total">Total persons: {total}</div>
        <div className="persons">
          <Input onChange={this.addPerson}/>
          <Filter filters={filters} value={this.state.showMode} onChange={this.changeFilter}/>
          <List persons={list} onRemove={this.removePerson} onChangeProperty={this.changeProperty} />
        </div>
      </div>
    )
  }
}

function initPersons() {
  const persons = localStorage.getItem('persons')
  return persons ? JSON.parse(persons) : []
}

function getNextId(list) {
  return list.length > 0
    ? Math.max(...list.map(el => el.id)) + 1
    : 1
}

function getFilteredPersons(persons, showMode) {
  return showMode === 'No pair'
    ? persons.filter(p => !p.withPair)
    : showMode === 'With pair'
    ? persons.filter(p => p.withPair)
    : persons
}

function getTotal(persons) {
  return persons.reduce((a, b) => a + 1 * (b.withPair ? 2 : 1), 0)
}

export default App
