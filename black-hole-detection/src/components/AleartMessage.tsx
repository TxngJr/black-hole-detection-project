import { useEffect, useState } from "react";

interface AlertMessageProps {
    message: string;
}

export default function AleartMessage({ message }: AlertMessageProps) {
    const [opacity, setOpacity] = useState<number>(3);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(0);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
    return (
        <div
            style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: '#A9E37C',
                padding: '20px',
                borderRadius: '5px',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
                opacity,
                transition: 'opacity 1s',
            }}
        >
            <p>{message}</p>
        </div>
    );
}