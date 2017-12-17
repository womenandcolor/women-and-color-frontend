import React from 'react'
import css from './styles.css'
import { Link } from 'react-router-dom'

const Work = (props) => {

  const generateHandler = (fieldName) => {
    return (event) => { props.handleInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <div>
      <div className={ css.registrationForm }>
        <h1>Let's talk about work</h1>
        <form onSubmit={ props.handleSubmit }>
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              className="form-control"
              id="position"
              onChange={ generateHandler('position') }
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              className="form-control"
              id="company"
              onChange={ generateHandler('company') }
            />
          </div>

          <button type="submit" className="btn btn-primary">Save and continue</button>
          <button className="btn btn-outline-primary">Save and exit</button>
        </form>
      </div>
    </div>
  )
}

export default Work;