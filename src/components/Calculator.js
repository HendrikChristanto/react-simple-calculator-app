import { useState } from "react";
import { MdBackspace } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function Calculator() {
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [charRemain, setCharRemain] = useState(20);

  const display = () => {
    let opDisplay = operation;
    opDisplay = opDisplay.replace("*", "×");
    opDisplay = opDisplay.replace("/", "÷");

    if (operation.length < 13) {
      return <span>{opDisplay ? opDisplay : "0"}</span>;
    }
    if (operation.length < 17) {
      return <span style={{ fontSize: "1.5rem" }}>{opDisplay}</span>;
    }
    if (operation.length < 19) {
      return <span style={{ fontSize: "1.4rem" }}>{opDisplay}</span>;
    } else {
      return <span style={{ fontSize: "1.3rem" }}>{opDisplay}</span>;
    }
  };

  const predictResult = (op) => {
    try {
      setResult(eval(op));
    } catch (e) {
      setResult("NaN");
    }
  };

  const handleDelete = () => {
    if (operation.length > 0) {
      setOperation(operation.slice(0, -1));
      setCharRemain(charRemain + 1);
    }
  };

  const handleOperation = (event) => {
    switch (event.target.value) {
      case "c":
        setOperation("");
        setResult("");
        setCharRemain(20);
        break;
      case "=":
        try {
          setOperation(eval(operation).toString());
          setResult("");
          setCharRemain(20 - eval(operation).toString().length);
        } catch (e) {
          toast.warning("Write the formula correctly!");
        }
        break;
      default:
        if (charRemain) {
          setOperation(operation + event.target.value);
          predictResult(operation + event.target.value);
          setCharRemain(charRemain - 1);
        }
        break;
    }
  };

  return (
    <div className="calculator">
      <div className="c-wrapper">
        <div className="ctc c-screen">
          <div className="c-char-remain">{charRemain} remaining</div>
          <div className="c-compute">{display()}</div>
        </div>

        <div className="ctc c-result">
          <div></div>
          <span>{result}</span>
        </div>

        <div className="ctc c-menu">
          <button className="history-btn">HISTORY</button>
          <MdBackspace
            className="delete-btn"
            size="1.2em"
            onClick={handleDelete}
          />
        </div>

        <div className="c-grid">
          <button className="clear-btn" value="c" onClick={handleOperation}>
            C
          </button>
          <button className="operator-btn" value="(" onClick={handleOperation}>
            (
          </button>
          <button className="operator-btn" value=")" onClick={handleOperation}>
            )
          </button>
          <button className="operator-btn" value="/" onClick={handleOperation}>
            &divide;
          </button>

          <button className="normal-btn" value="7" onClick={handleOperation}>
            7
          </button>
          <button className="normal-btn" value="8" onClick={handleOperation}>
            8
          </button>
          <button className="normal-btn" value="9" onClick={handleOperation}>
            9
          </button>
          <button className="operator-btn" value="*" onClick={handleOperation}>
            &times;
          </button>

          <button className="normal-btn" value="4" onClick={handleOperation}>
            4
          </button>
          <button className="normal-btn" value="5" onClick={handleOperation}>
            5
          </button>
          <button className="normal-btn" value="6" onClick={handleOperation}>
            6
          </button>
          <button className="operator-btn" value="-" onClick={handleOperation}>
            -
          </button>

          <button className="normal-btn" value="1" onClick={handleOperation}>
            1
          </button>
          <button className="normal-btn" value="2" onClick={handleOperation}>
            2
          </button>
          <button className="normal-btn" value="3" onClick={handleOperation}>
            3
          </button>
          <button className="operator-btn" value="+" onClick={handleOperation}>
            +
          </button>

          <button className="normal-btn" value="(-" onClick={handleOperation}>
            &plusmn;
          </button>
          <button className="normal-btn" value="0" onClick={handleOperation}>
            0
          </button>
          <button className="normal-btn" value="." onClick={handleOperation}>
            .
          </button>
          <button className="special-btn" value="=" onClick={handleOperation}>
            =
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Calculator;
