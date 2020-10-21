import React, { FormEvent } from 'react';
import './App.css';

const encode = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

function App() {
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [generalError, setGeneralError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = React.useState(true);
  const [submitCompleted, setSubmitCompleted] = React.useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name) {
      setNameError("Nafn vantar");
      return;
    }
    setNameError("");
    setIsSubmitEnabled(false);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "innskra", name, message })
    })
      .then(response => {
        if (!response.ok) {
          setGeneralError("Upp kom villa. Vinsamlegast láttu vita af þér með öðrum hætti.")
          return;
        } 
        setGeneralError("")
        setSubmitCompleted(true)      
      })
      .catch(error => alert(error))
      .finally(() => setIsSubmitEnabled(true));


  };

  return (
    <div className="App main">

      <img src="./FGRlogo.png" alt="FGR logo" />

      <p>Innskráning í mót</p>

      {generalError && <p className="error">{generalError}</p>}

      {!submitCompleted && (
        <form onSubmit={handleSubmit}>
          <p>
            <label>
              Nafn: <input
                className="input"
                type="text"
                name="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </label>
            {nameError && <span className="error">{nameError}</span>}
          </p>
          <p>
            <label>
              Skilaboð (valfrjálst): <textarea
                className="input"
                name="message"
                value={message}
                onChange={event => setMessage(event.target.value)}
              />
            </label>
          </p>
          <p>
            <button
              type="submit"
              className="input"
              disabled={!isSubmitEnabled}>Innskrá</button>
          </p>
        </form>
      )}

      {submitCompleted && (
        <div>
          <p>Takk fyrir. Góða skemmtun</p>
          <button
            className="input"
            onClick={() => setSubmitCompleted(false)}>Skrá fleiri</button>
        </div>
      )}
    </div>
  );
}

export default App;
