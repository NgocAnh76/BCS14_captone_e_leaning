
import React, {useState, useEffect} from "react";
import ActiveInactiveChart from "./ActiveInactiveChart";
import { api } from "../api/api";

const CourseStatusChart = () => {
    const [activeCount, setActiveCount] = useState(0);
    const [inactiveCount, setInActiveCount] = useState(0);

    useEffect(() =>{
        const fetchCourseData = async () => {
            try {
                const respone = await api.getCourseList();
                const courses = respone.data;

                const activeCourses = courses.filter((course) => course.soLuongHocVien > 0);
                const inactiveCourses = courses.filter((course) => course.soLuongHocVien === 0);

                setActiveCount(activeCount.length);
                setInActiveCount(inactiveCourses.length);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };
    fetchCourseData();
  }, []);
  return (
    <div>
        <h1>Course Status</h1>
        <ActiveInactiveChart activeCount={activeCount} inactiveCount={inactiveCount} />
    </div>
  )
}
export default CourseStatusChart





