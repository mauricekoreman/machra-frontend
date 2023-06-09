import { ReactNode, createContext, useContext, useState } from "react";
import { useAuthDispatch, useAuthState } from "../auth/auth.provider";
import { GetStoriesParams, httpGetStories } from "../../../api/storiesService";
import { Verhaal } from "../../routes/verhalen/verhalen.component";
import { Alert, Snackbar } from "@mui/material";

interface VerhalenProvider {
  verhalen: Verhaal[] | null;
  setVerhalen: (params?: GetStoriesParams) => Promise<Verhaal[]>;
}

export const VerhalenStateContext = createContext<VerhalenProvider>({} as VerhalenProvider);

export const VerhalenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authDispatch = useAuthDispatch();
  const [verhalen, _setVerhalen] = useState<VerhalenProvider["verhalen"]>(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useAuthState();

  async function setVerhalen(params?: GetStoriesParams) {
    if (!user || user.roles.length === 0) return [];

    const { data, error } = await httpGetStories({ params });

    if (error) {
      if (error.code === 401) {
        authDispatch({ type: "signout" });
        return [];
      }

      setErrorMessage(error.message);
      return [];
    }

    data && _setVerhalen(data);
    return data ? data : [];
  }

  const value: VerhalenProvider = {
    verhalen,
    setVerhalen,
  };

  return (
    <VerhalenStateContext.Provider value={value}>
      {children}
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={Boolean(errorMessage)}
        autoHideDuration={2000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert sx={{ width: "100%" }} severity='error'>
          {errorMessage}
        </Alert>
      </Snackbar>
    </VerhalenStateContext.Provider>
  );
};

export const useVerhalenState = () => {
  const context = useContext(VerhalenStateContext);
  if (context === undefined) {
    throw new Error("useMachrabordState must be within a MachrabordProvider");
  }

  return context;
};


