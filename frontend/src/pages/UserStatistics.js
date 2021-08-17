import { useContext } from "react";
import UserContext from "../context/UserContext";
import { ListGroup, Container } from "react-bootstrap";

const UserStatistics = () => {
  
  const {user, userProfile} = useContext(UserContext);

  return (
    <div>
      { user &&
        <Container>
          <h1>Sudoku statistics for {user.first_name} </h1>
          <ListGroup>
            <ListGroup.Item>Puzzles attempted: {userProfile.puzzles_attempted}</ListGroup.Item>
            <ListGroup.Item>Puzzles solved: {userProfile.puzzles_solved}</ListGroup.Item>
            <ListGroup.Item>Hints given: {userProfile.hints_given}</ListGroup.Item>
          </ListGroup>
      </Container>
      }
      {
        !user &&
        <h1>Login to view your statistics!</h1>
      }
    </div>
  )
}

export default UserStatistics;
