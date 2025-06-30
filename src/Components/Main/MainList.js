import { useState, useEffect } from "react";
import {getAllLessons} from "../../Services/LearnService";

const MainList = () => {
    const [lessons, setLessons] = useState([]);

    useEffect(()=>{
        getAllLessons().then((lessons) => {
            console.log('lessons: ', lessons);
            setLessons(lessons);
        })
    }, [])

    return (
        <div>
            <hr />
            This is the main list parent components.
            <div>
                {lessons.length > 0 && (
                    <ul>
                        {lessons.map((lesson) => {
                            <div>
                                <span>
                                    <li key={lesson.id}>{lesson.get("name")}</li>
                                </span>
                            </div>
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default MainList;