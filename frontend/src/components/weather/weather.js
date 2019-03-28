import React from 'react';
import './weather.css';
import Typography from '@material-ui/core/Typography';

class Weather extends React.Component {
  render() {
    return (
      <React.Fragment>
        <head>
          <link
            rel='stylesheet'
            href='https://use.fontawesome.com/releases/v5.8.1/css/all.css'
            integrity='sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf'
            crossorigin='anonymous'
          />
        </head>
        <body>
          <h4 className='weather__header'>
            <Typography variant='h6'>
              &nbsp;&nbsp;&nbsp;&nbsp;Weather
            </Typography>
          </h4>

          <hr className='speration_line' />

          <p className='weather__span'>
            <text className='weather__text'>&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <i class='fas fa-temperature-high' />
            <span className='weather__key'>
              Temperature:
              <text className='weather__text'>
                <span style={{ color: '#e91e63' }}>
                  {this.props.temperature}&nbsp;°C
                </span>
              </text>
            </span>
          </p>

          <p className='weather__span'>
            <text className='weather__text'>&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <i class='fas fa-cloud-rain' />
            <span className='weather__key'>
              Humidity:
              <text className='weather__text'>{this.props.humidity}%</text>
            </span>
          </p>

          <p className='weather__span'>
            <text className='weather__text'>&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <i class='fas fa-feather' />
            <span className='weather__key'>
              Sky:<text className='weather__text'>{this.props.sky}</text>
            </span>
          </p>

          <p className='weather__span'>
            <text className='weather__text'>&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <i class='fas fa-wind' />
            <span className='weather__key'>
              Wind Speed:
              <text className='weather__text'>{this.props.wind}&nbsp;km/h</text>
            </span>
          </p>

          <p className='weather__span'>
            <text className='weather__text'>&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <i class='far fa-arrow-alt-circle-down' />
            <span className='weather__key'>
              Pressure:
              <text className='weather__text'>
                {this.props.pressure}&nbsp;mbar
              </text>
            </span>
          </p>
        </body>
      </React.Fragment>
    );
  }
}

export default Weather;
