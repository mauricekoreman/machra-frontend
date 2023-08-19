import { Container, InputBase } from "@mui/material";

const verhalen = [
  { id: 1, title: "verhaal 1" },
  { id: 2, title: "verhaal 2" },
  { id: 3, title: "verhaal 3" },
  { id: 4, title: "verhaal 4" },
  { id: 5, title: "verhaal 5" },
  { id: 6, title: "verhaal 6" },
  { id: 7, title: "verhaal 7" },
  { id: 8, title: "verhaal 8" },
];

const fetchVerhalen = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return verhalen.slice((page - 1) * 2, page * 2);
};

export const TestPage = () => {
  return (
    <Container>
      <h1>Test page!</h1>
    </Container>
  );
};


