import { ReactNode, createContext, useContext, useState } from "react";

type StartStop = "start" | "stop";

interface IMachrabordState {
  isMachrabordActive: boolean;
  startStopMachrabordSession: (action: StartStop) => void;
}

const MachrabordStateContext = createContext({});

export const MachrabordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMachrabordActive, setIsMachrabordActive] = useState(false);

  function startStopMachrabordSession(action: StartStop) {
    setIsMachrabordActive(action === "start" ? true : false);
  }

  const value: IMachrabordState = {
    isMachrabordActive,
    startStopMachrabordSession,
  };

  return (
    <MachrabordStateContext.Provider value={value}>{children}</MachrabordStateContext.Provider>
  );
};

export const useMachrabord = () => {
  return useContext(MachrabordStateContext) as IMachrabordState;
};

