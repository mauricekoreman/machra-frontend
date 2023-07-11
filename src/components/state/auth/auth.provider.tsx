import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";

interface User {
  token: string | null;
  role: "admin" | "user" | null;
}

interface IAuthState {
  user: User | undefined;
}

// type authReducerActions = 'signin' | 'create-user' | 'change-password'

type Action =
  | {
      type: "signin";
      payload: string;
    }
  | {
      type: "signout";
    };

const token = localStorage.getItem("MACHRA_USER_TOKEN");
const authInitialState: IAuthState = {
  user: token ? { token, role: "user" } : undefined,
};

function authReducer(state: typeof authInitialState, action: Action): IAuthState {
  switch (action.type) {
    case "signin":
      return {
        user: { role: "user", token: action.payload },
      };
    case "signout":
      localStorage.removeItem("MACHRA_USER_TOKEN");

      return {
        user: undefined,
      };
    default:
      return { ...state };
  }
}

const AuthStateContext = createContext<IAuthState>(authInitialState);
const AuthDispatch = createContext<Dispatch<Action> | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

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
