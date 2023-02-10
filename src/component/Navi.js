import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../Img/mlogo.png";

//페이지 상당의 네비게이션바
function Navi() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/">
              <img src={logo} alt="로고 이미지 입니다" />
            </Nav.Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Select</Nav.Link>
            <Nav.Link href="/Order">Order</Nav.Link>
            <Nav.Link href="/Analyze">Analyze</Nav.Link>
            <Nav.Link href="/Log">History</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default Navi;
