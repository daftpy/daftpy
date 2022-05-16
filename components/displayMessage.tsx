interface Props {
  message: string;
}

const DisplayMessage = (props: Props): JSX.Element => {
  return (
    <div>
      <p>{ props.message }</p>
    </div>
  )
}

export default DisplayMessage;
