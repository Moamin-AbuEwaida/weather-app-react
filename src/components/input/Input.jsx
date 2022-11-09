import "./Input.css";
import { FiSearch } from "react-icons/fi";

const Input = ({ text, submit, func }) => {
  return (
    <form className="input" onSubmit={submit}>
      <input
        className="input_value"
        type="text"
        placeholder="Please enter the location"
        onChange={text}
      />
      <span className="input_icon">
        <FiSearch onClick={func} />
      </span>
    </form>
  );
};

export default Input;
