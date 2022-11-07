import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/"
      );
      // const newData = await data.json();
      setData(data);
    };
    fetchData();
  }, []);

  const flag = useRef(false);

  const ageHandler = (e) => {
    setAge(e.target.value);
  };
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const submitHandler = () => {
    setData((prev) => [
      ...prev,
      { id: prev.length + 1, title: `${name} ${age}` },
    ]);
    flag.current = true;
  };
  return (
    <div className='App'>
      <div className='form'>
        <TextField
          label='Name'
          variant='outlined'
          value={name}
          onChange={nameHandler}
          inputProps={{ "data-testid": "name" }}
        />
        <TextField
          label='Age'
          variant='outlined'
          value={age}
          onChange={ageHandler}
          inputProps={{ "data-testid": "age" }}
        />

        <Button
          data-testid='submit-button'
          onClick={submitHandler}
          variant='contained'
          color='success'
        >
          Submit
        </Button>
      </div>
      {flag.current && (
        <>
          <p data-testid='entered-name'>Name: {name}</p>
          <p data-testid='entered-age'>Age: {age}</p>
        </>
      )}
      {data?.map((val) => (
        <p key={val?.id} data-testid='post-title'>
          {val?.title}
        </p>
      ))}
    </div>
  );
}

export default App;
