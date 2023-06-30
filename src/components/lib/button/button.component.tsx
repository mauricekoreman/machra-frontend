import { SxProps, Theme } from "@mui/material";
import { Button as MuiButton } from "@mui/material";

export const Button: React.FC<{
  title?: string;
  component?: JSX.Element;
  onClick: () => void;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}> = ({ title, component, onClick, sx, disabled = false }) => (
  <MuiButton
    onClick={onClick}
    variant='contained'
    size='medium'
    color='primary'
    disabled={disabled}
    sx={{ borderRadius: 100, textTransform: "capitalize", py: 1.5, px: 4, ...sx }}
  >
    {component ? component : title}
  </MuiButton>
);
