import { useState } from "react";
import { useMoralis } from "react-moralis";

const SendMessage = ({ endOfMessageRef }) => {
  const { user, Moralis } = useMoralis();
  const [message, setMessage] = useState("");

  const sendMessage = e => {
    e.preventDefault();

    if (!message) return;

    const Messages = Moralis.Object.extend("Messages");
    const messages = new Messages();

    messages
      .save({
        message,
        username: user.getUsername(),
        ethAddress: user.get("ethAddress"),
      })
      .then(
        message => {
          // The object was saved successfully
        },
        error => {
          // The save failed
          // error is a Moralis.Error with and error code and messages
          console.log(error.message);
        },
      );

    endOfMessageRef.current.scrollIntoView({ behavior: "smooth" });
    setMessage("");
  };

  return (
    <form className="flex fixed bottom-10 bg-black opacity-80 px-6 py-4 max-w-2xl w-11/12 shadow-xl border-4 border-blue-400 z-50 rounded-full">
      <input
        type="text"
        className="flex-grow outline-none bg-transparent text-white placeholder-gray-500 pr-5"
        placeholder={`Enter a Message ${user.getUsername()}...`}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        onClick={sendMessage}
        type="submit"
        className="font-bold text-pink-500">
        Send
      </button>
    </form>
  );
};

export default SendMessage;
