import { useState, useEffect } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Table from "react-bootstrap/Table";

const ItemList = (props) => {
  //json 데이터 저장 state
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/posts");
        const json = await response.json();
        // data에 json 값 저장
        setData(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return (
    <>
      <div class="container my-3">
        <table class="table table-bordered">
          <thead>
            <tr class="table-dark">
              <th>index</th>
              <th>machinery</th>
              <th>assembly</th>
              <th>items</th>
              <th>part1</th>
              <th>predicted</th>
              <th>key2</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.index}</td>
                <td>{item.machinery}</td>
                <td>{item.assembly}</td>
                <td>{item.items}</td>
                <td>{item.part1}</td>
                <td>{item.predicted}</td>
                <td>{item.key2}</td>
              </tr>
            ))}
          </tbody>
          <button type="submit">Submit</button>
        </table>
      </div>
    </>
  );
};

export default ItemList;
