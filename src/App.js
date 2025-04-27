import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [paginatedTodo, setPaginatedTodo] = useState([]);

  useEffect(() => {
    setIsPending(true);
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
        setIsPending(false);
        console.log(data);
      });
  }, []);

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
            {todo.map((item) => (
              <tr>
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
          <li className="page-item active" aria-current="page">
            <span className="page-link">1</span>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">
              3
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
