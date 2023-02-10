import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router';

//선택된 청구품목 목록을 따로 출력
function OrderList(){
  //useLocation을 사용해 넘어온 router로 넘어온 props정보를 활용가능
  const location = useLocation();
  return(
    <>
      <h3>OrderList</h3>
      <Table striped bordered hover>
      <thead>
        <tr>
          {/* <th>#</th> */}
          <th>Machinery</th>
          <th>청구품목</th>
          <th>Part.No</th>
          <th>카테고리</th>
          <th>발주처</th>
          <th>리드타임</th>
        </tr>
      </thead>
      <tbody >
        {location.state?.map((item, index) => (
            <tr key={index}>
              <td>{item.machinery}</td>
              <td>{item.items}</td>
              <td>{item.part1}</td>
              <td>{item.key2}</td>
              <td>{item.baljucheo}</td>
              <td>{item.leadtime}</td>
            </tr>
          ))}
      </tbody>
      <Button variant="dark" className="autobutt">Submit</Button>
    </Table>
    </>
  );
}
export default OrderList;