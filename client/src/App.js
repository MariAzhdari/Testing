import './App.css';
import { useEffect,useState } from "react";
const CLIENT_ID = "9a540aef86a0d343b874";


function App() {

  const[rerender,setRerender]=useState(false)


  useEffect(()=>{
//localhost :3000/?code=
    const queryString = window.location.search;
    const urlparams = new URLSearchParams(queryString);
    const codeParam = urlparams.get("code");
    console.log(codeParam);

if (codeParam &&(localStorage.getItem("accessToken")===null)){
  async function getAccessToken(){
    await fetch("http://localhost:4000/getAccessToken ? code=" + codeParam ,{
      method:"GET"
    }).then((response)=>{
      return response.json();
    }).then((data)=>{
      console.log(data);
      if(data.access_token){
        localStorage.setItem('accessToken', data.access_token );
        setRerender(!rerender);
      }
    })
  }
  getAccessToken();
}
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
