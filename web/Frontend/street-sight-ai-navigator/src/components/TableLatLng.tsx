import { IHold } from "../interfaces/hold.interface"

export default function TableLatLng(holds: IHold[] | any) {
    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            boxSizing: 'border-box',
            overflowY: 'scroll',
            height: 'calc(100vh - 40px)',
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
                        <th style={{ padding: '12px', border: '1px solid black', textAlign: 'center' }}>number</th>
                        <th style={{ padding: '12px', border: '1px solid black', textAlign: 'center' }}>address</th>
                        <th style={{ padding: '12px', border: '1px solid black', textAlign: 'center' }}>Latitude</th>
                        <th style={{ padding: '12px', border: '1px solid black', textAlign: 'center' }}>Longitude</th>
                        <th style={{ padding: '12px', border: '1px solid black', textAlign: 'center' }}>img</th>
                    </tr>
                </thead>
                <tbody>
                    {holds.holds!.map((hold: any, index: any) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'transparent', color: "#000000" }}>
                            <td style={{ padding: '12px', border: '1px solid black', textAlign: 'center' }}>{index + 1}</td>
                            <td style={{ padding: '12px', border: '1px solid black', textAlign: 'center' }}>{hold.address}</td>
                            <td style={{ padding: '12px', border: '1px solid black', textAlign: 'center' }}>{hold.position.lat}</td>
                            <td style={{ padding: '12px', border: '1px solid black', textAlign: 'center' }}>{hold.position.lng}</td>
                            <td style={{ padding: '12px', border: '1px solid black', textAlign: 'center' }}><img
                                style={{
                                    width: '80%',
                                    height: 'auto',
                                    display: 'block',
                                    margin: '0 auto',
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    overflow: "hidden",
                                    objectFit: "cover"
                                }}
                                alt={`Image ${hold._id}`}
                                src={`http://192.168.1.45:3000/holds/img?pathImg=${hold.path}`} // must change to your ip
                            /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}