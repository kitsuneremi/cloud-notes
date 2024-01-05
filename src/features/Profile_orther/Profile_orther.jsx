import React from "react";
import axios from "axios";
import classes from "./styles.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { checkJWT } from "../../constants";
import ListView from "../Archived/ListView";
import StorageKeys from "../../constants/storage-keys";
import jwtDecode from "jwt-decode";
import { Box, createTheme, Typography, Button, Stack, TextField } from "@mui/material";
import InputField from "../../components/FormControls/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'


const TestData = [{
  "color": { a: 0.87, b: 125, g: 125, r: 255 },
  "createAt": "2024-01-04 20:30:44",
  "data": "test content 2",
  "doneNote": 0,
  "dueAt": null,
  "idNote": 96,
  idUser: 39,
  linkNoteShare: "",
  lock: null,
  notePublic: 1,
  pinned: 0,
  remindAt: null,
  title: "test note 2",
  type: "text",
  updateAt: "Thu, 04 Jan 2024 20:30:44 GMT"
}]

function Profile_orther({ data, handleDelNote, setArchivedData, toolsNote }) {
  const user =
    useSelector((state) => state.user.current) || JSON.parse(localStorage.getItem("user"));
  const [otherProfile, setOtherProfile] = useState({});
  const [note, setNote] = useState([]);
  const [startIndex, setStartIndex] = useState(5);
  const [toggleNote, setToggleNote] = useState(false);
  const [limitedData, setLimitedData] = useState([]);
  const { id } = useParams();
  const handleOpenDrawer = (param) => {
    // setType(param);
    // setDrawerNew(true);
    // setOptions({ ...options, dueAt: null, remindAt: null, lock: null, notePublic: true });
    // setColorNote(user.df_color);
  };

  // const usergg = jwtDecode(localStorage.getItem(StorageKeys.TOKEN));

  useEffect(() => {
    // const api_profile = async () => {
    //   const result = await axios({
    //     method: "GET",
    //     url: `https://sakaivn.online/profile/${id}`,
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    //     },
    //   });
    //   return result.data;
    // };
    // api_profile().then((data) => {
    //   setOtherProfile(data);
    //   setLimitedData(data.note.slice(2, startIndex));
    //   // setUser(data.user);
    //   // setUserName(data.user.name);
    //   // setGmailUser(data.user.gmail);
    //   setNote(data.note);
    // });
  }, []);

  // useEffect(() => {
  //   if(otherProfile){
  //     axios.get(`https://sakaivn.online/profiles_search?key=${otherProfile.userId}`).then(data => {
  //       set
  //     })

  //   }
  // },[otherProfile])

  const handle_viewMore = () => {
    setStartIndex((startIndex) => startIndex + 5);
  };
  const handleToggle = () => {
    setToggleNote(!toggleNote);
  };
  return (
    <>
      <SideBar />
      <div className={`${classes.wapper_profile}`}>
        <div className='wapper_profile_box'>
          <div className={`${classes.wapper_profile_contain}`}>
            <img className={`${classes.wapper_profile_img}`} src={otherProfile.AvtProfile}></img>
          </div>
        </div>
        <div
          className="m-auto translate-y-[-12px]">
          <div
            className={`${classes.wapper_content} ${classes.AvaUser} ${classes.colum} gap-[98px]`}
          >
            <div
              className={`${classes.wapper_content} gap-[20px]`}
            >
              <div style={{ cursor: "pointer" }}>
                <img
                  style={{ width: "80px", height: "80px", borderRadius: "50px" }}
                  src={otherProfile.Avarta}
                />
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {" "}
                  {otherProfile.name}
                </p>
                <p
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {" "}
                  join at 26st , jul 2023
                </p>
              </div>
            </div>
            <div
              style={{
                gap: 24 + "px",
              }}
              className={`${classes.wapper_content} ${classes.Gap} ${classes.colum2}`}
            >
              <div className={`${classes.wapper_content} bg-[#3644C7] rounded-[12px] cursor-pointer`}>
                <img
                  style={{
                    width: 26 + "px",
                    height: 26 + "px",
                    marginLeft: 5 + "px",
                  }}
                  src={`${process.env.PUBLIC_URL + "/assets/Group 48096879.png"}`}
                  alt=''
                />
                <button
                  className={`${classes.SizeButton}`}
                  style={{
                    backgroundColor: "#3644C7",
                    border: "none",
                    borderRadius: 12 + "px",
                    paddingTop: 8 + "px",
                    paddingBottom: 8 + "px",
                    paddingLeft: 12 + "px",
                    paddingRight: 12 + "px",
                    color: "#FFFFFF",
                    fontSize: 16 + "px",
                    cursor: "pointer",
                  }}
                >
                  add to your group{" "}
                </button>
              </div>
              <div
                className={`${classes.wapper_content}`}
                style={{
                  backgroundColor: "#3644C7",
                  borderRadius: 12 + "px",
                  cursor: "pointer",
                }}
              >
                {checkJWT() ? (
                  <Link
                    to={"/login"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{
                        width: 26 + "px",
                        height: 26 + "px",
                        marginLeft: 5 + "px",
                      }}
                      src={`${process.env.PUBLIC_URL + "/assets/Vector.png"}`}
                      alt=''
                    />
                    <button
                      style={{
                        backgroundColor: "#3644C7",
                        border: "none",
                        borderRadius: 12 + "px",
                        paddingTop: 8 + "px",
                        paddingBottom: 8 + "px",
                        paddingLeft: 12 + "px",
                        paddingRight: 12 + "px",
                        color: "#FFFFFF",
                        fontSize: 16 + "px",
                        cursor: "pointer",
                      }}
                    >
                      Messenger
                    </button>
                  </Link>
                ) : (
                  <Link to={"/Anonymous"}>
                    <button
                      style={{
                        backgroundColor: "#3644C7",
                        border: "none",
                        borderRadius: 12 + "px",
                        paddingTop: 8 + "px",
                        paddingBottom: 8 + "px",
                        paddingLeft: 12 + "px",
                        paddingRight: 12 + "px",
                        color: "#FFFFFF",
                        fontSize: 16 + "px",
                        cursor: "pointer",
                      }}
                    >
                      Messenger
                    </button>
                  </Link>
                )}
              </div>
              <div
                style={{
                  borderRadius: 12 + "px",
                  backgroundColor: "#3644C7",
                  cursor: "pointer",
                }}
                className={`${classes.wapper_content}`}
              >
                <img
                  style={{
                    width: 26 + "px",
                    height: 26 + "px",
                    marginLeft: 5 + "px",
                  }}
                  src={`${process.env.PUBLIC_URL + "/assets/Vector (1).png"}`}
                  alt=''
                />
                <button
                  className={`${classes.SizeButton}`}
                  style={{
                    backgroundColor: "#3644C7",
                    border: "none",
                    borderRadius: 12 + "px",
                    paddingTop: 8 + "px",
                    paddingBottom: 8 + "px",
                    paddingLeft: 12 + "px",
                    paddingRight: 12 + "px",
                    color: "#FFFFFF",
                    fontSize: 16 + "px",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  Create group
                </button>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 20 + "px",
              minHeight: 200 + "px",
            }}
          >

            {/*profile content */}
            <div>
              {/* {Note.slice(0, startIndex).map((val, index) => {
                  const lastindex = Note.slice(0, startIndex).length - 1;
                  return (
                    <div
                      onClick={handleToggle}
                      key={index}
                      style={{
                        cursor: "pointer",
                        justifyContent: "start",
                        gap: 10 + "px",
                        backgroundColor: "#FFFFFF",
                        paddingTop: 12 + "px",
                        paddingBottom: 12 + "px",
                        paddingLeft: 24 + "px",
                        paddingRight: 24 + "px",
                        borderBottom: 1 + "px solid",
                        borderBottomColor: "#818181",
                      }}
                      className={
                        index == 0
                          ? classes.styleFist
                          : index == lastindex
                            ? classes.styleLast
                            : "" + `${classes.wapper_content}`
                      }
                    >
                      <h2>{index + 1}</h2>
                      <p
                        style={{
                          margin: 5 + "px",
                        }}
                      >
                        {userName}
                      </p>
                      <p className={`${classes.profile_text}`}>{"" + val.data}</p>
                      <div
                        className={`${classes.none}`}
                        style={{
                          position: "absolute",
                          right: 170 + "px",
                          cursor: "pointer",
                        }}
                      >
                        <p>{val.createAt}</p>
                      </div>
                    </div>
                  );
                })} */}
            </div>
            {console.log(user)}
            <ListNoteRender listData={TestData} user={user} />

          </div>
        </div>
      </div>
    </>
  );
}
export default Profile_orther;


