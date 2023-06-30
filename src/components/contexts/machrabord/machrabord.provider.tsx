import { ReactNode, createContext, useContext, useReducer, useState } from "react";
import { Verhaal } from "../../routes/verhalen/verhalen.component";

// TODO: get this from a hook
import fake_verhalen from "../../../fake-db.json";
import { randomNumber } from "../../../utils/random-number";

type machrabordReducerActions = "start" | "stop" | "getVerhaal" | "rejectVerhaal";

interface IMachrabordState {
  isMachrabordActive: boolean;
  machrabordVerhalen: Verhaal[];
  activeVerhaal: Verhaal | null;
  dispatch: React.Dispatch<machrabordReducerActions>;
}

const machrabordInitialState: {
  isMachrabordActive: boolean;
  machrabordVerhalen: Verhaal[];
  activeVerhaal: Verhaal | null;
} = { isMachrabordActive: false, machrabordVerhalen: [], activeVerhaal: null };

function machrabordReducer(state: typeof machrabordInitialState, action: machrabordReducerActions) {
  switch (action) {
    case "start":
      return {
        ...state,
        isMachrabordActive: true,
        machrabordVerhalen: fake_verhalen.data,
      };
    case "stop":
      return {
        ...state,
        isMachrabordActive: false,
        activeVerhaal: null,
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
      };
    }
    case "rejectVerhaal": {
      return {
        ...state,
        activeVerhaal: state.machrabordVerhalen[randomNumber(state.machrabordVerhalen.length)],
      };
    }
    default:
      return { ...state };
  }
}

const MachrabordStateContext = createContext<IMachrabordState>({} as IMachrabordState);

export const MachrabordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(machrabordReducer, machrabordInitialState);

  const value: IMachrabordState = {
    isMachrabordActive: state.isMachrabordActive,
    machrabordVerhalen: state.machrabordVerhalen,
    activeVerhaal: state.activeVerhaal,
    dispatch,
  };

  return (
    <MachrabordStateContext.Provider value={value}>{children}</MachrabordStateContext.Provider>
  );
};

export const useMachrabord = () => {
  return useContext(MachrabordStateContext);
};

