import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react"
import { MdAddCircleOutline } from 'react-icons/md';
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { MdRemoveCircleOutline } from 'react-icons/md';
import './Home.scss';
import './StudyDiary.scss';
import towrite from '../img/towrite.png';
import logo from '../img/templogo.png';
import home from '../img/home.png';
import timetable from '../img/timetable.png';
import diary from '../img/diary.png';
import user from '../img/user.png';
import setting from '../img/settings.png';

const onClick = () => {
    alert('로그인하세요!');
};

const StudyDiary = () => {
    const [diaryList, setDiaryList] = useState([]);
    useEffect(() => {
        const diariesRef = ref(db, `users/${auth.currentUser.uid}/diaries`);
        onValue(diariesRef, (snapshot) => {
            const data = snapshot.val();
            setDiaryList(data);
        })
    }, []);

    const deletediary = (diaryId) => {
        const diaryRef = ref(db, `users/${auth.currentUser.uid}/diaries`);
        set(diaryRef, diaryList.filter(diary => diary.id !== diaryId));
        setDiaryList(diaryList.filter(diary => diary.id !== diaryId));
    };

    return (
        <div className="studydiary-body">
            {diaryList.map(diary => {
                if (diary !== "empty") {
                    return (
                        <div className="diarybox" key={diary.id}>
                            <textarea readOnly className="diary">{diary.text}</textarea>
                            <p className="date">{`${diary.year}년 ${diary.month}월 ${diary.day}일`}</p>
                            <button className="deletediary" onClick={() => deletediary(diary.id)}><MdRemoveCircleOutline /></button>
                        </div>
                    );
                }
            })}
            <Link to="/writediary" className="towrite"><img src={towrite}/></Link>
            {/* <Link to='/' className="studydiary-tohome">To Home</Link> */}
        </div>
    )
}

export default StudyDiary;