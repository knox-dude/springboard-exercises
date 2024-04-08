interface CardProps {
  "code": string,
  "image": string,
  "value": string,
  "suit": string,
}

function Card({ image, value, suit }: CardProps) {
  return (
    <div className="Card">
      <img src={image} alt={value} />
      <div className="Card-text">You drew a {value} of {suit}!</div>
    </div>
  )
}

export default Card