import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";

type role = "admin" | "user";

interface User {
  roles: role[];
}

interface IAuthState {
  user: User;
}

// type authReducerActions = 'signin' | 'create-user' | 'change-password'

type Action =
  | {
      type: "signin";
      payload: role[];
    }
  | {
      type: "signout";
    };

const authInitialState: IAuthState = {
  user: { roles: [] },
};

function authReducer(state: typeof authInitialState, action: Action): IAuthState {
  switch (action.type) {
    case "signin":
      return {
        user: { roles: action.payload },
      };
    case "signout":
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
