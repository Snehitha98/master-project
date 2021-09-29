import React, { useState, useEffect } from 'react';
import '../App.css';
import TransferCourseList from './transfer-course-components/transfer-course-list';
import TransferCourseDetails from './transfer-course-components/transfer-course-details';
import TransferCourseForm from './transfer-course-components/transfer-course-form';

function TransferCourse() {

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [editedCourse, setEditedCourse] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/transfer-course-list/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then( resp => resp.json())
        .then( resp => setCourses(resp))
        .catch(error => console.log(error))
      }, [])

    const loadTransferCourse = course => {
        setSelectedCourse(course);
        setEditedCourse(null);
    }

    const newTransferCourse = () => {
      setEditedCourse({school_id:1, subject_number:'', title:''});
      setSelectedCourse(null);
    }

    const editClicked = course => {
      setEditedCourse(course);
      setSelectedCourse(null);
    }

    const deleteClicked = course => {
      const newCourses = courses.filter( tc => tc.transfer_course_id !== course.transfer_course_id);
      setCourses(newCourses);
    }

    const updatedTransferCourse = course => {
      const newCourses = courses.map( newCourse => {
        if (newCourse.transfer_course_id === course.transfer_course_id) {
          return course;
        }
        return newCourse;
      })
      setCourses(newCourses);
    }

    const transferCourseCreated = course => {
      const newCourses = [...courses, course];
      setCourses(newCourses);
    }

    return (
        <div className="list-group">
          <br/>
            <header className="App-header">
              <div style={{ display: 'flex', alignItems:'center' }}>
                <h3 onClick={() => window.location.reload(false)}>Transfer courses</h3>
              </div>
            </header>
            <div className="layout">
                <TransferCourseList
                  courses={courses}
                  courseClicked={loadTransferCourse}
                  editClicked={editClicked}
                  deleteClicked={deleteClicked}
                  newTransferCourse={newTransferCourse}
                />
                {selectedCourse ?
                <TransferCourseDetails
                  course={selectedCourse}
                  updateCourse={loadTransferCourse}
                />
                : null }
                {editedCourse ?
                <TransferCourseForm
                  course={editedCourse}
                  updatedTransferCourse={updatedTransferCourse}
                  transferCourseCreated={transferCourseCreated}
                />
                : null}
            </div>
        </div>
      )

}

export default TransferCourse;