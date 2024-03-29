import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { Verhaal } from "../../../api/storiesService";
import { randomNumber } from "../../../utils/random-number";

type MachrabordReducerActions =
  | "start"
  | "stop"
  | "acceptVerhaal"
  | "getVerhaal"
  | "changeGameState"
  | "gewonnen";

interface IMachrabordState {
  isMachrabordActive: boolean;
  allFetchedMachrabordVerhalen: Verhaal[];
  inGameMachrabordVerhalen: Verhaal[];
  activeVerhaal: Verhaal | null;
  gameState: "uitleg" | "filterSettings" | "spel" | "einde" | "winnaar";
}

type Action =
  | {
      type: Exclude<MachrabordReducerActions, "changeGameState" | "start">;
    }
  | {
      type: Extract<MachrabordReducerActions, "changeGameState">;
      payload: IMachrabordState["gameState"];
    }
  | {
      type: Extract<MachrabordReducerActions, "start">;
      payload: Verhaal[];
    };

const machrabordInitialState: IMachrabordState = {
  isMachrabordActive: false,
  allFetchedMachrabordVerhalen: [],
  inGameMachrabordVerhalen: [],
  activeVerhaal: null,
  gameState: "filterSettings",
};

function machrabordReducer(state: typeof machrabordInitialState, action: Action): IMachrabordState {
  switch (action.type) {
    case "start": {
      const verhalen = action.payload;
      return {
        ...state,
        isMachrabordActive: true,
        inGameMachrabordVerhalen: verhalen,
        allFetchedMachrabordVerhalen: verhalen,
        gameState: "uitleg",
      };
    }
    case "stop":
      return {
        ...state,
        isMachrabordActive: false,
        activeVerhaal: null,
        gameState: "filterSettings",
      };
    case "acceptVerhaal": {
      // remove active verhaal from list
      return {
        ...state,
        inGameMachrabordVerhalen: state.inGameMachrabordVerhalen.filter(
          (verhaal) => verhaal !== state.activeVerhaal
        ),
      };
    }
    case "getVerhaal": {
      return {
        ...state,
        activeVerhaal:
          state.inGameMachrabordVerhalen[randomNumber(state.inGameMachrabordVerhalen.length)],
      };
    }
    case "changeGameState": {
      const gameState = action.payload;
      return {
        ...state,
        gameState: gameState,
      };
    }
    case "gewonnen": {
      return {
        ...state,
        gameState: "winnaar",
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


