import { render } from "@testing-library/react";
import Cell from './Cell';
import Board from "./Board";

it("renders without crashing", function() {
    render(<Cell key="1-2" coord="1-2" flipCellsAround={() => Board.flipCellsAround("1-2")} isLit={true} />);
});

it("matches snapshot", function() {
    const {asFragment} = render(<Cell key="1-2" coord="1-2" flipCellsAround={() => Board.flipCellsAround("1-2")} isLit={true} />);
    expect(asFragment()).toMatchSnapshot();
});
