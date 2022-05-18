import styles from "../styles/components/Tags.module.css"

interface Props {
  tags: string[];
}

const Tags = (props: Props): JSX.Element => {
  return (
    <div>
      <div id={styles.Tags} className="font-medium">
        {props.tags.map((tag, i) => (
          <div key={tag} className="bg-amber-600 text-white drop-shadow-md text-shadow px-2 rounded-md">{ tag }</div>
        ))}
      </div>      
    </div>
  )
}

export default Tags;
