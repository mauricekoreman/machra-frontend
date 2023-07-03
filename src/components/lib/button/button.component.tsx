import { ButtonProps, SxProps, Theme } from "@mui/material";
import { Button as MuiButton } from "@mui/material";

interface IButton extends ButtonProps {
  title?: string;
  component?: JSX.Element;
  sx?: SxProps<Theme>;
}

export const Button: React.FC<IButton> = ({ title, component, sx, ...props }) => (
  <MuiButton
    variant='contained'
    size='medium'
    color='primary'
    sx={{ borderRadius: 100, textTransform: "capitalize", py: 1.5, px: 4, ...sx }}
    {...props}
  >
    {component ? component : title}
  </MuiButton>
);

