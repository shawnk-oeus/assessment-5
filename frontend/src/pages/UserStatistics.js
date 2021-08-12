const UserStatistics = ({user, userProfile}) => {
  
  return (
    <div>
      <h1>Sudoku statistics for {user.username} </h1>
      <ul>
        <li>Puzzles attempted: {userProfile.puzzles_attempted}</li>
        <li>Puzzles solved: {userProfile.puzzles_solved}</li>
        <li>Hints given: {userProfile.hints_given}</li>
      </ul>
    </div>
  )
}

export default UserStatistics
