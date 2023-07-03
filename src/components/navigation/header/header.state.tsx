import { Dispatch, createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";

interface IHeaderState {
  headerLeft?: React.ReactNode | null;
  headerRight?: React.ReactNode | null;
  headerTitle?: string | undefined;
}

type Action = {
  type: "changeValues";
  payload: IHeaderState;
};

const initialState: IHeaderState = {
  headerLeft: null,
  headerRight: null,
  headerTitle: undefined,
};

const HeaderStateContext = createContext<IHeaderState>(initialState);
const HeaderDispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

export function useHeaderState() {
  const context = useContext(HeaderStateContext);
  if (context === undefined) {
    throw new Error("useHeaderState must be used within a HeaderProvider");
  }
  return context;
}

function useHeaderDispatch() {
  const context = useContext(HeaderDispatchContext);
  if (context === undefined) {
    throw new Error("useHeaderDispatch must be used within a HeaderProvider");
  }
  return context;
}

function headerReducer(state: IHeaderState, action: Action): IHeaderState {
  switch (action.type) {
    case "changeValues": {
      const { headerTitle, headerLeft, headerRight } = action.payload;

      const nextState = { ...state, headerTitle, headerLeft, headerRight };
      return nextState;
    }

    default:
      return state;
  }
}

const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(headerReducer, initialState);
  const location = useLocation();

  // Turns state back to initial, to make sure headerOptions({}) does not persist on route change
  useEffect(() => {
    dispatch({ type: "changeValues", payload: initialState });
  }, [dispatch, location.pathname]);

  return (
    <HeaderStateContext.Provider value={state}>
      <HeaderDispatchContext.Provider value={dispatch}>{children}</HeaderDispatchContext.Provider>{" "}
    </HeaderStateContext.Provider>
  );
};

export function useHeader() {
  const dispatch = useHeaderDispatch();

  const headerOptions = useCallback(
    ({ headerTitle, headerLeft, headerRight }: IHeaderState) => {
      dispatch({ type: "changeValues", payload: { headerTitle, headerLeft, headerRight } });
    },
    [dispatch]
  );

  return { headerOptions };
}

export { HeaderProvider };

