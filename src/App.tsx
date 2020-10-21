import React, { FormEvent } from 'react';
import * as events from './events';
import './App.css';
import Thanks from './Thanks';

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
          setGeneralError("Villa :( Vinsamlegast hafðu samband með öðrum hætti")
          return;
        }
        setGeneralError("")
        setSubmitCompleted(true)
      })
      .catch(error => alert(error))
      .finally(() => setIsSubmitEnabled(true));
  };

  const [isActive, event] = events.getNext();

  if (submitCompleted) {
    return <Thanks onOk={() => { setSubmitCompleted(false) }} />;
  }

  if (!event) {
    return <p>Engir viðburðir eru framundan</p>
  }

  if (!isActive) {

    return (
      <div>
        <p>Næsti viðburður er {events.dateFormat(event.start)}</p>
        <p>Innskráning hefst kl. {events.timeFormat(event.start)} </p>
      </div>
    )
  }

  return (
    <>
      {generalError
        ? <p className="error">{generalError}</p>
        : <p>Innskráning í Sunnudagsdeild {events.dateFormat(event.start)}</p>
      }

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

        <button
          type="submit"
          disabled={!isSubmitEnabled}>Ég er mætt(ur)!</button>
      </form>
    </>
  )

}

export default App;
