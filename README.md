# Intro
This [High Order Component](https://reactjs.org/docs/higher-order-components.html) simplifies creating React components whose rendering depends on 
dynamically loaded scripts. 

Your wrapped React component will be mount once the external script is loaded.

### Installation

To get started, you can simply install it via npm.

```bash
npm i --save react-with-external-script
```

### Example usage
Google Maps Hello World
````javascript
class Map extends React.Component {
  componentDidMount() {
      // Initialize Google Maps
      new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
              });
    }
  }
  render () {
    return <div id='map' />
  }
}

export default withExternalScript('https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap', Map)
````

D3 Hello World
````javascript
class D3Chart extends React.Component {
  componentDidMount() {
      // Initialize d3 chart
      d3.select(".chart").append("span")
          .text("Hello, world!");
    }
  }
  render () {
    return <div className='chart' />
  }
}

export default withExternalScript('https://cdnjs.cloudflare.com/ajax/libs/d3/4.12.0/d3.min.js', D3Chart)
````

### Test

````
npm test
````

### License

MIT