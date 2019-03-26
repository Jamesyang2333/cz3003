import React, { Component } from 'react';

const weatherStyle = {
  height: '300px',
  width: '300px'
};

class Weather extends Component {
  render() {
    return (
      <div className='Weather' style={weatherStyle}>
        <a
          className='weatherwidget-io'
          href='https://forecast7.com/en/1d35103d82/singapore/'
          data-label_1='SINGAPORE'
          data-label_2='WEATHER'
          data-icons='Climacons Animated'
          data-days='3'
          data-theme='pure'>
          SINGAPORE WEATHER
        </a>
        <script type='text/javascript'>
          {
            !(function(d, s, id) {
              var js,
                fjs = d.getElementsByTagName(s)[0];
              if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://weatherwidget.io/js/widget.min.js';
                fjs.parentNode.insertBefore(js, fjs);
              }
            })(document, 'script', 'weatherwidget-io-js')
          }
        </script>
      </div>
    );
  }
}

export default Weather;
