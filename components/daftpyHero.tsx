import Image from 'next/image';
import styles from '../styles/DaftpyHero.module.css';

interface Props {
  text: string;
  subText?: string;
}

const DaftpyHero = (props: Props):JSX.Element => {
  return (
    <div id={styles.DaftpyHero}>
      <Image
        id={styles.HeroImg}
        priority
        src="/images/profile.jpg"
        className="rounded-full"
        height={190}
        width={190}
        alt="Daftpy"
      />
      <div
        id={styles.HeroMessage}
        className="px-4"
      >
        <div className="text-lg font-bold"><p>{ props.text }</p></div>
        <div className="text-sm"><p>{ props.subText }</p></div>
      </div>
    </div>
  )
}

export default DaftpyHero;