const ListNoteRender = ({ listData, user }) => {
  const NoteRender = (noteData) => {
    const [listComment, setListComment] = useState([])

    useEffect(() => {
      
      axios.get(`https://sakaivn.online/notes/notes-comment/${noteData.noteData.idNote}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      }).then(data => {
        setListComment(data);
      })
    }, [])
    const commentFormObject = yup.object().shape({
      value: yup.string().required("enter comment")
    }).required();

    const [showComment, setShowComment] = useState(false);
    const commentForm = useForm({
      defaultValues: {
        value: "",
      },
      resolver: yupResolver(commentFormObject)
    })

    const handlePostComment = (values) => {
      axios.post("https://sakai.online/notes/notes-comment", {
        idNote: noteData.noteData.noteId,
        idUser: user.id,
        parentId: 0,
        text: values.value
      })
    }

    return (
      <div
        className="border-[1px solid #e2e2e2] rounded-[12px] px-[6px] py-[12px] mx-[12px] my-[5px] shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] h-max"
        style={{
          backgroundColor: `rgba(${noteData.noteData.color.r}, ${noteData.noteData.color.g}, ${noteData.noteData.color.b}, ${noteData.noteData.color.a})`,
        }}>
        {/* note's main */}
        <Box
          sx={{
            padding: "8px 14px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            {/* <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="109" height="109" viewBox="0 0 109 109" fill="none">
                          <path d="M73.4944 9.16724H35.5054C19.0042 9.16724 9.16699 19.0045 9.16699 35.5056V73.4946C9.16699 86.2332 15.0149 94.9824 25.3055 98.2917C28.2975 99.3344 31.7428 99.833 35.5054 99.833H73.4944C77.257 99.833 80.7023 99.3344 83.6943 98.2917C93.9848 94.9824 99.8328 86.2332 99.8328 73.4946V35.5056C99.8328 19.0045 89.9956 9.16724 73.4944 9.16724ZM93.0329 73.4946C93.0329 83.1959 89.2249 89.3158 81.5636 91.8544C77.1663 83.1959 66.7398 77.0306 54.4999 77.0306C42.26 77.0306 31.8788 83.1505 27.4362 91.8544H27.3908C19.8202 89.4065 15.9669 83.2412 15.9669 73.54V35.5056C15.9669 22.7218 22.7215 15.9672 35.5054 15.9672H73.4944C86.2783 15.9672 93.0329 22.7218 93.0329 35.5056V73.4946Z" fill="black" />
                          <path d="M54.5085 36.3672C45.5326 36.3672 38.2793 43.6205 38.2793 52.5964C38.2793 61.5723 45.5326 68.8709 54.5085 68.8709C63.4844 68.8709 70.7376 61.5723 70.7376 52.5964C70.7376 43.6205 63.4844 36.3672 54.5085 36.3672Z" fill="black" />
                      </svg>
                  </div> */}
            <img style={{ width: "70px", height: "70px", borderRadius: "9999px" }} src={user.Avarta ? user.Avarta : ""} />

            {/* note description */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                height: "60px",
                flexGrow: 1
              }}
            >
              {/*note's owner detail */}
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}>
                <p style={{
                  color: "#000",
                  fontFamily: "Roboto",
                  fontSize: "22px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "28.687px",
                  letterSpacing: "-0.532px"
                }}>{user.name}</p>
                <p style={{
                  color: "#000",
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "28.687px",
                  letterSpacing: "-0.532px"
                }}>join at date?</p>
              </Box>
              {/*note's menu icon */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* share button */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 49" fill="none">
                  <path d="M42 24.5L28 10.5V18.5C14 20.5 8 30.5 6 40.5C11 33.5 18 30.3 28 30.3V38.5L42 24.5Z" fill="black" />
                </svg>

                {/* delete button */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 49" fill="none">
                  <path d="M32.38 4.5H15.62C8.34 4.5 4 8.84 4 16.12V32.86C4 40.16 8.34 44.5 15.62 44.5H32.36C39.64 44.5 43.98 40.16 43.98 32.88V16.12C44 8.84 39.66 4.5 32.38 4.5ZM31.52 32.02C31.4 33.72 31.26 35.84 27.42 35.84H20.58C16.76 35.84 16.6 33.72 16.48 32.02L15.86 24.1C15.8411 23.8463 15.8739 23.5914 15.9564 23.3508C16.0389 23.1101 16.1694 22.8887 16.34 22.7C16.5104 22.5151 16.7177 22.3679 16.9485 22.268C17.1793 22.1681 17.4285 22.1177 17.68 22.12H30.32C30.82 22.12 31.32 22.34 31.66 22.7C32 23.08 32.18 23.58 32.14 24.08L31.52 32.02ZM33.6 20.14H33.48C31.4 19.94 29.5 19.8 27.68 19.72C25.2355 19.5899 22.7863 19.5699 20.34 19.66C19.14 19.72 17.92 19.8 16.72 19.92L14.54 20.14H14.4C13.7 20.14 13.1 19.62 13.04 18.9C12.96 18.16 13.52 17.48 14.26 17.42L16.44 17.2C17.3 17.12 18.14 17.06 19 17.02L19.16 16.08C19.32 15.08 19.62 13.16 22.62 13.16H25.4C28.42 13.16 28.72 15.14 28.86 16.1L29.02 17.06C30.52 17.14 32.06 17.26 33.74 17.42C34.5 17.5 35.04 18.16 34.98 18.92C34.9 19.62 34.3 20.14 33.6 20.14Z" fill="black" />
                </svg>
              </Box>
            </Box>
          </Box>
          {/* note content */}
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            <p style={{
              color: "#000",
              fontFamily: "Roboto",
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "28.687px",
              letterSpacing: "-0.532px"
            }}>{noteData.noteData.title}</p>
            <p style={{
              color: "#000",
              fontFamily: "Roboto",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "28.687px",
              letterSpacing: "-0.532px"
            }}>{noteData.noteData.data}</p>
          </Box>
        </Box>
        {/* note reaction */}
        <Box
          sx={{
            padding: "0 15px"
          }}
        >
          <p style={{ margin: "30px 0" }}>Created at {noteData.noteData.createAt}</p>
          <Box sx={{
            justifyContent: "flex-end",
            display: "flex",
            gap: "20px",
            alignItems: "center"
          }}>
            {/* note like count*/}
            <Box sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center"

            }}
              onClick={() => {

              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 29 30" fill="none">
                <path d="M8.40039 14.0002L13.2004 3.2002C14.1552 3.2002 15.0708 3.57948 15.746 4.25461C16.4211 4.92974 16.8004 5.84542 16.8004 6.80019V11.6002H23.5924C23.9403 11.5963 24.2849 11.668 24.6023 11.8105C24.9197 11.9529 25.2023 12.1627 25.4306 12.4252C25.6589 12.6877 25.8274 12.9968 25.9244 13.3309C26.0214 13.665 26.0446 14.0162 25.9924 14.3602L24.3364 25.1602C24.2496 25.7325 23.9589 26.2541 23.5179 26.629C23.0768 27.0039 22.5152 27.2067 21.9364 27.2002H8.40039M8.40039 14.0002V27.2002M8.40039 14.0002H4.80039C4.16387 14.0002 3.55342 14.2531 3.10333 14.7031C2.65325 15.1532 2.40039 15.7637 2.40039 16.4002V24.8002C2.40039 25.4367 2.65325 26.0472 3.10333 26.4972C3.55342 26.9473 4.16387 27.2002 4.80039 27.2002H8.40039" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p className="text-[#000] text-[22px] font-light">1</p>
            </Box>
            {/* note dislike count */}
            <Box sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="none">
                <path d="M21.2002 16.2002L16.4002 27.0002C15.4455 27.0002 14.5298 26.6209 13.8546 25.9458C13.1795 25.2706 12.8002 24.355 12.8002 23.4002V18.6002H6.00823C5.66034 18.6041 5.31576 18.5324 4.99835 18.3899C4.68094 18.2475 4.39829 18.0377 4.17 17.7752C3.94171 17.5126 3.77323 17.2036 3.67622 16.8695C3.57922 16.5354 3.55602 16.1842 3.60823 15.8402L5.26423 5.04019C5.35102 4.4679 5.64171 3.94626 6.08275 3.57138C6.52378 3.1965 7.08544 2.99365 7.66423 3.00019H21.2002M21.2002 16.2002V3.00019M21.2002 16.2002H24.4042C25.0834 16.2122 25.7433 15.9744 26.2587 15.532C26.7741 15.0896 27.1092 14.4733 27.2002 13.8002V5.40019C27.1092 4.72706 26.7741 4.11079 26.2587 3.66837C25.7433 3.22595 25.0834 2.98818 24.4042 3.00019H21.2002" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p style={{
                color: "#000",
                fontFamily: "Inter",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal"
              }}>1</p>
            </Box>
            {/* note comment count */}
            <Box sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center"
            }} onClick={() => { setShowComment(prev => { return !prev }) }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="none">
                <path d="M25.7992 14.4002C25.8033 15.9841 25.4333 17.5465 24.7192 18.9602C23.8725 20.6543 22.5709 22.0792 20.9602 23.0754C19.3494 24.0715 17.4931 24.5995 15.5992 24.6002C14.0154 24.6044 12.453 24.2343 11.0392 23.5202L4.19922 25.8002L6.47922 18.9602C5.76514 17.5465 5.39509 15.9841 5.39922 14.4002C5.39995 12.5063 5.92795 10.6501 6.92408 9.03929C7.92021 7.42853 9.34512 6.12691 11.0392 5.28023C12.453 4.56615 14.0154 4.1961 15.5992 4.20023H16.1992C18.7004 4.33822 21.0629 5.39394 22.8342 7.16526C24.6055 8.93658 25.6612 11.299 25.7992 13.8002V14.4002Z" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p style={{
                color: "#000",
                fontFamily: "Inter",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal"
              }}>1</p>
            </Box>
          </Box>
        </Box>
        {showComment &&
          <div className="w-full h-max flex flex-col gap-8">
            <form onSubmit={commentForm.handleSubmit(handlePostComment)} className="flex gap-5">
              <InputField form={commentForm} name="value" />
              <Button
                type='submit'
                // disabled={isSubmitting}
                variant='contained'
                sx={{ mt: 3, mb: 2, width: "80px" }}
              >
                Comment
              </Button>
            </form>

            <div className="flex flex-col gap-4 items-center">
              {listComment.map((cmt, index) => {
                return (
                  <div className="w-full px-5 py-3 rounded-lg shadow-lg bg-slate-200" key={index}>
                    <div className="flex gap-4 items-center">
                      <img className="rounded-full w-16 h-16" src={''} alt="" />
                      <p className="font-bold text-xl">comment owner name</p>
                    </div>
                    <div>
                      <p>comment content here</p>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        }
      </div>
    )
  }
  return (
    <Box p={2}
      sx={{
        overflowY: "auto",
        padding: "10px 4px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: "12px",
      }}
    >
      {listData.map(note => {
        return <NoteRender noteData={note} />
      })}
    </Box>
  )
}

{/* {toggleNote === true ? (
                  <ListView
                    limitedData={limitedData}
                    toggleNote={toggleNote}
                    data={data}
                    setArchivedData={setArchivedData}
                    handleDelNote={handleDelNote}
                    toolsNote={toolsNote}
                  />
                ) : (
                  Note.slice(0, startIndex).map((val, index) => {
                    const lastindex = Note.slice(0, startIndex).length - 1;
                    return (
                      <div
                        onClick={handleToggle}
                        key={index}
                        style={{
                          cursor: "pointer",
                          justifyContent: "start",
                          gap: 10 + "px",
                          backgroundColor: "#FFFFFF",
                          paddingTop: 12 + "px",
                          paddingBottom: 12 + "px",
                          paddingLeft: 24 + "px",
                          paddingRight: 24 + "px",
                          borderBottom: 1 + "px solid",
                          borderBottomColor: "#818181",
                        }}
                        className={
                          index == 0
                            ? classes.styleFist
                            : index == lastindex
                            ? classes.styleLast
                            : "" + `${classes.wapper_content}`
                        }
                      >
                        <h2>{index + 1}</h2>
                        <p
                          style={{
                            margin: 5 + "px",
                          }}
                        >
                          {userName}
                        </p>
                        <p className={`${classes.profile_text}`}>{"" + val.data}</p>
                        <div
                          style={{
                            position: "absolute",
                            right: 170 + "px",
                            cursor: "pointer",
                          }}
                        >
                          <p>{val.createAt}</p>
                        </div>
                      </div>
                    );
                  })
                )} */}