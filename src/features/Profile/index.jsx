import { Link, useParams } from "react-router-dom";
import { Box, createTheme, Typography, Button, Stack, TextField } from "@mui/material";
import rectangleImage from "./img/Rectangle 1.png";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import messImg from "./img/messImg.svg";
import React, { useEffect, useState } from "react";
import classes from "../Groups/styles.module.css";
import "./index.scss";
import classNames from "classnames";
import userApi from "../../api/userApi";
import { useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import { profileUser } from "../../features/Auth/userSlice";
import { checkJWT } from "../../constants";
import ListView from "../Archived/ListView/index";
function Profile({ usergg, data, handleDelNote, setArchivedData, toolsNote }) {
	const theme = createTheme({
		components: {
			MuiTypography: {
				defaultProps: {
					variantMapping: {
						h1: "h2",
						h2: "h2",
						h3: "h2",
						h4: "h2",
						h5: "h2",
						h6: "h2",
						subtitle1: "h2",
						subtitle2: "h2",
						body1: "span",
						body2: "span",
					},
				},
			},
		},
	});
	const dispatch = useDispatch();
	useEffect(() => {
		document.querySelectorAll(" .content ").forEach((item) => {
			item.addEventListener("click", function (e) {
				if (item.classList.contains("content")) {
					item.classList.remove("content");
					item.classList.remove("title");
					item.classList.add("expanded");
					item.classList.add("title-expand");
				} else {
					item.classList.remove("expanded");
					item.classList.remove("title-expand");
					item.classList.add("title");

					item.classList.add("content");
				}
			});
		});
		document.querySelectorAll(".title  ").forEach((item) => {
			item.addEventListener("click", function (e) {
				if (item.classList.contains("title")) {
					item.classList.remove("title");
					item.classList.add("title-expand");
				} else {
					item.classList.remove("title-expand");
					item.classList.add("title");
				}
			});
		});
	}, []);

	const handle_message = () => {
		set_togle_Message(!togle_Message);
	};
	const user =
		useSelector((state) => state.user.current) || JSON.parse(localStorage.getItem("user"));

	const [selected, setSelected] = useState(0);
	const [profile, setProfile] = useState([]);
	const [profileInfo, setProfileInfo] = useState([]);
	const [limitedDataPrv, setLimitedDataPrv] = useState([]);
	const [limitedDataPbl, setLimitedDataPbl] = useState([]);
	useEffect(() => {console.log(limitedDataPbl)},[limitedDataPbl])
	const [toggleData, setToggleData] = useState([]);
	const [maxRecordsToShow, setMaxRecordsToShow] = useState(12);
	const [togle_Message, set_togle_Message] = useState(false);
	const [userOnline, setUserOnline] = useState([]);
	const [toggleNote, setToggleNote] = useState(false);
	const [searchUser, setSearchUser] = useState("");
	const [listSearchUser, setListSearchUser] = useState([]);
	const [listNote, setListNote] = useState([]);

	const ConvertTypeNoteToComponent = ({ note }) => {
		switch (note.type) {
			case "screenshot":
				return (
					<div
						style={{
							height: "70%",
							width: "30%",
							overflow: "hidden",
							display: "grid",
							placeItems: "center",
							position: "relative",
						}}
					>
						<img
							style={{ objectFit: "cover", height: "80%", width: "80%" }}
							src={note.metaData}
							alt='note img'
						/>
					</div>
				);
			case "text":
				return <p className='content'>{note.data}</p>;
			case "checkList":
				return note.data.map((e) => (
					<div>
						<p
							style={{
								fontSize: "22px",
								fontWeight: "600",
								width: "200px",
							}}
							key={e.id}
						>
							{e.content}
						</p>
					</div>
				));
			default:
				return <></>;
		}
	};

	const handleNote = (id, noteArr) => {
		setToggleData(noteArr);
		setSelected(noteArr.findIndex((e) => e.idNote === id));
		setToggleNote(!toggleNote);
	};
	useEffect(() => {
		(async () => {
			const res = await userApi.profile(user.id);
			// const res = await dispatch(profileUser(user.id))
			let sorted = res.note.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));

			setProfileInfo(res.user);

			setLimitedDataPrv(sorted.filter((e) => !Boolean(e.notePublic)).slice(0, maxRecordsToShow));
			setLimitedDataPbl(sorted.filter((e) => Boolean(e.notePublic)).slice(0, maxRecordsToShow));
		})();
		userApi.userOnline().then((res) => {
			const status = res.users.filter((user) => user.statesLogin === 1);
			setUserOnline(status);
		});
	}, []);

	useEffect(() => {

	}, [])

	///search user
	useEffect(() => {
		userApi.getSearchUsers(searchUser).then((data) => {
			const newlistSearchUser = data.search_user.filter(
				(user) =>
					user.name.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()) ||
					user.gmail.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase())
			);

			setListSearchUser(newlistSearchUser);
		});
	}, [searchUser]);
	const handleShowMore = () => {
		const newRecordsToShow = maxRecordsToShow + 4;

		if (newRecordsToShow <= 50) {
			setMaxRecordsToShow(newRecordsToShow);
			setLimitedDataPbl(profile.slice(1, newRecordsToShow));
		}
	};

	/**
	 * 
	 * @param [{*}] listData 
	 * @param {*} user 
	 * @returns 
	 */
	const FirstBox = (listData, user) => {
		const NoteRender = (noteData) => {
			return (
				<Box sx={{
					border: '1px solid #e2e2e2',
					borderRadius: "12px",
					padding: "12px 6px",
					margin: "5px 12px",
					boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
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
							<img style={{ width: "70px", height: "70px", borderRadius: "9999px" }} src={user.Avarta} />

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
									handleNote(noteData.noteData.idNote, listData);
								}}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 29 30" fill="none">
									<path d="M8.40039 14.0002L13.2004 3.2002C14.1552 3.2002 15.0708 3.57948 15.746 4.25461C16.4211 4.92974 16.8004 5.84542 16.8004 6.80019V11.6002H23.5924C23.9403 11.5963 24.2849 11.668 24.6023 11.8105C24.9197 11.9529 25.2023 12.1627 25.4306 12.4252C25.6589 12.6877 25.8274 12.9968 25.9244 13.3309C26.0214 13.665 26.0446 14.0162 25.9924 14.3602L24.3364 25.1602C24.2496 25.7325 23.9589 26.2541 23.5179 26.629C23.0768 27.0039 22.5152 27.2067 21.9364 27.2002H8.40039M8.40039 14.0002V27.2002M8.40039 14.0002H4.80039C4.16387 14.0002 3.55342 14.2531 3.10333 14.7031C2.65325 15.1532 2.40039 15.7637 2.40039 16.4002V24.8002C2.40039 25.4367 2.65325 26.0472 3.10333 26.4972C3.55342 26.9473 4.16387 27.2002 4.80039 27.2002H8.40039" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
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
							}}>
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
				</Box>
			)
		}
		return (
			<Box p={2}
				sx={{
					maxHeight: "400px",
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

	return (
		<div className={`${classes.root} RootProfile`}>
			<div className={classNames()} style={{ backgroundColor: "#f2f2f2" }}>
				<div className='i' style={{ position: "relative" }}>
					{/* profile background image*/}
					<img
						className='avaProfle'
						style={{ width: "100%", aspectRatio: "2.21" }}
						src={
							user.AvtProfile ||
							usergg.picture ||
							"https://quantrithcs.vinhphuc.edu.vn/UploadImages/thcstthoason/anh-phong-canh-dep-nhat-the-gioi.jpg"
						}
						alt='note'
					/>
					{/* 
					<Box
						className='boxNav'
						sx={{
						display: "flex",
						alignItems: "center",
						gap: "25%",
						position: "absolute",
						top: "10%",
						marginLeft: "20%",
						}}
					>
						<Box
							className='boxNav2'
							sx={{
								height: "65px",
								display: "flex",
								justifyContent: "space-around",
								padding: "20px 24px",
								backgroundColor: "rgba(255, 255, 255, 0.4)",

								gap: "30px",
								color: "#fff",

								alignItems: "center",
								borderRadius: "32px",
							}}
						>
					<Link to={"/"}>
						<Box>
						<Typography
							sx={{
							fontSize: "22px",
							fontWeight: "600",
							"&:hover": {
								cursor: "pointer",
							},
							}}
						>
							SAMNOTES
						</Typography>
						</Box>
					</Link>
					<Box
						className='BoxNav3'
						sx={{
						display: "flex",
						justifyContent: "space-around",
						gap: "90px",
						width: "29rem",
						fontSize: "1.2rem",
						fontWeight: "400",
						"& .MuiTypography-body1:hover": {
							cursor: "pointer",
						},
						}}
					>
						<Typography variant='body1'>Help</Typography>
						<Typography variant='body1'>Home</Typography>
						<Typography variant='body1'>Contact Us</Typography>
						<Typography variant='body1'>Blog</Typography>
					</Box>
					</Box>
						<Box
							sx={{
								position: "relative",
								// top: "10px",
								width: "48px",
								height: "48px",
								position: "relative",
								cursor: "pointer",
							}}
							className='Message'
						>
						<img onClick={handle_message} src={messImg}></img>
						<div className='numberMessIcon'>1</div>
						<Message listUserOnline={userOnline} togle={togle_Message} />
						</Box>
					</Box> */}
					{/* profile top option */}
					<Box
						position={"absolute"}
						sx={
							{
								top: "5%",
								right: "5%",
								display: "flex",
								gap: "20px",
								padding: "0 20px",
								backgroundColor: "rgba(0, 0, 0, 0.2)",
								alignItems: "center",
							}
						}
					>
						{/* hello text */}
						<Box sx={
							{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
								color: "#fff",
							}
						}>
							<h2>hello {user.name}</h2>
							<h3>2/1/2024</h3>
						</Box>
						{/* missing calendar icon */}
					</Box>
				</div>

				{/* profile detail box*/}
				<Box
					sx={{
						background: "transparent",
						position: "relative",
						margin: "0 3%",
					}}
				>

					<Box
						className='gapProfile'
						sx={{
							display: "flex",
							gap: "30px",
							alignItems: "center",
							position: "relative",
							top: "-21px",
							padding: "0 3%",
						}}
					>
						{/* profile avatar */}
						<img
							style={{ borderRadius: "50%", height: "111px", width: "111px" }}
							src={
								user.Avarta ||
								usergg.picture ||
								"https://i.pinimg.com/736x/e0/7a/22/e07a22eafdb803f1f26bf60de2143f7b.jpg" ||
								profileInfo.Avarta
							}
						></img>
						{/* profile name */}
						<Box>
							<Typography variant='h5' fontWeight={500}>
								{user.name || usergg.name}
							</Typography>
							<Typography className='none' variant='h6' fontWeight={400}>
								{usergg.email || profileInfo.createAccount}
							</Typography>
							<Typography variant='h6' fontWeight={400}>
								{user.gmail}
							</Typography>
						</Box>
						{/* <Stack
              direction={"row"}
              alignItems={"center"}
              style={{
                paddingLeft: 70 + "px",
              }}
            >
              <input
                className='inputSearchName'
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder='Tìm kiếm tên/Email'
                style={{}}
              />
              <SearchIcon
                className='sicon'
                style={{
                  fontSize: 38 + "px",
                  color: "#1d1d1d",
                }}
              />
            </Stack> */}
					</Box>


					{/* <div className='SearchName'>
            {listSearchUser.map((user) => {
              return (
                <div className='textSearch'>
                  <Link to={`/profile/${user.id}`}>
                    {" "}
                    <p style={{}}>{user.name || user.gmail}</p>{" "}
                  </Link>
                </div>
              );
            })}
          </div> */}
					{/* <Box
            sx={{
              display: "grid",

              gridTemplateColumns: "repeat(1, 1fr)",
            }}
          >
            {toggleNote === true ? (
              <ListView
                limitedData={toggleData}
                data={toggleData}
                defaultSelect={selected}
                setArchivedData={setArchivedData}
                handleDelNote={handleDelNote}
                toolsNote={toolsNote}
                clear={() => setToggleNote(false)}
              />
            ) : (
              <>
                <Box
                  // className={toggleNote === true ? "box_note_hidden" : "box_note_diplay"}
                  className='NoteMoblie'
                  sx={{
                    width: "72%",
                    marginRight: "14%",
                    minHeight: "630px",
                    backgroundColor: "rgba(162, 221, 159, 1)",
                    backgroundImage:
                      "linear-gradient(90deg, rgba(162, 221, 159, 1), rgba(238, 146, 196, 1))",
                    borderRadius: "32px",
                    marginLeft: "14%",
                    padding: "57px 44px",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontSize: "24px", fontWeight: "600" }}>
                    Latest PublicNote
                  </Typography>

                  <div
                    className='wrap-record'
                    style={{ height: maxRecordsToShow <= 50 ? "auto" : "477px" }}
                  >
                    {limitedDataPbl &&
                      limitedDataPbl.map((limitedData, index) => {
                        return (
                          <>
                            <div
                              style={{ cursor: "pointer", maxHeight: "150px" }}
                              className='record'
                              key={index}
                              onClick={() => {
                                handleNote(limitedData.idNote, limitedDataPbl);
                              }}
                            >
                              <p style={{ width: "50px" }} className='number'>
                                {index + 1}
                              </p>
                              <p className='title'>{limitedData.title} </p>

                              <ConvertTypeNoteToComponent note={limitedData} />

                              <p className='date-post'>{limitedData.createAt}</p>
                            </div>
                          </>
                        );
                      })}
                  </div>

                  {profile.length > maxRecordsToShow && (
                    <Button sx={{ marginLeft: "40%" }} variant='text' onClick={handleShowMore}>
                      View more
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Box> */}
					<Box
						sx={{
							paddingTop: "28px",
							paddingLeft: "37px",
							backgroundColor: "#fff"
						}}>
						<Box sx={{
							width: "100%",
							height: "90px",
							display: "flex",
							flexDirection: "column",
							gap: "8px"

						}}>
							<Box sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "95%",
							}}>
								<p style={{ color: "#888", fontSize: "32px", fontWeight: 700, lineHeight: "68.75%", letterSpacing: "-0.4" }}>Latest Public Notes</p>
								<p>...</p>
							</Box>
							<Box sx={{
								display: "flex",
								gap: "20px",
							}}>
								<p style={{
									color: "#496EF1",
									fontFamily: "Roboto",
									fontSize: "28px",
									fontStyle: "normal",
									fontWeight: 400,
									lineHeight: "78.571%",
									letterSpacing: "-0.4px",
									textDecoration: "underline"
								}}>Recent</p>
								<p style={{
									color: "#888",
									fontFamily: "Roboto",
									fontSize: "28px",
									fontStyle: "normal",
									fontWeight: 400,
									lineHeight: "78.571%",
									letterSpacing: "-0.4px"
								}}>Recommended</p>
							</Box>
						</Box>
					</Box>

					{/* note */}
					<Box display="grid" gridTemplateColumns="2fr 1fr" gridTemplateRows="auto auto" gap={2} sx={{ marginTop: "40px" }}>
						{/* first box */}
						{FirstBox(limitedDataPbl, user)}

						{/* second box */}
						<Box p={2} color="white" sx={{ backgroundColor: "#fff4ba", borderRadius: "12px", padding: "12px 6px", border: "1px solid #E81313" }}>
							<Box sx={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "10px",
								alignItems: "center"
							}}>
								<p style={{
									color: "#888",
									fontFamily: "Roboto",
									fontSize: "22px",
									fontStyle: "normal",
									fontWeight: 700,
									lineHeight: "28.687px",
									letterSpacing: "-0.532px"
								}}>Scratch Path</p>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
									<path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
									<path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							</Box>
							{/* content */}
							<div>
								<p style={{
									color: "#000",
									fontFamily: "Roboto",
									fontSize: "16px",
									fontStyle: "normal",
									fontWeight: 400,
									lineHeight: "28.687px",
									letterSpacing: "-0.532px"
								}}>
									Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, sequi? Corporis, eum enim? Quod in est quae necessitatibus vero, temporibus incidunt, fugit aliquid, deleniti provident officia cumque itaque asperiores neque.
								</p>
							</div>
						</Box>
						<Box p={2} bgcolor="success.main" color="white">
							Box 4
						</Box>
						{FourthBox()}
						<Box p={2} bgcolor="error.main" color="white">
							Box 6
						</Box>
						<Box p={2} bgcolor="error.main" color="white">
							Box 6
						</Box>

						<Box gridColumn="span 2" p={2} bgcolor="primary.main" color="white">
							Box 1
						</Box>
					</Box>
				</Box>
			</div>
		</div>
	);

}
const ThirdBox = () => {

}


