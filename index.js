/**
 * Created by AntonioGiordano on 21/11/15.
 */

import React, {PropTypes} from 'react'
import $ from 'jquery'

var ReactProductTour = React.createClass({
  propTypes: {
    steps: PropTypes.array
  },
  focusElemStyleProps: [
    'zIndex', 'position'
  ],
  getInitialState () {
    return {
      steps: this.props.steps,
      currentStep: -1,
      isTourActive: false,
      overlayZindex: 999999,
      overlayClass: 'rpt-overlay',
      modalClass: 'rpt-modal',
      focusElem: null,
      oldFocusElemStyle: null
    }
  },
  startTour () {
    this.setState({
      isTourActive: true,
      overlayClass: 'rpt-overlay rpt-active',
      modalClass: 'rpt-modal rpt-active'
    })
    var state = {
      currentStep: 0,
      focusElem: null,
      oldFocusElemStyle: null
    }
    this.focusOnElement(state)
  },
  nextStep () {
    var state = {
      currentStep: this.state.currentStep + 1,
      focusElem: this.state.focusElem,
      oldFocusElemStyle: this.state.oldFocusElemStyle
    }
    this.focusOnElement(state)
  },
  focusOnElement (nextState) {
    var steps = this.state.steps
    var currStep = nextState.currentStep
    var oldFocusStyle = nextState.oldFocusElemStyle
    var focusElem = nextState.focusElem
    var prop
    if (currStep >= this.state.steps.length) {

    } else {
      if (focusElem !== null) {
        for (prop of this.focusElemStyleProps) {
          focusElem.style[prop] = oldFocusStyle[prop]
        }
      }
      if (typeof steps[currStep].selector === 'function') {
        focusElem = steps[currStep].selector()
      } else if (typeof steps[currStep].selector === 'string') {
        focusElem = $(steps[currStep].selector)[0]
      }
      if (typeof focusElem !== 'undefined' && focusElem !== null) {
        oldFocusStyle = {}
        for (prop of this.focusElemStyleProps) {
          oldFocusStyle[prop] = focusElem.style[prop]
        }
        this.setState({
          focusElem: focusElem,
          oldFocusElemStyle: oldFocusStyle,
          currentStep: currStep
        })
        focusElem.style.zIndex = (this.state.overlayZindex + 1).toString()
        focusElem.style.position = 'relative'
      }
    }
  },
  dismissTour () {
    if (this.state.focusElem !== null) {
      for (var prop of this.focusElemStyleProps) {
        this.state.focusElem.style[prop] = this.state.oldFocusElemStyle[prop]
      }
    }
    this.setState({
      isTourActive: false,
      overlayClass: 'rpt-overlay',
      modalClass: 'rpt-modal',
      focusElem: null,
      oldFocusElemStyle: null
    })
  },
  render () {
    return (
        <div className='rpt'>
          <div className={this.state.overlayClass} onClick={this.dismissTour} style={{zIndex: this.state.overlayZindex}} />
          <div className={this.state.modalClass} style={{zIndex: this.state.overlayZindex + 1}}>
            {
              this.state.isTourActive ? (
                  <p>{this.state.steps[this.state.currentStep > -1 ? this.state.currentStep : 0].message}</p>
              ) : null
            }
            {
                this.state.currentStep < this.state.steps.length - 1 ? (
                  <button onClick={this.nextStep}>Next</button>
                ) : (
                  <button onClick={this.dismissTour}>Done</button>
                )
            }
          </div>
        </div>
      )
  }
})

export default ReactProductTour
