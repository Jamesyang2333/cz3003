import React from 'react';
import * as styles from './footer.scss';

const Footer = () => (
  <div className={styles.container}>
    <div className={styles.left}>10am &copy; 2019. Made with ❤️.</div>
    <div className={styles.right}>
      Follow us on <a href='https://www.facebook.com/'>Facebook</a> and{' '}
      <a href='https://twitter.com/'>Twitter</a> to receive latest crisis
      updates!
    </div>
  </div>
);

export default Footer;
