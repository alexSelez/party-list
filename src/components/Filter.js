import React, { Component } from 'react'

class Filter extends Component {

  render() {
    const { filters, value, onChange } = this.props

    return (
      <div className="filters">
        {filters.map(filter =>
          <a className={value == filter ? 'selected' : ''}
                  key={filter} onClick={() => onChange(filter)}>
            {filter}
          </a>
        )}
      </div>
    )
  }
}

export default Filter
