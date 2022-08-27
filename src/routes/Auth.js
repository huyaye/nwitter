import React from "react";
import { loginWithSocial } from "../fbase";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let data = await loginWithSocial(name);
    console.log(data);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;

//   window.location.href =
//     "http://localhost:8080/realms/oauth2-demo-realm/protocol/openid-connect/auth";
