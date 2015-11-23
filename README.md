# React Product Tour

[![Build
Status](https://travis-ci.org/antoniogiordano/react-product-tour.svg)](https://travis-ci.org/antoniogiordano/react-product-tour)

Easy step-based product tour component written in React

## Development status

### 2015/11/23 Released STABLE Version 1.0.1 on npm

Added:
  Optional Callback onChange at every step of the product tour
  Optional Callback onTourEnd at the end of the product Tour

### 2015/11/23 Released Beta Version 0.1.3 on npm

Added:
 Prev button to go to the previous step.
 Skip button to exit the product tour
 Steps circle icons to navigate through the product tour

### 2015/11/22 Released Beta Version 0.1.0 on npm

 
## Install
 
```sh
$ npm install react-product-tour [--save]
```

In your project:

```js
var ReactProductTour = require('react-product-tour')
```
or
```js
import ReactProductTour from 'react-product-tour'
```
then
```js
ReactDOM.render(<ReactProductTour ref='rpt' steps={steps} />, document.getElementById('rpt'))
```

And then include the dist/rpt.css in your HTML file!


## Examples

Open examples/ directory and open example1.html with a browser to test the component 


## API

### react-product-tour props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>steps</td>
          <td>Array</td>
          <td>[]</td>
          <td>Array of product tour steps</td>
        </tr>
        <tr>
          <td>enableAutoPositioning</td>
          <td>Boolean</td>
          <td>true</td>
          <td>If set to false, the modal position specified for every steps will be forced to that, even if there isn't enough space on the window.<br>
          Otherwise, the modal will be auto positioned where is enoguh space, or fixed to the bottom of the screen</td>
        </tr>
        <tr>
          <td>onTourEnd</td>
          <td>Function</td>
          <td></td>
          <td>Optional. This prop is a callback for product tour end or exit. It is called every time the user arrives to the end or exit from the product tour.</td>
        </tr>
    </tbody>
</table>

### react-product-tour step object

Each step in props.steps array is an object with these properties

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>selector</td>
          <td>String/Function</td>
          <td></td>
          <td>Mandatory property. This parameter specifies the object to focus during the product tour step.<br>
         You could specify a String, and it will be used as a jQuery selector.<br>
          If you specify a function (it will be triggered in runtime during the product tour), you must return a valid DOM element (not a jquery one)<br>
          In the first case, i suggest the use of custom tags to select your elements, like:<br>
          &lt;p data-rpt='firstStep'&gt;Title&lt;/p&gt;<br>
          {selector: '[data-rpt=firstStep]'}
           or 
           {selector: () => {return $('[data-rpt=firstStep]')[0]}}</td>
        </tr>
        <tr>
          <td>message</td>
          <td>String</td>
          <td></td>
          <td>Mandatory property. This parameter is the string content of your product tour modal step. It's your business to handle internationalization by passing the right translation to the step</td>
        </tr>
        <tr>
          <td>modalPosition</td>
          <td>String</td>
          <td>'top'</td>
          <td>Optional parameter. It could be a value from this array<br>
          ['top', 'bottom', 'left', 'right', 'center']<br>
          It represents the position of the modal relative to the focused element of the step</td>
        </tr>
        <tr>
          <td>onChange (index)</td>
          <td>Function</td>
          <td></td>
          <td>Optional property. This parameter is a callback which is called every time the user arrives at this step.<br>
          An index parameter is passed to the function representing the current index step in props.steps array passed to the RPT component 
          </td>
        </tr>
    </tbody>
</table>

### react-product-tour methods

Public methods of rpt

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>startTour()</td>
          <td>You call this method when you want to start your product tour.<br>
          Add a ref tag in your ReactProductTour component like ref='rpt' and call it from your parent component with<br>
           this.refs['rpt'].startTour()
           </td>
        </tr>
    </tbody>
</table>
