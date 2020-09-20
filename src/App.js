import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";

const useMyHook = (virtual_structure, setVirtual_structure, updateGrid) => {
  const refs = useRef([]);

  useEffect(() => {
    console.log("virtual_structure, is it empty?");
    console.log(virtual_structure);
  }, [updateGrid, virtual_structure]);

  const assignRef = r =>
    r && (refs.current.includes(r) || refs.current.push(r));

  return [assignRef];
};

export default function App() {
  const [virtual_structure, setVirtual_structure] = useState([]);
  const [updateGrid, setUpdateGrid] = useState();

  const [assignRef] = useMyHook(
    virtual_structure,
    setVirtual_structure,
    updateGrid
  );

  const update = async () => setUpdateGrid(updateGrid + 1);

  useEffect(() => {
    const temp_structure = Array.from({ length: 4 }, () => ({
      height: 0,
      cells: []
    }));
    temp_structure[0].cells = Array.from({ length: 10 }, () => {
      const rand = Math.random();
      const r = rand > 0.1 ? parseInt(500 * rand) : parseInt(500 * 0.1);
      return {
        height: "",
        el: (
          <div ref={assignRef}>
            <Image
              alt=""
              onload={update}
              num=""
              src={`https://picsum.photos/200/${r}`}
            />
          </div>
        )
      };
    });

    setVirtual_structure(temp_structure);
  }, []);

  return (
    <Container>
      {virtual_structure.map((col, i) => (
        <div key={`col${i}`}>
          {col.cells &&
            col.cells.map((cell, j) => (
              <React.Fragment key={`cell${j}`}>{cell.el}</React.Fragment>
            ))}
        </div>
      ))}
    </Container>
  );
}

const Image = ({ alt, onload, num, src }) => (
  <>
    <Label>{num}</Label>
    <Img src={src} alt={alt} onLoad={onload} />
  </>
);

const Img = styled.img`
  border: 1px solid #000;
  height: min-content;
  margin: 0;
  padding: 0;
`;
const Label = styled.div`
  position: absolute;
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: #ccc;
  align-content: center;

  div {
    flex: 1;

    div {
      color: #fff;
      font-weight: 700;
      font-size: 32px;
      margin: 4px;
    }
  }
`;
