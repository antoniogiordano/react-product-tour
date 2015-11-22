/**
 * Created by AntonioGiordano on 21/11/15.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import ReactProductTour from './index.js'

var ReactProductTourDemo = React.createClass({
  startTour () {
    this.refs['rpt'].startTour()
  },
  render () {
    var steps = [
      {
        selector: '[data-rpt=text]',
        message: 'Let\'s point to this text now! lekufg qkwjfg ouqyfg ouwygf ouqeyg ouqyg fouqywg fouqyeg fou geqfou ygqeouf gqoufy gqowufg qoeuyfg oquygf ouqyg fouqw gfouqegfou yegouy geougy eou vgqeoufyg qeouyg voqeuyg oqeurgoqegfouegqrfouegqfougq',
        modalPosition: 'top'
      },
      {
        selector: '[data-rpt=title]',
        message: 'Let\'s point here!',
        modalPosition: 'bottom'
      },
      {
        selector: '[data-rpt=image]',
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
