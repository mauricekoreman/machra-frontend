import { Box } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const NotFound = () => {
  const error = useRouteError();

  return (
    <Box sx={{ display: "grid", placeItems: "center", pt: 8 }}>
      <h1>Oepsie doepsie!</h1>
      <p>Er gebeuren onverwachte dingen!</p>
      <p>
        Error: <i>{isRouteErrorResponse(error) && error.statusText}</i>
      </p>
    </Box>
  );
};

