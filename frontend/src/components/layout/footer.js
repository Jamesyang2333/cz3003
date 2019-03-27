import React from 'react';
import * as styles from './footer.scss';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles';
import Typogrphy from '@material-ui/core/Typography';

const style = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

function Footer(props) {
  const { classes } = props;
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Typogrphy>10am &copy; 2019. Made with ❤️.</Typogrphy>
      </div>
      <div className={styles.right}>
        <Typogrphy>
          Follow us on
          <Button href='https://www.facebook.com/'>Facebook</Button>and
          <Button href='https://twitter.com/'>Twitter</Button>
          to receive latest crisis updates!
        </Typogrphy>
      </div>
    </div>
  );
}

export default Footer;
