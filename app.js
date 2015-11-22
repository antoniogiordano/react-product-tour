/**
 * Created by AntonioGiordano on 21/11/15.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import ReactProductTour from './index.js'
import $ from 'jquery'

var ReactProductTourDemo = React.createClass({
  startTour () {
    this.refs['rpt'].startTour()
  },
  render () {
    var steps = [
      {
        selector: '[data-rpt=title]',
        message: 'This is a beautiful title!',
        modalPosition: 'bottom'
      },
      {
        selector: '[data-rpt=text]',
        message: 'Let\'s point here!',
        modalPosition: 'top'
      },
      {
        selector: () => $('[data-rpt=image]')[0],
        message: 'This is our Logo!',
        modalPosition: 'right'
      },
      {
        selector: '[data-rpt=arrow]',
        message: 'Got it!',
        modalPosition: 'left'
      }
    ]
    return (
      <div>
        <ReactProductTour ref='rpt' steps={steps} />
        <button onClick={this.startTour}>Start Tour</button>
      </div>
    )
  }
})

ReactDOM.render(<ReactProductTourDemo />, document.getElementById('rpt'))
