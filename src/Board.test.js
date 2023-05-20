import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

it("renders without crashing", function() {
    render(<Board nrows={3} ncols={3} chanceLightStartsOn={.5} />);
});

it("matches snapshot", function() {
    const {asFragment} = render(<Board nrows={3} ncols={3} chanceLightStartsOn={.5} />);
    expect(asFragment()).toMatchSnapshot();
});

describe("make sure game board and html table are rendered correctly", function() {
    beforeEach(function() {
        jest
          .spyOn(Math, "random")
          //true/false return values predicated on value of .5 for chanceLightsStartsOn property of Board
          .mockReturnValue(.5) //this is the default value that will be used after the below fn calls are exhausted
          .mockReturnValueOnce(.49) //false
          .mockReturnValueOnce(.01) //false
          .mockReturnValueOnce(.25) //false
          .mockReturnValueOnce(.75) //true
          .mockReturnValueOnce(.30) //false
          //--> anything after defaults to true
      });
      
      afterEach(function() {
        Math.random.mockRestore();
      });

    test("game board renders predictably 3x3", function() {
        const { debug, getAllByTestId } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={.5} />);
        console.log(debug());
        const tds = getAllByTestId("cell-element");
        expect(tds[3]).toHaveClass('Cell Cell-lit');
        expect(tds[2]).toHaveClass('Cell ');
        expect(tds[0]).toHaveClass('Cell ');
        expect(tds[7]).toHaveClass('Cell Cell-lit');
    });

    test("game board renders predictably 4x4", function() {
        const { debug, getAllByTestId } = render(<Board nrows={4} ncols={4} chanceLightStartsOn={.5} />);
        console.log(debug());
        const tds = getAllByTestId("cell-element");
        expect(tds[3]).toHaveClass('Cell Cell-lit');
        expect(tds[2]).toHaveClass('Cell ');
        expect(tds[0]).toHaveClass('Cell ');
        expect(tds[7]).toHaveClass('Cell Cell-lit');
        expect(tds[11]).toHaveClass('Cell Cell-lit');
        expect(tds[14]).toHaveClass('Cell Cell-lit');
    });
}); 

describe("click test. make sure cells turn on/off as expected", function() {
    beforeEach(function() {
        jest
          .spyOn(Math, "random")
          //true/false return values predicated on value of .5 for chanceLightsStartsOn property of Board
          .mockReturnValue(.5) //this is the default value that will be used after the below fn calls are exhausted
          .mockReturnValueOnce(.49) //false
          .mockReturnValueOnce(.01) //false
          .mockReturnValueOnce(.25) //false
          .mockReturnValueOnce(.75) //true
          .mockReturnValueOnce(.30) //false
          //--> anything after defaults to true
      });
      
      afterEach(function() {
        Math.random.mockRestore();
      });

    test("click test 3x3", function() {
        const { debug, getAllByTestId } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={.5} />);
        console.log(debug());
        const tds = getAllByTestId("cell-element");

        fireEvent.click(tds[0]);
        expect(tds[0]).toHaveClass('Cell Cell-lit');
        expect(tds[1]).toHaveClass('Cell Cell-lit');
        expect(tds[3]).toHaveClass('Cell ');

        fireEvent.click(tds[3]);
        expect(tds[3]).toHaveClass('Cell Cell-lit');
        expect(tds[0]).toHaveClass('Cell ');
        expect(tds[4]).toHaveClass('Cell Cell-lit');
        expect(tds[6]).toHaveClass('Cell ');

    });

    test("click test 4x4", function() {
        const { debug, getAllByTestId } = render(<Board nrows={4} ncols={4} chanceLightStartsOn={.5} />);
        console.log(debug());
        const tds = getAllByTestId("cell-element");

        fireEvent.click(tds[14]);
        expect(tds[14]).toHaveClass('Cell ');
        expect(tds[15]).toHaveClass('Cell ');
        expect(tds[13]).toHaveClass('Cell ');
        expect(tds[10]).toHaveClass('Cell ');

        fireEvent.click(tds[10]);
        expect(tds[10]).toHaveClass('Cell Cell-lit');
        expect(tds[14]).toHaveClass('Cell Cell-lit');
        expect(tds[9]).toHaveClass('Cell ');
        expect(tds[11]).toHaveClass('Cell ');
        expect(tds[6]).toHaveClass('Cell ');

    });
});

test("if game is won, render <h3>YOU WIN</h3>", function() {
    //chanceLightStartsOn=1 guarantees win
    const { getByText } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1} />);
    let win = getByText("YOU WIN");
    expect(win).toBeInTheDocument();
});