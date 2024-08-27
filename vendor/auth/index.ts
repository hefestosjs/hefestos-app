import AuthConfig from "app/config/auth";
import { Session, type SessionType } from "./session";
import { Token, type TokenType } from "./token";

type LoginType = {
  session?: SessionType;
  token?: TokenType;
};

const login = async (props: LoginType) => {
  if (AuthConfig.strategy === "web") {
    return Session(props.session!, "login");
  }

  if (AuthConfig.strategy === "token") {
    return await Token(props.token!, "login");
  }
};

const logout = async (props: LoginType) => {
  if (AuthConfig.strategy === "web") {
    return Session(props.session!, "logout");
  }

  if (AuthConfig.strategy === "token") {
    return await Token(props.token!, "logout");
  }
};

export const Auth = { login, logout };
