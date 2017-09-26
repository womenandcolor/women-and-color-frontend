import React, { PropTypes } from 'react'
import { container, title } from './styles.css'
import './styles.css'

/* <h1 className={title}>{'Women & Color'}</h1> */

export default function Home () {
  return (
    <div className={container}>

      <div className="content">
        <div className="content-titles">{'Speakers in Toronto for all topics'}</div>
      </div>
    </div>
  )
}
