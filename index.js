/**
 * Created by AntonioGiordano on 21/11/15.
 */

import React, {PropTypes} from 'react'
import $ from 'jquery'

var ReactProductTour = React.createClass({
  propTypes: {
    steps: PropTypes.array
  },
  getInitialState () {
    return {
      steps: this.props.steps,
      currentStep: 0,
      isTourActive: true,
      overlayZindex: 999999,
      overlayClass: 'rpt-overlay',
      modalClass: 'rpt-modal',
    }
  },
  startTour () {
    this.setState({
      isTourActive: true,
      overlayClass: 'rpt-overlay rpt-active',
      modalClass: 'rpt-modal rpt-active',
    })
    this.nextStep()
  },
  nextStep () {
    var currStep = this.state.currentStep
    var steps = this.state.steps
    if (currStep > this.state.steps.length) {

    } else {
      var focusElem = null
      if (typeof steps[currStep].selector === 'function') {
        focusElem = steps[currStep].selector()
      } else if (typeof steps[currStep].selector === 'string') {
        focusElem = $(steps[currStep].selector)[0]
      }
      if (typeof focusElem !== 'undefined' && focusElem !== null) {
        this.setState({
          oldFocusElemStyle: focusElem.style
        })
        focusElem.style.zIndex = (this.state.overlayZindex + 1).toString()
        focusElem.style.position = 'relative'
      }
    }
  },
  dismissTour () {
    this.setState({
      isTourActive: false,
      overlayClass: 'rpt-overlay',
      modalClass: 'rpt-modal',
    })
  },
  render () {
    return (
        <div className='rpt'>
          <div className={this.state.overlayClass} onClick={this.dismissTour} style={{zIndex: this.state.overlayZindex}} />
          <div className={this.state.modalClass} style={{zIndex: this.state.overlayZindex + 1}}>
            <p>{this.state.steps[this.state.currentStep].message}</p>
            <button>Next</button>
          </div>
        </div>
      )
  }
})

export default ReactProductTour