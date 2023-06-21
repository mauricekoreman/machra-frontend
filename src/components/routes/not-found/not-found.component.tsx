import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const NotFound = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>Oepsie doepsie!</h1>
      <p>Er gebeuren onverwachte dingen!</p>
      <p>
        <i>{isRouteErrorResponse(error) && error.statusText}</i>
      </p>
    </div>
  );
};

