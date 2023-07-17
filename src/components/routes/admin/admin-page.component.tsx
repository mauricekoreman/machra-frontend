import { Container, Stack } from "@mui/material";
import { Button } from "../../lib/button/button.component";
import { Link } from "react-router-dom";

export const AdminPage = () => {
  return (
    <Container sx={{ pt: 4 }}>
      <Stack sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button fullWidth title='Edit stories' />
        <Link to='create-user'>
          <Button fullWidth title='Create new user' />
        </Link>
      </Stack>
    </Container>
  );
};

