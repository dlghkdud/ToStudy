import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect } from "react";
import './Home.scss';
import { CiMemoPad } from 'react-icons/ci';
import { PiNotePencil } from 'react-icons/pi';
import logo from '../img/templogo.png';
import home from '../img/home.png';
import timetable from '../img/timetable.png';
import diary from '../img/diary.png';
import user from '../img/user.png';
import setting from '../img/settings.png';
// import { BsPencil } from 'react-icons/bs';

const Home = ({ setIsLoggedIn }) => {
    const logOut = () => {
        auth.signOut();
        setIsLoggedIn(false);
        window.location.reload();
        // location.reload();
        // console.log(auth.currentUser);
    };
    useEffect(() => {
        console.log(auth.currentUser);
        if(auth.currentUser) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, []);

    const onClick = () => {
        alert('로그인하세요!');
    };

    return (
        <div className="homebody">
            <div className="header">
                {/* 임시로고 */}
                <div className="title"><img src={logo}/></div>
                {/* 내비게이션바 */}
                <Link to="/" className="nav"><img src={home}/></Link>
                <div className="nav"><img src={timetable}/></div>
                {auth.currentUser ? 
                    <Link to="/studydiary" className="nav">
                        <img src={diary}/>
                    </Link>:
                    <span onClick={onClick} className="nav">
                        <img src={diary}/>
                    </span>
                }
                <div className="nav"><img src={user}/></div>
                <div className="nav"><img src={setting}/></div>
                {/* <h1 className="title">공100<BsPencil /></h1> */}
                <div></div>
                <div className="right">
                    {auth.currentUser ? 
                        <div onClick={logOut} className="logout">Logout</div> : 
                        <div className="loginsignup">
                            <Link to="/login" className="inner">Login</Link>
                            <Link to="/signup" className="inner">Sign Up</Link>
                        </div>}
                </div>
            </div>
            <div className="main">
                {/* <div className="to">
                    {auth.currentUser ? <Link to="/tostudy" className="link">ToStudy List</Link> : <span onClick={onClick} className="linkwhenNoUser">ToStudy List</span>}
                    <PiNotePencil />
                </div>
                <div className="to">
                    {auth.currentUser ? <Link to="/studydiary" className="link">Study Diary</Link> : <span onClick={onClick} className="linkwhenNoUser">Study Diary</span>}
                    <CiMemoPad />
                </div> */}
                {auth.currentUser ?
                    <Link to="/tostudy" className="link">
                        <h5 className="bigtext">ToStudy List</h5>
                        <PiNotePencil className="icon" />
                    </Link> : 
                    <span onClick={onClick} className="link">
                        <h5 className="bigtext">ToStudy List</h5>
                        <PiNotePencil className="icon" />
                    </span>
                }
                {auth.currentUser ? 
                    <Link to="/studydiary" className="link">
                        <h5 className="bigtext">Study Diary</h5>
                        <CiMemoPad className="icon" />
                    </Link> : 
                    <span onClick={onClick} className="link">
                        <h5 className="bigtext">Study Diary</h5>
                        <CiMemoPad className="icon" />
                    </span>}
            </div>
        </div>
    );
};

export default Home;