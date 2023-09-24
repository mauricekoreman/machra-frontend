import styled from "@emotion/styled";
import { InputBase } from "@mui/material";
import { MdSearch as SearchIcon } from "react-icons/md";

const Search = styled.div`
  background-color: #e6eaeba9;
  position: relative;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  flex: 1;

  &:hover,
  &:focus {
    background-color: #e6eaeb;
  }

  & > svg {
    color: #747478;
  }
`;

interface Props {
  inputRef?: React.RefObject<HTMLInputElement>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Searchbar = ({ inputRef, handleChange }: Props) => {
  return (
    <Search>
      <SearchIcon size={21} />
      <InputBase
        onChange={handleChange}
        inputRef={inputRef}
        sx={{ flex: 1 }}
        placeholder='Zoeken...'
      />
    </Search>
  );
};















