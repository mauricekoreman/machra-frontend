import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Codeblock } from "../../lib/codeblock/codeblock.component";
import { MdClose as RejectStoryIcon, MdCheck as NewStoryIcon } from "react-icons/md";

const StyledList = styled.ul`
  & > li {
    position: relative;
    margin-bottom: 1rem;
  }
`;

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li>
    <Typography>{children}</Typography>
  </li>
);

export const UitlegState = () => (
  <Box sx={{ px: 2 }}>
    <Typography variant='h2' sx={{ fontSize: 21, fontWeight: 600 }}>
      Voor de Spelleider:
    </Typography>
    <StyledList>
      <ListItem>
        Klik op het vak waar de speler op terecht komt. Is dit een verhaalvak, dan wordt er een
        willekeurig verhaal weergeven
      </ListItem>
      <ListItem>
        Bij elke klik op{" "}
        <Codeblock>
          <NewStoryIcon size={"1.2em"} />
        </Codeblock>{" "}
        wordt een willekeurig verhaal getrokken. Deze wordt uit op 'gebruikt' gezet en komt dan niet
        meer voor in het spel.
      </ListItem>
      <ListItem>
        Als de host niet tevreden is met het verhaal kan er op{" "}
        <Codeblock>
          <RejectStoryIcon size={"1.2em"} />
        </Codeblock>{" "}
        geklikt worden om een ander verhaal te laten zien. Het weggedrukte verhaal wordt <b>niet</b>{" "}
        op 'gebruikt' gezet en kan dus later in het spel terugkomen.
      </ListItem>
      <ListItem>
        Op deze manier hebben alle verhalen een even grote kans om in het spel te komen.
      </ListItem>
    </StyledList>
  </Box>
);


