import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { accessTokenKey, userKey } from "../../../contants";

export type Role = "user" | "manager" | "admin";

interface User {
  roles: Role[];
}

interface IAuthState {
  user: User;
}

// type authReducerActions = 'signin' | 'create-user' | 'change-password'

type Action =
  | {
      type: "signin";
      payload: Role[];
    }
  | {
      type: "signout";
    };

const authInitialState: IAuthState = {
  user: { roles: [] },
};

function authReducer(state: typeof authInitialState, action: Action): IAuthState {
  switch (action.type) {
    case "signin": {
      const userObj = { roles: action.payload };
      sessionStorage.setItem(userKey, JSON.stringify(userObj));
      return {
        user: userObj,
      };
    }
    case "signout":
      sessionStorage.removeItem(accessTokenKey);
      sessionStorage.removeItem(userKey);
      return {
        user: { roles: [] },
      };
    default:
      return { ...state };
  }
}

const AuthStateContext = createContext<IAuthState>(authInitialState);
const AuthDispatch = createContext<Dispatch<Action> | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    const userObj = sessionStorage.getItem(userKey);
    const isUser = state.user.roles.length > 0 ? true : false;

    if (!isUser && userObj) {
      const payload = (JSON.parse(userObj) as User)["roles"];
      dispatch({ type: "signin", payload });
    }
  }, []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatch.Provider value={dispatch}>{children}</AuthDispatch.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be within a AuthProvider");
  }

  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatch);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be within a AuthProvider");
  }

  return context;
};
