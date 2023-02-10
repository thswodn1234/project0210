import "react-calendar/dist/Calendar.css";
import React, { useState, createContext, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import Lead from "./Items";
import MyModal from "./Visual";
import "react-datepicker/dist/react-datepicker.css";
import "./selectMain.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

//데이터를 이동하기 위해 useContext를 사용
export const AppContext = createContext();

function SelectDate() {

  const [lead, setLead] = useState();
  const [startDate, setStartDate] = useState();
  const [visible, setVisible] = useState(true);
  useEffect(()=>{
    setStartDate(lead?.[0]["order_date"])
    setVisible(!visible) 
  },[lead])

  const d1 = [];
  // let a = 100;
  
  let a = startDate;
  let b = lead?.[0]["avg_leadtime"];
  let t = b;

  let y = parseInt(t / 365);
  let m = parseInt((t % 365) / 30);
  let d2 = parseInt((t % 365) % 30);

  return (
    <AppContext.Provider value={[lead, setLead]}>
    <Container>
      <Row>
        <Col>
        <div className="top">
        · 리드타임 예측 서비스입니다. <br/><br/>
        · Order To - 발주처를 입력하십시오.<br/>
        · MACHINERY - 부품 대분류를 선택하십시오.<br/>
        · Description - 부품을 선택하십시오.<br/>
        · Part NO - 부품 번호를 선택하십시오.<br/>
        · Order Date - 주문 예상일자를 입력하십시오.<br/>
        · Qty - 주문 수량을 입력하십시오.<br/><br/>
        </div>
        <font color = "gray">
        · submit 버튼을 클릭하시면 도착예상일자를 조회하실 수 있습니다.<br/>
        · 시각화 버튼을 클릭하시면 과거 도착 이력을 그래프로 조회하실 수 있습니다.
        </font>
        </Col>
      </Row>
      <Row>
        <Col><Lead /></Col>
        <Col>
        <Calendar
          value={moment(startDate).add(lead?.[0]["avg_leadtime"], 'days')['_d']}
          locale="en-EN"
          tileClassName={({ date, view }) => {
            if (
              d1.find(
                (x) =>
                  moment(x).format("DD-MM-YYYY") ===
                  moment(date).format("DD-MM-YYYY")
              )
            ) {
              // d1 안의 날짜 하이라이트
              return "highlight";
            }
          }}
        />
        <br/>
        {visible && <div>
          예상 리드타임은 {`${y}year ${m}month ${d2}day`} 입니다.<br/>
          발주일이 {moment(a).format("YYYY년 MM월 DD일")}이라면 <br/>
          {moment(startDate).add(b, "days").format("YYYY년 MM월 DD일")}에 입고예정입니다.
        </div>}
        
        <MyModal props={lead} />
        </Col>        
      </Row>
    </Container>        
    </AppContext.Provider>
  );
}

export default SelectDate;
