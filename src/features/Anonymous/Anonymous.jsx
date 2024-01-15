import { AppBar, Box, Stack, TextField, Typography, Toolbar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "antd";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageIcon from "@mui/icons-material/Message";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./index.css";
import userApi from "../../api/userApi";
import { useEffect, useRef } from "react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import SearchIcon from "@mui/icons-material/Search";
import { AiOutlineSearch } from "react-icons/ai";
import { FaSmile, FaSadTear, FaGrin, FaDizzy, FaAngry, FaMeh } from "react-icons/fa";
import { AiOutlineMore, AiFillMessage } from "react-icons/ai";

const options = [
  'All',
  'Recent',
]
const Anonymous = () => {
  //@kitsuneremi
  const messageBoxRef = useRef(null)
  const messageInputRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [targetMessageUserData, setTargetMessageUserData] = useState(null);
  const [messageListData, setMessageListData] = useState([]);

  const [CountMessage, setCountMessage] = useState(0);
  const [getMessage, setGetMessageuser] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [listUserOnline, setlistUserOnline] = useState([]);
  const [UserOnlineId, setUserOnlineId] = useState(10);
  const [UserIdSend, setUserIdSend] = useState([]);
  const [statusMess, setstatusMess] = useState();
  const [inputUser, setInputUser] = useState("");
  const [togglSearch, setTogglSearch] = useState(false);
  const [toggleOption, setToggleOption] = useState(false);
  const [toggleBlock, setToggleBlock] = useState(true);
  const [toggleRemoveBlock, setToggleRemoveBlock] = useState(true);
  const [toggleSearchContext, setToggleSearchContext] = useState(false);
  const [file, setFile] = useState(null);
  const [listInputUser, setListInputUser] = useState([]);
  const [listSearchUser, setListSearchUser] = useState([]);
  const [toggleIcon, setToggleIcon] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const My_button = styled(Button)({ backgroundColor: "#5BE260", color: "#fff" });
  const My_text = styled(Typography)({
    color: "#fff",
  });

  const users = useSelector((state) => state.user.current) || JSON.parse(localStorage.getItem("user"));

  const handle_delete = () => {
    const deleteUser = document.querySelectorAll(".deleteUser");
    deleteUser.forEach((el) => {
      el.addEventListener("click", () => {
        const parent = el.parentElement.parentElement;
        parent.classList.add("none");
      });
    });
  };
  useEffect(() => {
    setCountMessage(getMessage.length);
    document.title = `Bạn đang có ${getMessage.length} tin nhắn`;
  }, [CountMessage]);

  useEffect(() => {
    const check = listUserOnline.filter(user => user.name.includes(inputUser));
    setListInputUser(check);
    if (check.length >= 1) {
      setTogglSearch(!togglSearch);
    }
  }, [inputUser]);

  const HandleMessage = () => {
    const messageAnoymous = document.querySelectorAll(".messageAnoymous");
    messageAnoymous.forEach((el, index) => {
      el.addEventListener("click", (e) => {
        console.log(el.getAttribute("data-id"));
        const dataId = el.getAttribute("data-id");
        console.log(dataId);
        const [checkUser] = listUserOnline.filter((user) => user.id == dataId);
        console.log(checkUser);
        setUserOnlineId(checkUser);
      });
    });
    userApi.getMessage(UserOnlineId && UserOnlineId.id).then((data) => {
      setGetMessageuser(data.data);
    });
  };

  useEffect(() => {
    console.log(users)
  }, [users])

  //@kitsuneremi refresh message after change user
  useEffect(() => {
    if (targetMessageUserData) {
      axios.get(`https://sakaivn.online/message/chat-unknown/${users.id}`)
        .then(res1 => {
          const data1 = res1.data.data.filter(message => Number.parseInt(message.idSend) === users.id);

          axios.get(`https://sakaivn.online/message/chat-unknown/${targetMessageUserData.id}`)
            .then(res2 => {
              const data2 = res2.data.data.filter(message => Number.parseInt(message.idReceive) === users.id);

              // Gộp hai mảng
              const mergedData = [...data1, ...data2];

              // Sắp xếp mảng theo trường sendAt
              const sortedData = mergedData.sort((a, b) => new Date(a.sendAt) - new Date(b.sendAt));
              console.log(sortedData)
              // Lưu vào state
              setMessageListData(sortedData);
            })
            .catch(err => {
              console.log(err);
              setMessageListData([]);
            });
        })
        .catch(err => {
          console.log(err);
          setMessageListData([]);
        });

    }
  }, [targetMessageUserData])

  useEffect(() => {
    userApi.userOnline().then((res) => {
      const status = res.users.filter((user) => user.statesLogin === 1);
      setlistUserOnline(status);
    });
  }, []);

  useEffect(() => {
    userApi.getMessage(users.id).then((data) => {
      setUserIdSend(data.data);
    });
  }, []);

  useEffect(() => {
    if (messageInputRef.current)
      messageInputRef.current.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
          // console.log(1);
          // sendMessage();
        }
      });
  }, [messageInputRef.current]);

  //search
  useEffect(() => {
    const Content = getMessage.filter((mess) => mess.content.includes(searchContent));
    const received = UserIdSend.filter((mes) => mes.content.includes(searchContent));
    setListSearchUser(Content.concat(received));
    // if (listSearchUser.length >= 1) {
    //   messageBoxRef.current.style.display = "none";
    //   // document.querySelector(".Box_message").style.display = "none";
    // } else {
    //   messageBoxRef.current.style.display = "block";
    //   // document.querySelector(".Box_message").style.display = "block";
    // }
    // Content
    //   ? (document.querySelector(".Box_message").style.display = "none")
    //   : (document.querySelector(".Box_message").style.display = "block");
    // document.querySelector(".seachAnoymours").addEventListener("keydown", function (e) {
    //   if (e.keyCode === 13) {
    //     if (getMessage.length >= 1) {
    //       const Content = getMessage.filter((mess) => mess.content == searchContent);
    //       Content.forEach((message, index) => {
    //         document.querySelector(".HylinkSearch").setAttribute("href", `#${+message.id}`);
    //         const idContentSearch = document.querySelector(".HylinkSearch").getAttribute("href");
    //         setCurrentMessageId(idContentSearch);
    //       });
    //     } else if (getMessage == null) {
    //       console.log("null");
    //     } else {
    //       console.log("err");
    //     }
    //     const idContent = document.querySelectorAll(".contentMessage");
    //     idContent.forEach((id, index) => {
    //       const test = id.getAttribute("id");

    //       if (currentMessageId == `#${test}`) {
    //         id.style.backgroundColor = "#000";
    //         id.style.color = "#fff";
    //       } else {
    //         console.log("lỗi");
    //       }
    //     });
    //   }
    // });
  }, [searchContent]);

  //// xu ly file
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(file);
    };
  }, [file]);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    console.log(URL.createObjectURL(file));
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const sendMessage = () => {
    // http://14.225.7.221:18011
    const data = axios({
      method: "POST",
      url: `https://sakaivn.online/message/chat-unknown/${targetMessageUserData.id}`,
      data: {
        content: messageContent,
        id: "",
        idReceive: targetMessageUserData.id,
        idSend: users.id,
        sendAt: new Date().toISOString(),
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    data.then((datas) => {
      setstatusMess(datas.data.message);
    });
    setMessageContent("");
  };

  /// block message
  const handleBlock = () => {
    setToggleOption(!toggleOption);
    if (UserOnlineId && !UserOnlineId.id) {
      return enqueueSnackbar("vui lòng chọn user", { variant: "error" });
    }
    setToggleBlock(!toggleBlock);
    const input = document.querySelector(".ChatMessage");
    const notifityBlock = document.querySelector(".notifityBlock");
    input.style.display = "none";
    notifityBlock.style.display = "block";
    enqueueSnackbar("Chặn tin nhắn thành công", { variant: "success" });
  };
  /// hủy block
  const handleRemoveBlock = () => {
    setToggleOption(!toggleOption);
    if (UserOnlineId && !UserOnlineId.id) {
      return enqueueSnackbar("vui lòng chọn user", { variant: "error" });
    }
    setToggleRemoveBlock(!toggleRemoveBlock);
    const input = document.querySelector(".ChatMessage");
    const notifityBlock = document.querySelector(".notifityBlock");
    input.style.display = "block";
    notifityBlock.style.display = "none";
    enqueueSnackbar(" Hủy chặn tin nhắn thành công", { variant: "success" });
  };
  ///search messge

  const handleSearch = () => {
    setToggleOption(!toggleOption);
    if (UserOnlineId == users.id) {
      return enqueueSnackbar(" vui lòng chọn user ", { variant: "error" });
    } else {
      const search = document.querySelector(".seachAnoymours");
      setToggleSearchContext(!toggleSearchContext);
      search.style.display = `${toggleSearchContext ? "none" : "block"}`;

      enqueueSnackbar(" tìm kiếm tin nhắn", { variant: "success" });
    }
  };

  const FlexMenu = ({ listData }) => {
    return (
      <>
        <div className="flex max-sm:overflow-x-scroll">
          {options.map((option, index) => {
            return (
              <button onClick={() => { if (index != selectedIndex) { setSelectedIndex(index) } }} key={index} className={`px-3 py-2 ${selectedIndex == index ? 'relative text-blue-600 after:absolute after:w-full after:h-[2px] after:bg-blue-600 after:left-0 after:bottom-0 after:rounded-lg' : ''}`}>
                {option}
              </button>
            )
          })}
        </div>
        <div className="h-[calc(100%-140px)]">
          {ContentRender(selectedIndex, listData)}
        </div>
      </>

    )
  }

  const ContentRender = (index, listData) => {
    if (index == 0) {
      return (
        <div className="flex h-full flex-col gap-2 overflow-y-auto tiny-scrollbar">
          {listData.map((data, index) => {
            return (
              <div className="flex justify-between" key={index}>
                <div className="flex gap-4 items-center">
                  <div className="w-16 aspect-square relative">
                    <img className="w-full h-full rounded-full" src={data.img} alt="a picture" />
                    <div className="absolute w-4 h-4 bg-green-500 rounded-full bottom-1 right-1 border-[1px] border-white" />
                  </div>
                  <p className="text-white text-xl">{ReduceString({ string: data.name, maxLength: 12 })}</p>
                </div>
                <div className="flex items-center text-white">
                  <div className="text-2xl" onClick={() => { setTargetMessageUserData(data) }}><AiFillMessage /></div>
                  <div className="text-2xl"><AiOutlineMore /></div>
                </div>
              </div>
            )
          })}
        </div>
      )
    } else if (index == 1) {

    }
  }

  return (
    <div className="flex w-screen h-[100dvh]">
      <div className="max-w-[430px] h-full bg-black px-[40px] py-[40px] md:max-lg:w-[240px] md:max-lg:p-4">
        <div className="flex justify-between items-center h-[65px]">
          <div className="flex gap-4 items-center">
            <img className="w-16 h-16" src={`${process.env.PUBLIC_URL + "/assets/andanh.png"}`} />
            <p className="text-white text-3xl">Anonymous</p>
          </div>
          <SettingsIcon className="text-white text-3xl" />
        </div>

        {/* anonymous mode describe box */}
        <Box
          className='box_anoymous'
          id='BoxBtnQuit'
          sx={{
            width: 100 + "%",
            height: 220 + "px",
            display: "flex",
            flexDirection: "column",
            borderRadius: 12 + "px",
          }}
        >
          <Stack direction='row' alignItems='center' justifyContent='center'>
            <img
              style={{
                width: 45 + "px",
                height: 45 + "px",
              }}
              src={`${process.env.PUBLIC_URL + "/assets/andanh.png"}`}
            ></img>
            <My_text variant='h5'>Anonymous</My_text>
          </Stack>
          <My_text textAlign='center' variant='subtitle1'>
            You now in anonymous mode. You can chat with others anonymously
          </My_text>
          <Link to={"/home/profile"}>
            <My_button
              style={{
                marginBottom: 10 + "px",
                marginTop: 10 + "px",
                fontSize: 18 + "px",
                height: 50 + "px",
                width: 100 + "%",
              }}
              color={My_button}
            >
              Quit
            </My_button>
          </Link>
        </Box>
        <div className="flex flex-col gap-4 w-full h-[calc(100%-65px-220px)]">
          {/* search online user box */}
          <div className="flex w-full items-center h-12 bg-slate-500 rounded-3xl my-3">
            <input
              className="bg-transparent pr-1 w-full focus:outline-none ml-3 my-1 text-base leading-6"
              value={inputUser}
              placeholder="Search for user..."
              onChange={(e) => {
                setInputUser(e.target.value);
              }}
            />
            <div className="w-[2px] h-full relative after:absolute after:bg-slate-300 dark:after:bg-slate-500 after:h-[90%] after:top-[5%] after:left-0 after:w-full" />
            <div className="h-full w-fit text-3xl text-white px-3 flex flex-col justify-center cursor-pointer hover:bg-slate-400 dark:hover:bg-slate-700 dark:text-[white] rounded-r-2xl">
              <AiOutlineSearch />
            </div>
          </div>
          {/* flex menu */}
          {togglSearch ? FlexMenu({ listData: listInputUser }) : FlexMenu({ listData: listUserOnline })}
        </div>
      </div>

      <div className="w-full h-screen relative">
        <img
          style={{
            width: 100 + "%",
            height: 100 + "%",
            objectFit: "cover",
          }}
          src={"https://st.quantrimang.com/photos/image/2018/01/05/bo-suu-tap-hinh-nen-3.jpg"}
          alt=''
        />
        {/*  */}
        <div>
          {targetMessageUserData &&
            <header className='absolute w-full flex h-20 items-center justify-between top-0 px-[3%] bg-black bg-opacity-20'>
              <Link to={`/profile/${targetMessageUserData.id}`}>
                <div className="flex items-center">
                  <img className="w-16 aspect-square rounded-full mr-3"
                    src={targetMessageUserData.img}
                    alt=''
                  />
                  <p className="text-2xl font-bold text-white">{targetMessageUserData.name}</p>
                </div>
              </Link>
              <MoreHorizIcon
                onClick={() => {
                  setToggleOption(!toggleOption);
                }}
                style={{
                  position: "relative",
                  color: "#fff",
                }}
              />
              <div className={`${toggleOption ? 'block' : 'none'} flex flex-col min-w-[150px] z-[100] h-fit rounded-xl p-3 bg-blue-50 absolute top-[60px] right-[30px] text-black `}>
                <div onClick={handleSearch} className={"w-full px-3 py-3 rounded-sm cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700"}>
                  <p className="w-full min-w-[160px] select-none">Tìm kiếm</p>
                </div>
                <div onClick={handleBlock} className={"w-full px-3 py-3 rounded-sm cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700"}>
                  <p className="w-full min-w-[160px] select-none">Chặn tin nhắn</p>
                </div>
                <div onClick={handleRemoveBlock} className={"w-full px-3 py-3 rounded-sm cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700"}>
                  <p className="w-full min-w-[160px] select-none">Hủy chặn tin nhắn</p>
                </div>
              </div>
            </header>
          }


          {/*  */}
          {/* <div className='text-white hidden z-50'>
          <header
            className='box_anoymous'
            style={{
              position: "absolute",
              width: 65 + "%",
              display: "flex",
              height: 80 + "px",
              alignItems: "center",
              justifyContent: "space-between",
              top: 81,
              color: "#fff",
            }}
          >
            <Stack
              style={{
                width: 100 + "%",
              }}
              direction='row'
              alignItems='center'
            >
              <SearchIcon
                style={{
                  fontSize: 35 + "px",
                }}
              />

              <input
                className='inputSearchcontent'
                value={searchContent}
                onChange={(e) => setSearchContent(e.target.value)}
                style={{
                  width: 100 + "%",
                  height: 50 + "px",
                  padding: 2 + "px",
                  fontSize: 17 + "px",
                  borderStyle: "solid",
                  borderWidth: 1 + "px",
                  backgroundColor: "rgba(255, 255, 255, 10%)",
                  outline: "none",
                }}
              />
              <a className='HylinkSearch' style={{ color: "#fff", cursor: "pointer" }}>
                <ArrowDownwardIcon />
              </a>
            </Stack>
          </header>
        </div> */}
          {/* message render */}
          <div ref={messageBoxRef} className='absolute w-full right-0 top-[80px] h-[calc(100%-160px)]'>
            <div className="flex flex-col gap-2">
              {
                targetMessageUserData &&
                messageListData.map(message => {
                  return (
                    <div key={message.id} className="flex flex-col items-center">
                      <div className={`p-2 rounded-full w-fit max-w-[66%] flex gap-2 ${message.idSend == users.id ? 'flex-row-reverse self-end' : 'flex-row'} mt-2`}>
                        <img className="w-16 aspect-square rounded-full" src={`${targetMessageUserData.img || process.env.PUBLIC_URL + "/assets/user.png"}`} alt='' />
                        <div className="bg-white text-black p-3 min-h-[50px] rounded-3xl ml-2">
                          <div className="flex flex-col gap-1">
                            <p className={`font-bold text-xl ${message.idSend == users.id ? 'self-end' : ''}`} id={message.id}>
                              {message.content}
                            </p>
                            <p className={`text-xs font-thin text-slate-500 ${message.idSend == users.id ? 'self-end' : ''}`}>{message.sendAt}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <>
              {
                UserOnlineId &&
                UserIdSend.map((message) => {
                  return UserOnlineId.id == message.idReceive ? (
                    <Stack mt={4} direction='column' alignItems='center'>
                      <Stack
                        style={{
                          marginLeft: 100 + "px",
                          backgroundColor: "#5BE260",
                          padding: 10 + "px",
                          borderRadius: 50 + "px",
                        }}
                        direction={"row"}
                        mt={2}
                      >
                        <>
                          <img
                            style={{ width: 60 + "px", height: 60 + "px" }}
                            src={`${process.env.PUBLIC_URL + "/assets/anoymous.png"}`}
                            alt=''
                          ></img>
                          <Box
                            classList={"sent"}
                            ml={2}
                            sx={{
                              width: 450 + "px",
                              padding: 10 + "px",
                              minHeight: 50 + "px",
                              borderRadius: 24 + "px",
                            }}
                          >
                            <div>
                              <p id={message.id} className='contentMessage' style={{ fontWeight: 600 }}>
                                {message.content}
                              </p>
                              <p>Đã gửi:{message.sendAt} </p>
                            </div>
                          </Box>
                        </>
                      </Stack>
                    </Stack>
                  ) : (
                    ""
                  );
                })
              }
            </>
            <div>
              {file && (
                <div>
                  <img style={{ marginTop: 15 + "px" }} src={URL.createObjectURL(file)} alt='' />
                  <My_text>{file.name}</My_text>
                  <a
                    style={{
                      color: "#fff",
                    }}
                    href={URL.createObjectURL(file)}
                    download
                  >
                    {" "}
                    Download
                  </a>
                </div>
              )}
            </div>
          </div>
          {/* message render end */}
          {/* <div>
            {listSearchUser &&
              listSearchUser.map((mess) => {
                return (
                  <a
                    href={`#${mess.id}`}
                    onClick={() => {
                      document.querySelector(".Box_message").style.display = "block";
                      console.log(document.getElementById(`${mess.id}`));
                      document.getElementById(`${mess.id}`).style.backgroundColor = "#000";
                      document.getElementById(`${mess.id}`).style.color = "#fff";
                      document.getElementById(`${mess.id}`).style.borderRadius = 12 + "px";
                      setListSearchUser("");
                    }}
                  >
                    <p
                      style={{
                        position: "absolute",
                        maxWidth: 800 + "px",
                        borderRadius: 32 + "px",
                        marginBottom: 30 + "px",
                        color: "#fff",
                        left: 500,
                        top: 200,
                      }}
                    >
                      {mess.content}
                    </p>
                  </a>
                );
              })}
          </div> */}
        </div>

        {targetMessageUserData && <div className='w-full flex justify-around items-center h-20 absolute bottom-0 left-0 bg-white bg-opacity-20'>
          <div className="flex gap-4 items-center">
            <img
              style={{ width: 60 + "px", height: 60 + "px" }}
              src={`${process.env.PUBLIC_URL + "/assets/anoymous.png"}`}
              alt=''
            />
            {/* drop file to send */}
            <div {...getRootProps()}>
              {isDragActive ? (
                <AttachFileIcon
                  {...getInputProps()}
                  className='File'
                  style={{
                    fontSize: 35 + "px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <AttachFileIcon
                  className='File'
                  style={{
                    fontSize: 35 + "px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
            {/* react drop zone end */}
            <div className="cursor-pointer mr-1 relative" onClick={() => { setToggleIcon(!toggleIcon) }}>
              <FaSmile size={35} color='#FFF' />
            </div>
            <div className={`flex ${toggleIcon ? "block" : "none"} absolute top-[-205px] flex-wrap w-52 h-52 bg-white`}>
              <FaSmile size={32} color='yellow' />
              <FaSadTear size={32} color='blue' />
              <FaGrin size={32} color='green' />
              <FaDizzy size={32} color='purple' />
              <FaAngry size={32} color='red' />
              <FaMeh size={32} color='orange' />
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {/* message input */}
            <TextField
              className={"inputMessageAnoymous"}
              style={{
                backgroundColor: "#D3D3D3",
                width: 550 + "px",
                borderRadius: 32 + "px",
              }}
              ref={messageInputRef}
              placeholder='Give a comment'
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            ></TextField>
            <button className="w-16 h-16 p-2" onClick={sendMessage}>
              <img
                className=""
                src={`${process.env.PUBLIC_URL + "/assets/send.png"}`}
                alt=''
              />
            </button>
          </div>
        </div>
        }
        <Typography
          className='notifityBlock'
          mt={1}
          sx={{
            display: "none",
            position: "absolute",
            bottom: 0,
            left: 45 + "%",
            color: "#fff",
            fontSize: 22 + "px",
          }}
        >
          Người này đã đang bị chặn , Bạn không thể liên lạc
        </Typography>
      </div>
    </div>
  );
};

export default Anonymous;

function ReduceString({ string, maxLength }) {
  if (!string) {
    return '';
  }
  if (string.length > maxLength) {
    return string.substring(0, maxLength) + '...';
  } else {
    return string;
  }
}