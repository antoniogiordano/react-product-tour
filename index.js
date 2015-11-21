/**
 * Created by AntonioGiordano on 21/11/15.
 */

import React, {PropTypes} from 'react'

var ReactProductTour = React.createClass({
  propTypes: {
    steps: PropTypes.array
  },
  getInitialState () {
    return {
      steps: this.props.steps,
      currentStep: 0
    }
  },
  startTour () {

  },
  render () {
    return (
        <div>
          <div>
            <h2>OK</h2>
          </div>
        </div>
      )
  }
})

export default ReactProductTour
