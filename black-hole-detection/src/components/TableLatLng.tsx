interface holdImages {
    _id: string
    path: string
    position: {
        lat: number
        lng: number
    }
}

export default function TableLatLng(holds: holdImages[] | any) {
    return (
        <div style={{
            width: 700,
            height: 900,
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            boxSizing: 'border-box',
            overflowY: 'auto'

        }}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: '1px solid black',
                backgroundColor: "#FFFF",
                fontFamily: 'Arial, sans-serif',

            }}>
                <thead>
                    <tr style={{ backgroundColor: '#03adfc' }}>
                        <th style={{ padding: '12px', border: '1px solid black', textAlign: 'left' }}>number</th>
                        <th style={{ padding: '12px', border: '1px solid black', textAlign: 'left' }}>Latitude</th>
                        <th style={{ padding: '12px', border: '1px solid black', textAlign: 'left' }}>Longitude</th>
                    </tr>
                </thead>
                <tbody>
                    {holds.holds!.map((hold: any, index: any) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'transparent', color: "#000000" }}>
                            <td style={{ padding: '12px', border: '1px solid black' }}>{index + 1}</td>
                            <td style={{ padding: '12px', border: '1px solid black' }}>{hold.position.lat}</td>
                            <td style={{ padding: '12px', border: '1px solid black' }}>{hold.position.lng}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}