import * as StompJs from "@stomp/stompjs";

export const Chat = () => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = StompJs.client("ws://localhost:8080/ws");
    client.debug = (str) => {
      console.log(str);
    };

    client.connect({}, () => {
      client.subscribe("/topic/chat", (message) => {
        console.log(message.body);
        setMessages((prevMessages) => [...prevMessages, message.body]);
      });
    });

    setClient(client);
  }, []);

  const sendMessage = () => {
    client.send("/app/chat", {}, message);
    setMessage("");
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {messages.map((message) => (
          <p>{message}</p>
        ))}
      </div>
    </div>
  );
};
