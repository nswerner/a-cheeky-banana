import Navbar from 'react-bootstrap/Navbar';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { MdOutlineLogout } from 'react-icons/md';

const AppHeader = ({ user, setUser }) => {
  return (
    <Navbar
      fixed="top"
      style={{
        width: '100%',
        height: '70px',
        backgroundColor: '#F6F6F0',
        color: '#fff',
        padding: '16px',
      }}
    >
      <Container>
        <Stack style={{ width: '100%' }} direction="horizontal" gap={5}>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image src="MR_logo.png" width={'300px'} />
            </Navbar.Brand>
          </LinkContainer>

          <Stack className="ms-auto" direction="horizontal">
            <Nav className="ms-auto" style={{ color: 'white' }}>
              <LinkContainer to="/form">
                <Nav.Link>Form</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/market-analysis">
                <Nav.Link>Analysis</Nav.Link>
              </LinkContainer>
            </Nav>
            <Navbar.Collapse className="justify-content-end mx-4">
              <MdOutlineLogout color="black" size={20} cursor="pointer" />
            </Navbar.Collapse>
          </Stack>
        </Stack>
      </Container>
    </Navbar>
  );
};
export default AppHeader;
