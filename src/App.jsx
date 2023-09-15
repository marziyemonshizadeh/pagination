import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  //alltodos
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //items i wanna show
  const [paginatedTodos, setPaginatedTodos] = useState([]);

  let pageSize = 10;
  let pagesNumbers;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((datas) => {
        setTodos(datas);
        let endIndex = pageSize * currentPage;
        let startIndex = endIndex - pageSize;
        let allShowTodos = datas.slice(startIndex, endIndex);
        // console.log(allShowTodos);
        setPaginatedTodos(allShowTodos);
      });
  }, []);

  //fix bug => setstate is async but js is sync
  useEffect(() => {
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    let allShowTodos = todos.slice(startIndex, endIndex);
    setPaginatedTodos(allShowTodos);
  }, [currentPage]);

  const changePaginate = (newPage) => {
    setCurrentPage(newPage);
  };

  const pagesCount = Math.ceil(todos.length / pageSize);
  pagesNumbers = Array.from(Array(pagesCount).keys());
  return (
    <>
      <h3 className="mb-4">My Pagination Project :)</h3>
      <div
        className="shadow-sm p-3 mb-5 rounded"
        style={{
          backgroundColor: "#f0ddb6",
        }}
      >
        {!todos ? (
          "Loading"
        ) : (
          <table className="table fst-italic">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {paginatedTodos.map((todo) => (
                <tr key={todo.id} className="fst-italic">
                  <td>{todo.id}</td>
                  <td>{todo.userId}</td>
                  <td className="text-capitalize">
                    {todo.title}
                    {/* I make the first letter of a string uppercase */}
                    {/* {todo.title.charAt(0).toUpperCase() + todo.title.slice(1)} */}
                  </td>
                  <td>
                    <p
                      className={
                        todo.completed ? "text-success" : "text-danger"
                      }
                    >
                      {todo.completed ? "Completed" : "Pending"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <nav className="d-flex justify-content-center">
        <ul className="pagination flex-wrap" aria-current="page">
          {pagesNumbers.map((pageNumber) => (
            <li
              style={{ cursor: "pointer" }}
              className={
                pageNumber + 1 === currentPage
                  ? "page-item active"
                  : "page-item"
              }
              key={pageNumber + 1}
              onClick={() => changePaginate(pageNumber + 1)}
            >
              <span className="page-link">{pageNumber + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default App;
