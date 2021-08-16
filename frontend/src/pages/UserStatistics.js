import { useContext } from "react";
import UserContext from "../context/UserContext";
import { ListGroup } from "react-bootstrap";

const UserStatistics = () => {
  
  const userContext = useContext(UserContext);

  return (
    <div>
      { userContext.user &&
        <div>
          <h1>Sudoku statistics for {userContext.user.first_name} </h1>
          <ListGroup>
            <ListGroup.Item>Puzzles attempted: {userContext.userProfile.puzzles_attempted}</ListGroup.Item>
            <ListGroup.Item>Puzzles solved: {userContext.userProfile.puzzles_solved}</ListGroup.Item>
            <ListGroup.Item>Hints given: {userContext.userProfile.hints_given}</ListGroup.Item>
          </ListGroup>
      </div>
      }
      {
        !userContext.user &&
        <h1>Login to view your statistics!</h1>
      }
    </div>
  )
}

export default UserStatistics
