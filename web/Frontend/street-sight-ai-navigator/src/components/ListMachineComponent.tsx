import { IMachine } from "../interfaces/mahine.interface";

type Props = {
  machinehas: IMachine[];
  machineCanUse: IMachine[];
  onClickCancel: () => void;
  onAddMachine: (_id: string) => void;
  onDropMachine: (_id: string) => void;
};

export default function ListMachineComponent(props: Props) {
  return (
    <>
          <div
        style={{
          position: "absolute",
          bottom: "2%",
          left: "1%",
        }}
      >
        <button
          style={{
            borderRadius: "50px",
            background: "#f44336",
            width: "120px",
            padding: "6%",
            textAlign: "center",
            fontSize: "24px",
            cursor: "pointer",
          }}
          onClick={() => props.onClickCancel()}
        >
          Close
        </button>
      </div>
    <div
      style={
        {
          zIndex: 100,
          position: "absolute",
          bottom: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }
      }
      >
      <select
        style={{
          width: "100%",
          borderRadius: "20px",
          background: "#FFFFFF",
          border: "0px solid #FFFFFF",
          boxSizing: "border-box",
          fontSize: "24px",
          padding: "2% 5%",
          marginBottom: "2%",
        }}
        value={""}
        onChange={(e: any) => {
          const filteredData = props.machinehas.filter(
            (machine: IMachine) => machine._id === e.target.value
            );
            if (filteredData.length > 0) {
              props.onDropMachine(e.target.value);
            } else {
              props.onAddMachine(e.target.value);
            }
            props.onClickCancel()
          }}
          >
        <option value="" selected={true}>
          Add machine
        </option>
        {props.machineCanUse.map((machine: IMachine, index: number) => (
          <option key={index} value={machine._id}>
            {machine.macAddress}
          </option>
        ))}
        {props.machinehas.map((machine: IMachine, index: number) => (
          <option
          style={{
            color: "#67e30e",
          }}
          key={index}
          value={machine._id}
          >
            {machine.macAddress} used
          </option>
        ))}
      </select>
    </div>
        </>
  );
}
