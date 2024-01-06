import { useState } from "react";
import { IGovernment } from "../interfaces/government.interface";
import { IMachine } from "../interfaces/mahine.interface";
import { IUser } from "../interfaces/user.interface";

type Props = {
  user: IUser;
  governments?: IGovernment[];
  machineCanUse?: IMachine[];
  onClickCancel: () => void;
  onClickBack: () => void;
  onClickDelete?: (_id: string | any) => void;
  onAddMachine: (_governmentId: string, _machineId: string) => void;
  onDropMachine: (_governmentId: string, _machineId: string) => void;
};

export default function TableGovernmentComponent(props: Props) {
  const [isSelectAdd, setIsSelectAdd] = useState<boolean>(false);
  const [isSelectDel, setIsSelectDel] = useState<boolean>(false);
  const [seletedGovernment, setSeletedGovernment] = useState<IGovernment>();
  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: "5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "2%",
          right: "1%",
        }}
        >
        <button
          style={{
            borderRadius: "50px",
            background: "#ff6f00",
            width: "160px",
            padding: "6%",
            textAlign: "center",
            fontSize: "24px",
            cursor: "pointer",
          }}
          onClick={() => props.onClickBack()}
          >
          Users
        </button>
      </div>
      {isSelectAdd && (
        <div
        style={{
          position: "absolute",
          top:"50%",
          left:"50%",
          transform:"translate(-50%,-50%)",
          zIndex:1000,
        }}
        
        >
          <select
            onChange={(e) => {
              props.onAddMachine(seletedGovernment!._id, e.target.value);
              console.log(seletedGovernment!._id, e.target.value);
              setIsSelectAdd(false);
              setSeletedGovernment(undefined);
            }}
            style={{
              width: '500px',
              padding: '8px',
              fontSize: '36px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none',
            }}
          >
            <option value={""}>Select a value</option>
            {props.machineCanUse?.map((machine: IMachine) => (
              <option key={machine._id} value={machine._id}>
                {machine.macAddress}
              </option>
            ))}
          </select>
        </div>
      )}
      {isSelectDel && (
        <div
        style={{
          position: "absolute",
          top:"50%",
          left:"50%",
          transform:"translate(-50%,-50%)",
          zIndex:1000,
        }}
        >
          <select
            onChange={(e) => {
              props.onDropMachine(seletedGovernment!._id, e.target.value);
              setIsSelectDel(false);
              setSeletedGovernment(undefined);
            }}
            style={{
              width: '500px',
              padding: '8px',
              fontSize: '36px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none',
            }}
          >
            <option value={""}>Select a value</option>
            {seletedGovernment?._machineListId.map((machine: IMachine) => (
              <option key={machine._id} value={machine._id}>
                {machine.macAddress}
              </option>
            ))}
          </select>
        </div>
      )}
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
          onClick={() => {
            if (isSelectAdd || isSelectDel) {
              setIsSelectAdd(false);
              setIsSelectDel(false);
              setSeletedGovernment(undefined);
              return;
            }
            props.onClickCancel()
          }}
        >
          Close
        </button>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          background: "#FFFFFF",
          borderRadius: "50px",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "95%",
            height: "90%",
            borderRadius: "20px",
            background: "linear-gradient(180deg, #86DCAD 50%, #E9F191 100%)",
            display: "block",
            paddingTop: "1%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "48px",
                paddingLeft: "2%",
              }}
            >
              Dashboard Government
            </h1>
            <h1
              style={{
                paddingRight: "2%",
                fontSize: "48px",
              }}
            >
              Hello {props.user.username} !
            </h1>
          </div>
          <div
            style={{
              display: "block",
              justifyContent: "center",
              padding: "1%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                background: "#FFFFFF",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  flex: 1,
                }}
              >
                <h1>number</h1>
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  flex: 3,
                }}
              >
                <h1>government</h1>
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  flex: 2,
                }}
              >
                <h1>machine</h1>
              </div>
              <div
                style={{
                  width: "8%",
                }}
              />
            </div>
            <div
              style={{
                height: "calc(58vh - 40px)",
                overflowY: "scroll",
              }}
            >
              {props.governments?.map((government: IGovernment, index: any) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "10px",
                    background:
                      index % 2 === 0 ? "" : "rgba(245, 245, 245, 0.5)",
                  }}
                  key={index}
                >
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      flex: 1,
                    }}
                    onClick={() => props.onClickDelete!(government._id)}
                  >
                    <h1>{index + 1}</h1>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      flex: 3,
                    }}
                  >
                    <h1>{government.name}</h1>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      flex: 2,
                    }}
                  >
                    {government._machineListId.map((machine: IMachine) => (
                      <div>
                        <h1>{machine.macAddress}</h1>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      width: "8%",
                    }}
                  >
                    <div
                      style={{
                        background: "#02ab2c",
                        borderRadius: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "3px",
                      }}
                      onClick={() => {
                        setSeletedGovernment(government);
                        setIsSelectAdd(true);
                      }}
                    >
                      <h1>add</h1>
                    </div>
                    <div
                      style={{
                        background: "#ed2b2b",
                        borderRadius: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "3px",
                        marginTop: "8px",
                      }}
                      onClick={() => {
                        setSeletedGovernment(government);
                        setIsSelectDel(true);
                      }}
                    >
                      <h1>del</h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
