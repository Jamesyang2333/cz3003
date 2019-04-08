import React from 'react';
import * as styles from './footer.scss';
import Button from '@material-ui/core/Button';
import Typogrphy from '@material-ui/core/Typography';

function Footer(props) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Typogrphy>
          10am &copy; 2019. Made with <span role='img'>❤️</span> .
        </Typogrphy>
      </div>
      <div className={styles.right}>
        <Typogrphy>
          Follow us on
          <Button
            target='_blank'
            href='https://www.facebook.com/pg/Crisis-Management-System-2014978618798697/posts'>
            Facebook
          </Button>
          and
          <Button target='_blank' href='https://t.me/cms12345'>
            Telegram
          </Button>
          to receive latest crisis updates!
        </Typogrphy>
      </div>
    </div>
  );
}

export default Footer;
