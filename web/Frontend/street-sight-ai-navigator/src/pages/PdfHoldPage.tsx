import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  Font,
  Image,
} from "@react-pdf/renderer";
import { API_BASE_URL } from "../constants";
import { IHold } from "../interfaces/hold.interface";
import { useContext, useEffect, useState } from "react";
import { ApiResponse } from "../interfaces/gobal.interface";
import { getHoldsApi } from "../services/hold.service";
import { AuthContext } from "../contexts/AuthContext";

Font.register({
  family: "THSarabun",
  src: "./assets/fonts/THSarabun.ttf",
});

function PdfHoldPage() {
  const { user } = useContext(AuthContext);
  const [holds, setHolds] = useState<IHold[]>();

  const fetchHolds = async () => {
    const response: ApiResponse<IHold> = await getHoldsApi(user!.token!);
    if (!response.status) {
      return;
    }
    return setHolds(response.data);
  };

  useEffect(() => {
    fetchHolds();
  }, []);

  return (
    <PDFViewer
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
      }}
    >
      <Document>
        <Page
          style={{
            fontFamily: "THSarabun",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: "#F1F1F1",
              textAlign: "center",
            }}
          >
            <View
              style={{
                border: "1px solid black",
                flex: 1,
                paddingVertical: 8,
              }}
            >
              <Text>ลำดับ</Text>
            </View>
            <View
              style={{
                border: "1px solid black",
                flex: 2,
                paddingVertical: 8,
              }}
            >
              <Text>ละติจูด</Text>
            </View>
            <View
              style={{
                border: "1px solid black",
                flex: 2,
                paddingVertical: 8,
              }}
            >
              <Text>ลองจิจูด</Text>
            </View>
            <View
              style={{
                border: "1px solid black",
                flex: 6,
                paddingVertical: 8,
              }}
            >
              <Text>ที่อยู่</Text>
            </View>
            <View
              style={{
                border: "1px solid black",
                flex: 5,
                paddingVertical: 8,
              }}
            >
              <Text>รูปภาพ</Text>
            </View>
          </View>
          {holds?.map((hold: IHold, index: number) => (
            <View
              key={hold._id}
              style={{
                flexDirection: "row",
                backgroundColor: index % 2 == 0 ? "#FFFFFF" : "#F1F1F1",
                textAlign: "center",
                marginTop:index == 14 ? 25 : 0,
              }}
              >
              <View
                style={{
                  flex: 1,
                  paddingVertical: 5,
                  border: "1px solid black",
                }}
              >
                <Text>{index + 1}</Text>
              </View>
              <View
                style={{
                  flex: 2,
                  paddingVertical: 5,
                  border: "1px solid black",
                }}
              >
                <Text>{hold.position.lat}</Text>
              </View>
              <View
                style={{
                  flex: 2,
                  paddingVertical: 5,
                  border: "1px solid black",
                }}
              >
                <Text>{hold.position.lng}</Text>
              </View>
              <View
                style={{
                  flex: 6,
                  paddingVertical: 5,
                  border: "1px solid black",
                }}
              >
                <Text>{hold.address}</Text>
              </View>
              <View
                style={{
                  flex: 5,
                  paddingVertical: 5,
                  border: "1px solid black",
                }}
              >
                <Image
                  source={`${API_BASE_URL}/holds/img?pathImg=${hold.path}`}
                />
              </View>
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default PdfHoldPage;
