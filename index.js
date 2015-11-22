/**
 * Created by AntonioGiordano on 21/11/15.
 */

import React, {PropTypes} from 'react'
import $ from 'jquery'

var ReactProductTour = React.createClass({
  propTypes: {
    steps: PropTypes.array,
    enableAutoPositioning: PropTypes.bool
  },
  getDefaultProps () {
    return {
      steps: [],
      enableAutoPositioning: true
    }
  },
  focusElemStyleProps: [
    'zIndex', 'position', 'borderRadius', 'boxShadow'
  ],
  modalPositions: [
    'top', 'bottom', 'right', 'left', 'center'
  ],
  arrowPositions: {
    'top': 'bottom',
    'bottom': 'top',
    'right': 'left',
    'left': 'right',
    'center': 'none'
  },
  constants: {
    MODAL_MAX_WIDTH: 320,
    MODAL_FULL_SCREEN_WIDTH: 450,
    MODAL_HEIGHT: 100
  },
  componentDidMount () {
    this.refs['rpt'].style.display = 'none'
  },
  getInitialState () {
    return {
      currentStep: -1,
      isTourActive: false,
      overlayZindex: 999999,
      overlayClass: 'rpt-overlay',
      modalClass: 'rpt-modal',
      arrowClass: 'rpt-arrow rpt-arrow-bottom',
      focusElem: null,
      oldFocusElemStyle: null
    }
  },
  resizer () {
    var state = {
      currentStep: this.state.currentStep,
      focusElem: this.state.focusElem
    }
    this.focusOnElement(state)
  },
  startTour () {
    $(window).off('resize', this.resizer)
    $(window).resize(this.resizer)
    this.refs['rpt'].style.display = 'block'
    var focusElem = this.getElement(0)
    var oldFocusStyle = {}
    for (var prop of this.focusElemStyleProps) {
      oldFocusStyle[prop] = focusElem.style[prop]
    }
    this.setState({
      isTourActive: true,
      overlayClass: 'rpt-overlay rpt-active',
      modalClass: 'rpt-modal rpt-active',
      focusElem: focusElem,
      oldFocusElemStyle: oldFocusStyle,
      currentStep: 0
    })
    var state = {
      currentStep: 0,
      focusElem: focusElem
    }
    this.focusOnElement(state)
  },
  nextStep () {
    this.restoreElemStyle()
    var focusElem = this.getElement(this.state.currentStep + 1)
    var oldFocusStyle = {}
    for (var prop of this.focusElemStyleProps) {
      oldFocusStyle[prop] = focusElem.style[prop]
    }
    this.setState({
      oldFocusElemStyle: oldFocusStyle,
      focusElem: focusElem,
      currentStep: this.state.currentStep + 1,
    })
    var state = {
      currentStep: this.state.currentStep + 1,
      focusElem: focusElem
    }
    this.focusOnElement(state)
  },
  getElement (currStep) {
    var steps = this.props.steps
    var focusElem
    // Evaluating focused element
    if (typeof steps[currStep].selector === 'function') {
      focusElem = steps[currStep].selector()
    } else if (typeof steps[currStep].selector === 'string') {
      focusElem = $(steps[currStep].selector)[0]
    }
    return focusElem
  },
  focusOnElement (nextState) {
    var steps = this.props.steps
    var currStep = nextState.currentStep
    var focusElem = nextState.focusElem
    if (currStep >= this.props.steps.length) {

    } else {
      if (typeof focusElem !== 'undefined' && focusElem !== null) {
        // Set focused element new style
        focusElem.style.zIndex = (this.state.overlayZindex + 1).toString()
        focusElem.style.position = 'relative'
        focusElem.style.borderRadius = '5px'
        focusElem.style.boxShadow = '0 2px 15px rgba(0,0,0,.8)'
      }
      // Evaluating modal position
      var modalPosition = 'top'
      if (typeof steps[currStep].modalPosition === 'string') {
        if (this.modalPositions.indexOf(steps[currStep].modalPosition) !== -1) {
          modalPosition = steps[currStep].modalPosition
        } else {
          modalPosition = 'top'
        }
      }
      var elemTop = $(focusElem).offset().top
      var elemLeft = $(focusElem).offset().left
      var elemW = focusElem.offsetWidth
      var elemH = focusElem.offsetHeight
      var winW = $(window).width()
      var winH = $(window).height()
      // Check and eventually correct modal position (change if bool enabled and for lack of space)
      if (this.props.enableAutoPositioning) {
        var positionEnabled = {}
        positionEnabled['top'] = (elemTop > 150 && (winW - elemLeft > this.constants.MODAL_MAX_WIDTH))
        positionEnabled['left'] = (elemLeft > this.constants.MODAL_MAX_WIDTH && ($(window).height() - elemTop > 150))
        positionEnabled['right'] = ((winW - elemLeft - elemW > this.constants.MODAL_MAX_WIDTH) && (winH - elemTop > 150))
        positionEnabled['bottom'] = ((winH - elemTop - elemH > this.constants.MODAL_MAX_WIDTH) && (winW - elemLeft > this.constants.MODAL_MAX_WIDTH))
        positionEnabled['center'] = true
        if (!positionEnabled[modalPosition]) {
          ['top', 'left', 'right', 'bottom', 'center'].forEach((prop) => {
            if (!positionEnabled[modalPosition] && positionEnabled[prop]) {
              modalPosition = prop
            }
          })
        }
      }
      // Calculate modal position in window
      var top, left, bottom = 'initial', width, height = 'auto'
      switch (modalPosition) {
        case 'bottom':
          top = (elemTop + elemH + 15).toString() + 'px'
          left = elemLeft + 5
          width = Math.min.apply(Math, [winW - 40, this.constants.MODAL_FULL_SCREEN_WIDTH]);
          break
        case 'top':
          top = (elemTop - this.constants.MODAL_HEIGHT - 25).toString() + 'px'
          left = elemLeft + 5
          width = Math.min.apply(Math, [winW - 40, this.constants.MODAL_FULL_SCREEN_WIDTH]);
          height = this.constants.MODAL_HEIGHT
          break
        case 'right':
          top = (elemTop + 10).toString() + 'px'
          left = elemLeft + elemW + 15
          width = Math.min.apply(Math, [winW - elemW - 40, this.constants.MODAL_FULL_SCREEN_WIDTH]);
          break
        case 'left':
          top = (elemTop + 10).toString() + 'px'
          width = Math.min.apply(Math, [winW - elemW - 40, this.constants.MODAL_FULL_SCREEN_WIDTH]);
          left = elemLeft - width - 25
          break
        case 'center':
          bottom = '5px'
          top = 'initial'
          left = 5
          width = winW - 30
          break
      }
      // Set modal position
      $(this.refs['modal']).width(width)
      $(this.refs['modal']).height(height)
      this.refs['modal'].style.top = top
      this.refs['modal'].style.bottom = bottom
      this.refs['modal'].style.left = Math.floor(left).toString() + 'px'
      // Set modal arrow position based on modal position
      var arrowClass = 'rpt-arrow rpt-arrow-' + this.arrowPositions[modalPosition]
      this.setState({
        arrowClass: arrowClass
      })
    }
  },
  restoreElemStyle () {
    if (this.state.focusElem !== null) {
      for (var prop of this.focusElemStyleProps) {
        this.state.focusElem.style[prop] = this.state.oldFocusElemStyle[prop]
      }
    }
  },
  dismissTour () {
    $(window).off('resize', this.resizer)
    this.restoreElemStyle()
    this.setState({
      isTourActive: false,
      overlayClass: 'rpt-overlay',
      modalClass: 'rpt-modal',
      focusElem: null,
      oldFocusElemStyle: null
    })
    setTimeout(() => {
      this.refs['rpt'].style.display = 'none'
    }, 300)
  },
  render () {
    return (
        <div ref='rpt' className='rpt'>
          <div className={this.state.overlayClass} onClick={this.dismissTour} style={{zIndex: this.state.overlayZindex}} />
          <div ref='modal' className={this.state.modalClass} style={{zIndex: this.state.overlayZindex + 1}}>
            <div className={this.state.arrowClass}></div>
            {
              this.state.isTourActive ? (
                  <p>{this.props.steps[this.state.currentStep > -1 ? this.state.currentStep : 0].message}</p>
              ) : null
            }
            {
                this.state.currentStep < this.props.steps.length - 1 ? (
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
