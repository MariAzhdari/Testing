import './App.css';
import { useEffect } from "react";
const CLIENT_ID = "9a540aef86a0d343b874";


function App() {


  useEffect(()=>{
//localhost :3000/?code=
    const queryString = window.location.search;
    const urlparams = new URLSearchParams(queryString);
    const codeParam = urlparams.get("code");
    console.log(codeParam)

  },[]);



 const loginWithGithub=()=>{
  window.location=("https://github.com/login/oauth/authorize?client_id="+CLIENT_ID)
 }

  return (
    <div className="App">
      <header className="App-header">
    <button onClick={loginWithGithub}>
      login with github
    </button>
      </header>
    </div>
  );
}

export default App;
