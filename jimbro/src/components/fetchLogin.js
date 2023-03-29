import { useEffect, useState } from 'react';

export async function FetchLogin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
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
        setUser(resObject.user);
      }).catch(err=>{
        console.log(err);
      });
    };
    getUser();
  }, []);

  
  return user;
}