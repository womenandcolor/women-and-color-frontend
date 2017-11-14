import React from 'react'
import css from './styles.css'
import { Link } from 'react-router-dom'

const Profile = (props) => {

  const generateHandler = (fieldName) => {
    return (event) => {
      props.handleInputChange(fieldName, event.currentTarget.checked)
    }
  }

  return(
    <div>
      <div className={ css.registrationForm }>
        <h1>Tell us about you</h1>
        <form onSubmit={ props.handleSubmit }>
          <div className="form-group">
            <fieldset id="woman">
              <label htmlFor="woman">I identify as a woman</label>
              <input onChange={generateHandler('woman')} type="checkbox" name="woman" id="woman" className="form-control" />
            </fieldset>
          </div>

          <div className="form-group">
            <fieldset id="poc">
              <label htmlFor="poc">I identify as a person of colour</label>
              <input onChange={generateHandler('poc')} type="checkbox" name="poc" id="poc" className="form-control" />
            </fieldset>
          </div>

          <button type="submit" className="btn btn-primary">Save and continue</button>
          <button className="btn btn-outline-primary">Save and exit</button>
        </form>
      </div>
    </div>
  )
}

export default Profile;