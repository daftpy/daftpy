import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

interface Props {
  home?: boolean;
}

const Navbar = (props: Props): JSX.Element => {
  return (
    <div
      id={styles.NavbarWrapper}
    >
      <div id={styles.Navbar}>
        <div id={styles.Branding}>
          {props.home === true &&
            <span
              className="text-3xl font-bold text-slate-300"
            >
              Daftpy {props.home}
            </span>
          }
        </div>
        <div 
          id={styles.NavItems}
          className="font-bold text-slate-300"
        >
          <Link href="#">
            <a>Blog</a>
          </Link>
          <Link href="#">
            <a>Projects</a>
          </Link>
          <Link href="#">
            <a>Contact</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;