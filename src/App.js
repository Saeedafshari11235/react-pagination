import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedTodo, setPaginatedTodo] = useState([]);

  let pageSize = 10;
  let pageNumber;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
        let endIndex = pageSize * currentPage;
        let startIndex = endIndex - pageSize;
        let shownTodo = data.slice(startIndex, endIndex);
        setPaginatedTodo(shownTodo);
      });
  }, []);

  const pageCount = Math.ceil(todo.length / pageSize);
  pageNumber = Array.from(Array(pageCount).keys());

  const changePagination = (page) => {
    setCurrentPage(page + 1);
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    let shownTodo = todo.slice(startIndex, endIndex);
    console.log(shownTodo)
    setPaginatedTodo(shownTodo)
  };

  return (
    <div>
      {!todo ? (
        "Loading"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTodo.map((item) => (
              <tr key={todo.id}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>
                  <p
                    className={
                      item.completed ? "btn btn-success" : "btn btn-danger"
                    }
                  >
                    {item.completed ? "Completed" : "Pending"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination pagination-lg">
          {pageNumber.map((item) => (
            <li
              key={item + 1}
              className={`page-item ${
                currentPage === item + 1 ? "active" : ""
              }`}
              onClick={() => changePagination(item)}
            >
              <span className="page-link">{item + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default App;
