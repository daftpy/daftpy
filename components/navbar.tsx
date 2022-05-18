import Link from 'next/link';
import styles from '../styles/components/Navbar.module.css';

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
          {props.home != true && 
            <Link href="/">
              <a>
                <span
                  className="text-3xl font-bold text-slate-300"
                >
                  Daftpy {props.home}
                </span>
              </a>
            </Link>
          }
        </div>
        <div 
          id={styles.NavItems}
          className="font-bold text-slate-300"
        >
          <Link href="/posts">
            <a>Blog</a>
          </Link>
          <Link href="/projects">
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