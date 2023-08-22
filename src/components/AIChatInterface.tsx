import React, { useState, useEffect } from "react";
import {
  BoltIcon,
  UserCircleIcon,
  PencilIcon,
  TrashIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import AISidebar from "./AISidebar";
import AppBar from "./AppBar";
import AIPrompts from "./AIprompts";
import { useTheme } from "./ThemeContext";
import { Tab, Tabs, Card, CardHeader, CardContent, Typography,Link } from "@mui/material";

import { AnySoaRecord } from "dns";

type Message = {
  sender: "user" | "bot";
  text: any;
};
type Conversation = {
  id: string;
  messages: Message[];
};
const AIChatInterface: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPromptMode, setIsPromptMode] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const [inputText, setInputText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const { theme } = useTheme();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    //   localStorage.setItem("conversations", JSON.stringify(conversations));
    console.log("ls:", localStorage.getItem("conversations"));
    const savedConversations = localStorage.getItem("conversations");
    if (savedConversations) {
      try {
        const parsedConversations = JSON.parse(savedConversations);
        console.log("parsed:", parsedConversations);
        setConversations(parsedConversations);
      } catch (err) {
        console.error("Error parsing saved conversations:", err);
      }
    }
  }, []);

  useEffect(() => {
    // Store conversations in local storage whenever they change
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);
  // Mocked fetchBotResponse function
  const fetchBotResponse =  (message: string) => {
    // Normally, here you'd use something like axios or fetch to call your API
    // For now, I'll mock it:
   // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay

    return {
      duration: "9783 ms",
      response: {
        result: [
          {
            context: "fsjdfhsdjfhs",
            book: "sdhfjsdh",
            section_title: "dfd",
            hyperlink: "http://sdfd/",
            generated_resp: "sdfdsfdsfdsds",
          },
          {
            context: "fsjdfhsdjfhs",
            book: "sdhfjsdh",
            section_title: "dfsd",
            hyperlink: "http://sdfd/",
            generated_resp: "sdfdsfdsfdsds",
          },
        ],
      },
    };
  };
  // This is a mock function to simulate a bot reply. Replace it with your actual bot response logic.
  const getBotReply =  (message: string) => {
    const response =  fetchBotResponse(message);
    setIsBotTyping(false);
    console.log("response:",response);
    return response
  };

  const handleSendMessage = () => {
    setIsPromptMode(false);
    // Simulate bot thinking and typing...
    setIsBotTyping(true);
    // Create a new user message
    const userMessage = { sender: "user", text: inputText } as Message;

    // Get a reply from the bot
    const botReplyText = getBotReply(inputText);
    const botMessage = { sender: "bot", text: botReplyText } as Message;

    // Combine user message and bot reply
    const updatedMessages = [...messages, userMessage, botMessage];

    // Update the latest conversation to include these messages.
    let updatedConversations;
    if (conversations.length > 0) {
      const lastConversation = conversations[conversations.length - 1];
      updatedConversations = [
        ...conversations.slice(0, -1),
        {
          ...lastConversation,
          messages: [...lastConversation.messages, userMessage, botMessage],
        },
      ];
    } else {
      const newConversation = {
        id: userMessage.text,
        messages: [userMessage, botMessage],
      };
      updatedConversations = [newConversation];
    }

    setMessages(updatedMessages);
    setConversations(updatedConversations);
    setInputText("");

   
  };

  const startNewConversation = () => {
    const newConversationId = "Date.now().toString()"; // a simple unique ID
    setCurrentConversationId(newConversationId);
    setMessages([]); // Empty the messages
  };

  const selectConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
    const selectedConversation = conversations.find(
      (conv) => conv.id === conversationId
    );
    if (selectedConversation) {
      setMessages(selectedConversation.messages);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim()) {
      setIsPromptMode(false);

      // If there's no current conversation, create one
      if (!currentConversationId) {
        startNewConversation();
      }

      const newMessages = [
        ...messages,
        { sender: "user", text: inputText } as Message,
      ];
      setMessages(newMessages);
      setInputText("");

      // Now, since we ensured there's always a currentConversationId
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === currentConversationId) {
          return { ...conv, messages: newMessages };
        }
        return conv;
      });
      setConversations(updatedConversations);

      // Simulate bot thinking
      setTimeout(() => {
        typeBotMessage("Sample response from bot");
      }, 1000);
    }
  };

  const typeBotMessage = async (message: string) => {
    setIsBotTyping(true);

    // Fetch response from API
    const response = await fetchBotResponse(message);
    let botResp = { sender: "bot", text: response } as Message;
    setIsBotTyping(false);
    setMessages((prevMessages) => [...prevMessages, botResp]);
    console.log(messages)
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const handleNewChat = () => {
    const newConversation = {
      id: Date.now().toString(),
      messages: [],
    };

    setConversations((prev) => [...prev, newConversation]);
    selectConversation(newConversation.id);
    setSidebarOpen(true);
    setMessages([]); // Clear the current chat view.
  };
  return (
    <div
      className={`h-screen flex flex-col ${
        theme === "dark"
          ? "bg-darkBackground text-white"
          : "bg-lightBackground text-black"
      }`}
    >
      <AppBar />

      <div className="h-screen flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <AISidebar
            onClose={() => setSidebarOpen(false)}
            conversations={conversations}
            onConversationSelect={selectConversation}
            onStartNewConversation={handleNewChat}
          />
        )}

        {/* Chat Interface */}
        <div className="flex-1 p-6">
          {sidebarOpen ? (
            <button onClick={() => setSidebarOpen(false)}>
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </button>
          ) : (
            <button onClick={() => setSidebarOpen(true)}>
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </button>
          )}

          <div className="flex flex-col h-full justify-between">
            {/* Title Bar */}
            <div
              className={`flex items-center justify-between p-4 border-b border-gray-300 ${
                theme === "dark"
                  ? "bg-darkBackground text-white"
                  : "bg-lightBackground text-black"
              }`}
            >
              <div className="flex items-center">
                <h2 className="mr-2 text-xl font-semibold">ChatA</h2>
                <PencilIcon className="h-4 w-4 mr-2 text-blue-500 cursor-pointer hover:text-blue-400" />
                <TrashIcon className="h-4 w-4 text-blue-500 cursor-pointer hover:text-blue-400" />
              </div>
              <div className="flex items-center space-x-4">
                <select
                  className={`px-3 py-2 ${
                    theme === "dark"
                      ? "bg-darkBackground text-white"
                      : "bg-lightBackground text-black"
                  } border border-gray-300 rounded`}
                >
                  {/* Add options for the first select here */}
                  <option value="option1">Select the LOB</option>
                  <option value="option2">Option 2</option>
                </select>
                <select
                  className={`px-3 py-2 ${
                    theme === "dark"
                      ? "bg-darkBackground text-white"
                      : "bg-lightBackground text-black"
                  } border border-gray-300 rounded`}
                >
                  {/* Add options for the second select here */}
                  <option value="option1">Select the Collection</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>
            </div>
            {isPromptMode ? (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-center">
                  Ask everything you want!
                </h1>
                <AIPrompts
                  theme={theme}
                  onPromptSelected={(promptText) => {
                    setIsPromptMode(false);
                    setInputText(promptText);
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col h-full space-y-4 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-5 rounded-lg ${
                      msg.sender === "user"
                        ? theme === "dark"
                          ? "bg-gray-800 text-white"
                          : "bg-white"
                        : theme === "dark"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <div
                      className={`flex items-center w-full text-lg ${
                        msg.sender === "bot"
                          ? theme === "dark"
                            ? ""
                            : "bg-gradient-to-r from-gray-100 via-white to-gray-100"
                          : ""
                      }`}
                    >
                      {msg.sender === "bot" && Array.isArray(msg.text.response.result) ? (
                        <div className="flex items-center p-5">
                           <BoltIcon
                                className={`h-8 w-8 mr-3 ${
                                  theme === "dark" ? "text-white" : ""
                                }`}
                              />
                          
                                    <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)}>
                                        {msg.text.response.result.map((_:AnySoaRecord, idx:any) => (
                                            <Tab label={`Result ${idx + 1}`} key={idx} />
                                        ))}
                                    </Tabs>
                                    {msg.text.response.result.map((result:any, idx:any) => (
                                        <div key={idx} hidden={tabValue !== idx} className="tab-content">
                                            <Card>
                                                <CardHeader title={`Book: ${result.book}`} />
                                                <CardContent>
                                                    <Typography variant="body1">{result.context}</Typography>
                                                    <Link href={result.hyperlink} target="_blank">{result.section_title}</Link>
                                                </CardContent>
                                            </Card>
                                            <Typography variant="caption">Response Duration: {msg.text.response.duration}</Typography>
                                        </div>
                                    ))}
                                
                        </div>
                      ) : (
                        <div>
                          {msg.sender === "user" ? (
                            <>
                              <UserCircleIcon
                                className={`h-8 w-8 mr-3 ${
                                  theme === "dark" ? "text-white" : ""
                                }`}
                              />
                              <span>{msg.text}</span>
                            </>
                          ) :undefined}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="textbox relative">
              <textarea
                className={`w-full pl-5 pr-12 font-inter text-lg ${
                  theme === "dark"
                    ? "bg-darkBackground text-white"
                    : "bg-lightBackground text-black"
                } rounded border border-blue-500 outline-none hover:border-blue-600 focus:border-blue-500 disabled:border-blue-500 disabled:text-black disabled:bg-white`}
                rows={4}
                placeholder="Type your message..."
                disabled={false} // You can control this state dynamically
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
              ></textarea>
              <svg
                className="absolute top-1/2 right-5 transform -translate-y-1/2 h-6 w-6 text-blue-500"
                fill="#00BDD6FF"
                id="Flat"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                onClick={handleSendMessage}
              >
                <path d="M231.4,44.34s0,.1,0,.15l-58.2,191.94a15.88,15.88,0,0,1-14,11.51q-.69.06-1.38.06a15.86,15.86,0,0,1-14.42-9.15l-35.71-75.39a4,4,0,0,1,.79-4.54l57.26-57.27a8,8,0,0,0-11.31-11.31L97.08,147.6a4,4,0,0,1-4.54.79l-75-35.53A16.37,16.37,0,0,1,8,97.36,15.89,15.89,0,0,1,19.57,82.84l191.94-58.2.15,0A16,16,0,0,1,231.4,44.34Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
