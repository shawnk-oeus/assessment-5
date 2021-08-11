import requests
import json

# Requests a puzzle from http://www.cs.utep.edu/cheon/ws/sudoku/
# Optional arguments to the API call are size (4 or 9) and difficulty (1,2,3)
# where 1 is easy difficulty, 2 is medium difficulty, and 3 is hard difficulty
# returns a board of TYPE LIST composed of DICTIONARY objects formatted
# {'x': 0, 'y': 1, 'value': 6} 
# blank squares in the board are not included in the LIST of dictionary OBJECTS
def puzzle_request(difficulty=1, size=9):
    try:
        response = requests.get(f'http://www.cs.utep.edu/cheon/ws/sudoku/new/?size={size}&level={difficulty}')
        data = response.json()
        return(data['squares'])
    except requests.exceptions.RequestException as e:  
        raise SystemExit(e)

# SQUARES is a LIST of DICTIONARY OBJECTS of the form [{'x': 0, 'y': 1, 'value': 6}
# blank squares in the board are not included in the LIST of dictionary OBJECTS
# PROCESS_BOARD converts the list of dictionary objects to an 9 element LIST of 9 element LISTs
# where empty elements are represented by 0 and filled elements are represented
# by VALUE
def process_board(squares):
    SIZE = 9
    board = [[0] * SIZE for _ in range(SIZE)]
    for square in squares:
        board[square['y']][square['x']] = square['value']
    return board

# board_to_string
# takes in a BOARD_LIST of type LIST of LISTS and converts it to a ordered
# string of the all the elements of BOARD_LIST
def board_to_string(board_list):
    output_board = ''
    for elem in board_list:
        board_row = ''.join(str(square) for square in elem)
        output_board += board_row
    return output_board
    

def get_solution(board):
    try:
        string_board = board_to_string(board)
        my_headers = {'Content-Type':'application/json',
                    'x-rapidapi-key':'32eaca1fd7msh693c4e9ef3edeafp1e4102jsn01782cff0ca2',
                    'x-rapidapi-host':'solve-sudoku.p.rapidapi.com'
                    }
        solved_string_board = requests.post('https://solve-sudoku.p.rapidapi.com/', headers=my_headers, data=json.dumps({"puzzle": string_board}))
        output_data = solved_string_board.json()
        return output_data

    except requests.exceptions.RequestException as e:  
        raise SystemExit(e)

def to_int(input):
    return int(input)

# STRING_TO_BOARD takes in an 81 element BOARD_STRING composed of 0 through 9
# it converts that to an BOARD_LIST of TYPE list of lists and size 9 by 9
def string_to_board(board_string):
    split_string = list(board_string)
    converted_string = list(map(to_int, split_string))
    output_string = [converted_string[x:x+9] for x in range(0, len(converted_string), 9)]
    return output_string
    

