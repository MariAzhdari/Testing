// import './App.css';
// import { useEffect,useState } from "react";
// const CLIENT_ID = "9a540aef86a0d343b874";


// function App() {

//   const[rerender,setRerender]=useState(false)
//   const[userData,setUserData]=useState({})


//   useEffect(()=>{
// //localhost :3000/?code=
//     const queryString = window.location.search;
//     const urlparams = new URLSearchParams(queryString);
//     const codeParam = urlparams.get("code");
//     console.log(codeParam);

// if (codeParam &&(localStorage.getItem("accessToken")===null)){
//   async function getAccessToken(){
//     await fetch("http://localhost:4000/getAccessToken ? code=" + codeParam ,{
//       method:"GET"
//     }).then((response)=>{
//       return response.json();
//     }).then((data)=>{
//       console.log(data);
//       if(data.access_token){
//         localStorage.setItem('accessToken', data.access_token );
//         setRerender(!rerender);
//       }
//     })
//   }
//   getAccessToken();
// }
//   },[]);

//   async function getUserData(){
//     await fetch("http:localhost:4000/getUserData",{
//       method:"Get",
//       headers:{
//         "Authorization":"Bearer" +localStorage.getItem("accessToken")
//       } 
//       }).then((response)=>{
//         return response.json() ;
//       }).then((data)=>{
//         console.log(data);
//         setUserData(data);
//       })
//     }
    
    
//  const loginWithGithub=()=>{
//   window.location=("https://github.com/login/oauth/authorize?client_id="+CLIENT_ID)
//  }

// return (
//     <div className="App">
//       <header className="App-header">
//         {localStorage.getItem("accessToken")? 
//         <>
//         <h1>we have access token</h1>
//     <button onClick={()=>{localStorage.removeItem("accessToken");setRerender(!rerender);}}>
//       log out
//     </button>
//      <h3>get user data from GitHub API</h3>
//      <button onClick={(getUserData)}>Get Data</button>
//      {Object.keys(userData).length !== 0 ?
//      <>
//      <h4>hey there {userData.login}</h4>
//     <img width="100px" height="100px" src={userData.avatar_url}></img>
//     <a href={userData.html_url} style={{"color":"white"}}>Link to the GitHub profile
//   </a>}
//      </>
//      :
//       <header/>
//     </div>
// )



// };


// export default App;



import "./App.css";
import { useEffect, useState } from "react";

const CLIENT_ID = "9a540aef86a0d343b874";

function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const queryString = window.location.search;
    const urlparams = new URLSearchParams(queryString);
    const codeParam = urlparams.get("code");

    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setRerender(!rerender);
            }
          });
      }
      getAccessToken();
    }
  }, []);

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }

  const loginWithGithub = () => {
    window.location =
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID;
  };

  return (
    <div className="App">
      <header className="App-header">
        {localStorage.getItem("accessToken") ? (
          <>
            <h1>We have access token</h1>
            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                setRerender(!rerender);
              }}
            >
              Log out
            </button>
            <h3>Get user data from GitHub API</h3>
            <button onClick={getUserData}>Get Data</button>
            {Object.keys(userData).length !== 0 ? (
              <>
                <h4>Hey there {userData.login}</h4>
                <img
                  width="100px"
                  height="100px"
                  src={userData.avatar_url}
                  alt="User Avatar"
                />
                <a href={userData.html_url} style={{ color: "white" }}>
                  Link to the GitHub profile
                </a>
              </>
            ) : null}
          </>
        ) : (
          <button onClick={loginWithGithub}>Log in with Github</button>
        )}
      </header>
    </div>
  );
}

export default App;


