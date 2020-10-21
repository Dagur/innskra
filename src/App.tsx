import React, { FormEvent } from 'react';
import './App.css';

function App() {
  const [name, setName] = React.useState("");

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = (event: FormEvent) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "innskra", name })
    })
      .then(() => alert("Takk fyrir og góða skemmtun"))
      .catch(error => alert(error));

    event.preventDefault();
  };

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Nafn: <input
              type="text"
              name="name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </label>
        </p>
        <p>
          <button type="submit">Innskrá</button>
        </p>
      </form>

    </div>
  );
}

export default App;
