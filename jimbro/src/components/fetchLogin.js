export async function FetchLogin() {

    const getUser = ()=>{
      fetch("https://api.jimbro.fyi/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(response=>{
        if (response.status === 200) return response.json();
        throw new Error("authentication failed");
      }).then(resObject=>{
        return resObject.user;
      }).catch(err=>{
        console.log(err);
      });
    };
    getUser();
  
  return <div></div>;
}