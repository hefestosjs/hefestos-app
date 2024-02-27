import AuthConfig from "app/config/auth";
import { Session, SessionType } from "./session";

type LoginType = {
  session: SessionType;
};

const login = (props: LoginType) => {
  if (AuthConfig.strategy === "web") {
    Session(props.session, "login");
  }
};

const logout = (props: LoginType) => {
  if (AuthConfig.strategy === "web") {
    Session(props.session, "logout");
  }
};

export const Auth = { login, logout };
