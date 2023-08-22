import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 100vw;
  background-color: rgb(0, 86, 234);

  h1 {
    font-size: 50px;
    color: #fff;
  }
`;

const Header = () => (
  <HeaderContainer>
    <h1>Kaboodle Rooms</h1>
  </HeaderContainer>
);

export default Header;
