import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-js-pagination";
import Button from "react-bootstrap/Button";
import "./Paging.css";
import "./Autosearch.css";
import { Link } from "react-router-dom";
import { getAutoSearch, getSelectList } from "../../API/main";

//자동 검색 기능 및 검색결과 출력 화면
const Autosearch = () => {
  const [datas, setDatas] = useState();
  const [data, setData] = useState(null);
  const [list, setList] = useState();
  const [searchList, setSearchList] = useState();
  const [Selected, setSelected] = useState("");
  const [rowdata, setRowdata] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    //자동완성 목록 출력을 위한 row data
    (async () => {
      await getSelectList().then((res) => setDatas(res));
    })();
    //TypeError: (intermediate value)... => 함수와 함수사이에 ';' (세미콜론)이 빠지면 발생하는 에러

    //검색결과 출력을 위한 row data
    (async () => {
      await getAutoSearch().then((res) => setList(res));
    })();
  }, []);

  //검색조건 리스트
  const selectList = ["===선택===", "machinery", "items", "part1"];

  // 중복을 제거한 machinery값을 저장하기위한 배열
  let options = [];

  //검색조건(selectList)하면 발생 이벤트
  const handleSelect = (e) => {
    //선택한 조건 저장
    setSelected(e.target.value);

    //조건 선택하면 자동완성목록 띄우기 위한 데이터 정제(선택된 필드 추출 및 중복제거)
    if (e.target.value === "machinery") {
      setData([...new Set(datas.map((item) => item.machinery))]);
    } else if (e.target.value === "items") {
      setData([...new Set(datas.map((item) => item.items))]);
    } else {
      setData([...new Set(datas.map((item) => item.part1))]);
    }
  };

  //  options라는 배열에 중복제거한 값 저장
  for (let item in data) {
    options.push(data[item]);
  }

  //검색창에 입력값이 변할때 발생하는 이벤트(입력)
  const handleChange = (event) => {
    //현재 검색어를 저장
    setSelectedOption(event.target.value);
  };

  //검색어 입력 후 버튼 클릭할때 이벤트
  const searchData = (event) => {
    event.preventDefault();
    //중복제거 값에서 검색결과만 출력(검색어가 포함된 모든 단어 포함 가능)
    setSearchResults(
      options.filter((option) => option.includes(selectedOption))
    );
  };

  //검색어가 submit 되어 searchResults값이 변경되면 실행
  useEffect(() => {
    //검색결과가 하나로 확정되었을때만 실행하는것으로 변경하였음
    //검색어가 포함된 모든 항목 출력도 가능하다.
    if (searchResults.length === 1) {
      //list = 검색결과 출력을 위한 row data
      //list에서 선택된 검색조건, 검색어와 일치하는 항목을 필터링
      if (Selected === "machinery") {
        setSearchList(
          list.filter((item) => item.machinery.includes(searchResults))
        );
      } else if (Selected === "items") {
        setSearchList(
          list.filter((item) => item.items.includes(searchResults))
        );
      } else {
        setSearchList(
          list.filter((item) => item.part1.includes(searchResults))
        );
      }
    }
  }, [searchResults]);

  //페이징 기능 구현
  const [page, setPage] = useState(1); //현재 페이지
  const [count, setCount] = useState(0); //아이템 총 개수
  const [postPerPage] = useState(10); //페이지당 보여질 아이템 개수
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); //현재 페이지의 마지막 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들

  //페이지 구현
  useEffect(() => {
    setCount(searchList?.length);
    setIndexOfLastPost(page * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(searchList?.slice(indexOfFirstPost, indexOfLastPost));
  }, [page, indexOfFirstPost, indexOfLastPost, searchList, postPerPage]);

  //페이지 변경 버튼 클릭 시 이벤트
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="aWrapper">
        <div className="autosearch">
          <form className="wrapper" onSubmit={searchData}>
            <select onChange={handleSelect}>
              {selectList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <input
              className="autoinput"
              list="options"
              value={selectedOption}
              onChange={handleChange}
            />
            <datalist id="options">
              {/* options라는 배열의 요소를 option태그 의 value 값에 넣기 */}
              {options.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
            <Button variant="dark" className="autobutt" type="submit">
              Submit
            </Button>
          </form>
        </div>

        <div className="tWrapper">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Machinery</th>
                <th>청구품목</th>
                <th>Part.No</th>
                <th>카테고리</th>
                <th>발주처</th>
                <th>리드타임</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts && searchList.length > 0 ? (
                currentPosts.map((item, index) => (
                  //검색결과 테이블 클릭한 행의 정보를 저장
                  <tr
                    key={index}
                    onClick={() => setRowdata((rowdata) => [...rowdata, item])}>
                    <td>{item.machinery}</td>
                    <td>{item.items}</td>
                    <td>{item.part1}</td>
                    <td>{item.key2}</td>
                    <td>{item.baljucheo}</td>
                    <td>{item.leadtime}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>검색결과가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div>
          <Pagination
            activePage={page} // 현재 페이지
            itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={count ? count : 0} // 총 아이템 갯수
            pageRangeDisplayed={5} // paginator의 페이지 범위
            prevPageText={"‹"} // "이전"을 나타낼 텍스트
            nextPageText={"›"} // "다음"을 나타낼 텍스트
            onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
          />
        </div>

        <div className="tWrapper2">
          <Table className="tContainer2" striped bordered hover>
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
            <tbody>
              {rowdata?.map((item, index) => (
                //테이블 클릭하여 저장된 정보를 새로운 테이블로 출력(장바구니 같은 개념으로 생각중)
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
          </Table>
        </div>
        {/* 선택되어 따로 생성된 테이블의 정보를 OrderList로 전송(장바구니 목록 결제하는 느낌)
      #state를 사용하면 link를 이용해서도 props를 전송 */}
        <Link to="/OrderList" state={rowdata}>
          <Button variant="dark" className="autobutt">
            발주
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Autosearch;
