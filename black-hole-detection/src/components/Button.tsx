interface ButtonProps {
  onClick: () => void;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  buttonText?: string;
}

export default function Button({
  onClick,
  backgroundColor = "#04AA6D",
  color = "white",
  fontSize = "16px",
  buttonText = "Click Me"
}: ButtonProps) {
  return (
    <div>
      <button style={{
        backgroundColor,
        border: "none",
        color,
        padding: "15px 32px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize,
        margin: "4px 2px",
        cursor: "pointer"
      }} onClick={onClick}>{buttonText}</button>
    </div>
  );
}