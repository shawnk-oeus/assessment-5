import { ListGroup } from "react-bootstrap"

const UserStatistics = ({user, userProfile}) => {
  
  return (
    <div>
      <h1>Sudoku statistics for {user.username} </h1>
      <ListGroup>
        <ListGroup.Item>Puzzles attempted: {userProfile.puzzles_attempted}</ListGroup.Item>
        <ListGroup.Item>Puzzles solved: {userProfile.puzzles_solved}</ListGroup.Item>
        <ListGroup.Item>Hints given: {userProfile.hints_given}</ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default UserStatistics
