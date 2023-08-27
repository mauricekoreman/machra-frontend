import styled from "@emotion/styled";
import { Container } from "@mui/material";

const StyledContainer = styled(Container)`
  & > ol {
    padding-inline-start: 20px;
  }

  & > ol > li {
    margin-bottom: 1rem;
  }
`;

export const Regels = () => {
  return (
    <StyledContainer>
      <ol>
        <li>De eerste speler die op vak 63 komt heeft het spel gewonnen.</li>
        <li>
          Het is verboden om zomaar de tafel te verlaten tijdens het spel. Is er behoefte aan
          bijvoorbeeld een plaspauze dan kan hier over gestemd worden. Bij een meerderheid die vóór
          de pauze is, bepaalt de spelleider hoelang iedereen van tafel mag en de straf die volgt
          voor de spelers die te laat terug komen.
        </li>
        <li>
          Het spel is pas afgelopen als er een winnaar is óf er geen bier meer is en dit ook niet
          opgelost kan worden
        </li>
        <li>Meer regels?</li>
      </ol>
    </StyledContainer>
  );
};

