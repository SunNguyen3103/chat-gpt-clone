import "./App.scss";
import { useState, useEffect } from "react";
function App() {
  const [value, setValue] = useState("null");
  const [message, setMessage] = useState("null");
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState([]);
  const getMessage = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      setMessage(data.choices[0].message);
      console.log("data", data);
    } catch (error) {
      console.log("arrorMessage", error);
    }
  };
  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && message && value) {
      setPreviousChats((previousChats) => [
        ...previousChats,
        { title: currentTitle, content: value, role: "user" },
        { title: currentTitle, content: message.value, role: message.role },
      ]);
      setValue("");
      setMessage("");
    }
  }, [message, currentTitle, value]);
  const currentChat = previousChats.filter(
    (previousChats) => previousChats.title === currentTitle
  );
  const uniqueTitle = Array.from(
    new Set(previousChats.map((item) => item.title))
  );
  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };
  return (
    <div className="container">
      <section className="side-bar">
        <button className="btn-add">+ New chat</button>
        <ul className="history">
          <li className="history-item">
            {uniqueTitle?.map((item, index) => (
              <li onClick={() => handleClick(item)} key={index}>
                {item}
              </li>
            ))}
          </li>
        </ul>
        <nav>
          <p>make by NhatNguyen</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>chatgpt</h1>}

        <ul className="feed">
          {currentChat.map((item, index) => (
            <li
              key={index}
              // className={`feed-item ${item.role}`}
            >
              <p>{item.role}</p>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <button className="submmit" onClick={getMessage}>
              submit
            </button>
          </div>
          <p className="info">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
            corporis, error soluta, tenetur tempore beatae id maiores eveniet
            quis commodi vitae quos. Nisi quasi magni porro voluptates adipisci
            aliquam assumenda?
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
