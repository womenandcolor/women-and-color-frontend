import React from 'react'
import css from './styles.css'
import { Link } from 'react-router-dom'

const Social = (props) => {

  const generateHandler = (fieldName) => {
    return (event) => { props.handleInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <div>
      <div className={ css.registrationForm }>
        <h1>Be a little social</h1>
        <form onSubmit={ props.handleSubmit }>
          <div className="form-group">
            <label htmlFor="twitter">Twitter (optional)</label>
            <input
              type="text"
              className="form-control"
              id="twitter"
              onChange={ generateHandler('twitter') }
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn (optional)</label>
            <input
              type="text"
              className="form-control"
              id="linkedin"
              onChange={ generateHandler('linkedin') }
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website (optional)</label>
            <input
              type="text"
              className="form-control"
              id="website"
              onChange={ generateHandler('website') }
            />
          </div>

          <button type="submit" className="btn btn-primary">Save and submit</button>
        </form>
      </div>
    </div>
  )
}

export default Social;