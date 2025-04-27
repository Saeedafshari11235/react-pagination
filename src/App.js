import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [isPending, setIsPending] = useState(true);

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
    <div className="App">
    </div>
  );
}

export default App;
