import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { Verhaal } from "../../routes/verhalen/verhalen.component";

// TODO: get this from a hook
import fake_verhalen from "../../../fake-db.json";
import { randomNumber } from "../../../utils/random-number";

type machrabordReducerActions =
  | "start"
  | "stop"
  | "getVerhaal"
  | "rejectVerhaal"
  | "changeGameState";

interface IMachrabordState {
  isMachrabordActive: boolean;
  machrabordVerhalen: Verhaal[];
  activeVerhaal: Verhaal | null;
  gameState: "uitleg" | "filterSettings" | "spel" | "einde";
}

type Action =
  | {
      type: Exclude<machrabordReducerActions, "changeGameState">;
    }
  | {
      type: Extract<machrabordReducerActions, "changeGameState">;
      payload: IMachrabordState["gameState"];
    };

const machrabordInitialState: IMachrabordState = {
  isMachrabordActive: false,
  machrabordVerhalen: [],
  activeVerhaal: null,
  gameState: "filterSettings",
};

function machrabordReducer(state: typeof machrabordInitialState, action: Action): IMachrabordState {
  switch (action.type) {
    case "start":
      return {
        ...state,
        isMachrabordActive: true,
        machrabordVerhalen: fake_verhalen.data,
        gameState: "uitleg",
      };
    case "stop":
      return {
        ...state,
        isMachrabordActive: false,
        activeVerhaal: null,
        gameState: "filterSettings",
      };
    case "getVerhaal": {
      // remove old verhaal from list
      let verhalenList = state.machrabordVerhalen;
      if (state.activeVerhaal) {
        verhalenList = state.machrabordVerhalen.filter(
          (verhaal) => verhaal !== state.activeVerhaal
        );
      }

      return {
        ...state,
        machrabordVerhalen: verhalenList,
        activeVerhaal: verhalenList[randomNumber(verhalenList.length)],
        gameState: "spel",
      };
    }
    case "rejectVerhaal": {
      return {
        ...state,
        activeVerhaal: state.machrabordVerhalen[randomNumber(state.machrabordVerhalen.length)],
      };
    }
    case "changeGameState": {
      if (!action.payload) {
        return { ...state };
      }

      const gameState = action.payload;
      return {
        ...state,
        gameState: gameState,
      };
    }
    default:
      return { ...state };
  }
}

const MachrabordStateContext = createContext<IMachrabordState>(machrabordInitialState);
const MachrabordDispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

export const MachrabordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(machrabordReducer, machrabordInitialState);

  return (
    <MachrabordStateContext.Provider value={state}>
      <MachrabordDispatchContext.Provider value={dispatch}>
        {children}
      </MachrabordDispatchContext.Provider>
    </MachrabordStateContext.Provider>
  );
};

export const useMachrabordState = () => {
  const context = useContext(MachrabordStateContext);
  if (context === undefined) {
    throw new Error("useMachrabordState must be within a MachrabordProvider");
  }

  return context;
};

export const useMachrabordDispatch = () => {
  const context = useContext(MachrabordDispatchContext);
  if (context === undefined) {
    throw new Error("useMachrabordDispatch must be within a MachrabordProvider");
  }

  return context;
};