const FourthBox = () => {

	const UserRender = () => {
		return (
			<Box sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				height: '52px',
				gap: '40px'
			}}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none">
						<path d="M35.1783 4.3457H16.9699C9.06076 4.3457 4.3457 9.06076 4.3457 16.9699V35.1783C4.3457 41.284 7.14867 45.4776 12.081 47.0637C13.5151 47.5635 15.1664 47.8025 16.9699 47.8025H35.1783C36.9818 47.8025 38.6331 47.5635 40.0672 47.0637C44.9995 45.4776 47.8025 41.284 47.8025 35.1783V16.9699C47.8025 9.06076 43.0874 4.3457 35.1783 4.3457ZM44.5432 35.1783C44.5432 39.8282 42.718 42.7615 39.046 43.9783C36.9383 39.8282 31.9408 36.8731 26.0741 36.8731C20.2074 36.8731 15.2316 39.8064 13.1022 43.9783H13.0805C9.45188 42.805 7.60496 39.8499 7.60496 35.2V16.9699C7.60496 10.8425 10.8425 7.60496 16.9699 7.60496H35.1783C41.3057 7.60496 44.5432 10.8425 44.5432 16.9699V35.1783Z" fill="black" />
						<path d="M26.0786 17.3828C21.7763 17.3828 18.2998 20.8594 18.2998 25.1616C18.2998 29.4638 21.7763 32.9621 26.0786 32.9621C30.3808 32.9621 33.8573 29.4638 33.8573 25.1616C33.8573 20.8594 30.3808 17.3828 26.0786 17.3828Z" fill="black" />
					</svg>
					<p style={{
						color: "#000",
						fontFamily: "Roboto",
						fontSize: "28px",
						fontStyle: "normal",
						fontWeight: 700,
						lineHeight: "28.687px",
						letterSpacing: "-0.532px"
					}}>
						User NaN
					</p>
				</Box>
				<Box>
					<p style={{
						color: "#000",
						fontFamily: "Roboto",
						fontSize: "16px",
						fontStyle: "normal",
						fontWeight: 400,
						lineHeight: "28.687px",
						letterSpacing: "-0.532px"
					}}>
						Join at date?
					</p>
				</Box>
			</Box>

		)
	}

	return (
		<Box p={2} sx={{ backgroundColor: "#fff", borderRadius: "12px", padding: "12px 6px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
			<Box sx={{
				display: "flex",
				justifyContent: "space-between",
				marginBottom: "10px",
				alignItems: "center"
			}}>
				<p style={{
					color: "#888",
					fontFamily: "Roboto",
					fontSize: "22px",
					fontStyle: "normal",
					fontWeight: 700,
					lineHeight: "28.687px",
					letterSpacing: "-0.532px"
				}}>New User</p>
				{/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
									<path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
									<path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								</svg> */}
			</Box>
			{/* render user here */}
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: "20px",
				overflowY: 'auto',
				maxHeight: "430px"
			}}>
				{UserRender()}
				{UserRender()}
				{UserRender()}
				{UserRender()}
				{UserRender()}
				{UserRender()}
				{UserRender()}
				{UserRender()}
			</Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<p style={{
					color: "#000",
					fontFamily: "Roboto",
					fontSize: "16px",
					fontStyle: "normal",
					fontWeight: 400,
					lineHeight: "28.687px",
					letterSpacing: "-0.532px"
				}}>
					see more
				</p>
			</Box>
		</Box>
	)
}

export default Profile;
