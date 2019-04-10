import React from 'react';
import './weather.css';
import Typography from '@material-ui/core/Typography';

class AirQuality extends React.Component {
  render() {
    return (
      <div>
        <head>
          <link
            rel='stylesheet'
            href='https://use.fontawesome.com/releases/v5.8.1/css/all.css'
            integrity='sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf'
            crossorigin='anonymous'
          />
        </head>
        <body>
          <Typography variant='h6'>
            &nbsp;&nbsp;&nbsp;&nbsp;Air Quality
          </Typography>

          <hr
            className='speration_line'
            style={{
              lineHeight: '2px',
              borderLeft: '20px solid #ddd',
              borderRight: '20px solid #ddd',
              borderTop: '1px solid #3f51b5',
              borderBottom: '1px solid #3f51b5',
              textAlign: 'left'
            }}
          />

          <p className='weather__span'>
            <text className='weather__text'>&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <i class='fas fa-angle-double-left' />
            <span className='weather__key'>
              West:{' '}
              <text className='weather__text'>{this.props.west} μg/m³</text>
            </span>
          </p>

          <p className='weather__span'>
            <text className='weather__text'>&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <i class='fas fa-angle-double-right' />
            <span className='weather__key'>
              East:{' '}
              <text className='weather__text'>{this.props.east} μg/m³</text>
            </span>
          </p>

          <p className='weather__span'>
            <text className='weather__text'>&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <i class='fas fa-angle-double-up' />
            <span className='weather__key'>
              North:{' '}
              <text className='weather__text'>{this.props.north} μg/m³</text>
            </span>
          </p>

          <p className='weather__span'>
            <text className='weather__text'>&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <i class='fas fa-angle-double-down' />
            <span className='weather__key'>
              South:{' '}
              <text className='weather__text'>{this.props.south} μg/m³</text>
            </span>
          </p>

          <p className='weather__span'>
            <text className='weather__text'>&nbsp;&nbsp;&nbsp;&nbsp;</text>
            <i class='fas fa-arrows-alt' />
            <span className='weather__key'>
              Central:{' '}
              <text className='weather__text'>{this.props.central} μg/m³</text>
            </span>
          </p>
        </body>
      </div>
    );
  }
}

export default AirQuality;
