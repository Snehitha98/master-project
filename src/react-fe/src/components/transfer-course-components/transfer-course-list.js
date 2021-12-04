import React, {useEffect, useState} from 'react';
import Pagination from '../../components/pagination';
import {Col, Container, Form, Table} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TCAPI } from '../../api-services/transfer-course-service';

function TransferCourseList(props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(50);

    // Get current transfer evals
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    //const currentCourses = props.courses.slice(indexOfFirstCourse, indexOfLastCourse);
    const [currentCourses,setcurrentCourses] = useState(props.courses.slice(indexOfFirstCourse, indexOfLastCourse));
    const [selectedSchoolName, setselectedSchoolName] = useState('');
    const [schoolNamesArr,setschoolNamesArr] = useState(['select']);
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

     useEffect(() => {
        let temp = props.courses;
        temp = selectedSchoolName ? temp.filter(word => word.school === selectedSchoolName) : temp;
        setcurrentCourses(temp.slice(indexOfFirstCourse, indexOfLastCourse));

        setschoolNamesArr([...new Set(props.courses.map(item => item.school))])

      }, [props.courses,currentPage,selectedSchoolName])

    useEffect(()=>{
      let temp = props.courses.filter(word => word.school === selectedSchoolName);
      //setcourseNamesArr([...new Set(temp.map(item => item.course))])
    },[selectedSchoolName])


    const SchoolSelector = () =>{
      function SchoolOptions(){
        return schoolNamesArr.map(
          (eachName,i) => {
            return  <option key={i}>{eachName}</option>
          }
        )
      }
      return(
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Institution Name</Form.Label>
              <Form.Control as="select" size="sm" custom
                value={selectedSchoolName}
                onChange={evt => setselectedSchoolName(evt.target.value)}>
                  <option>----Select Institution Name----</option>
                  <SchoolOptions/>
              </Form.Control>
        </Form.Group>
      )
    }

    const courseClicked = course => evt => {
        props.courseClicked(course);
    }

    const editClicked = course => {
        props.editClicked(course);
      }

    const deleteClicked = course => {
        if (window.confirm("Are you sure?")) {
            TCAPI.deleteTransferCourse(course.transfer_course_id)
            .then( () => props.deleteClicked(course))
            .catch( error => console.log(error))
        } else {
            console.log("You clicked cancel");
        }
      }

    const newTransferCourse = () => {
        props.newTransferCourse();
    }

    function compareCourseTitle( a, b ) {
        if ( a.title < b.title ){
          return -1;
        }
        if ( a.title > b.title ){
          return 1;
        }
        return 0;
      }
      function comparedescCourseTitle( a, b ) {
        if ( a.title < b.title ){
          return 1;
        }
        if ( a.title > b.title ){
          return -1;
        }
        return 0;
      }

    function compareSchool( a, b ) {
        if ( a.school < b.school ){
            return -1;
        }
        if ( a.school > b.school ){
            return 1;
        }
        return 0;
     }

     function comparedescSchool( a, b ) {
        if ( a.school < b.school ){
            return 1;
        }
        if ( a.school > b.school ){
            return -1;
        }
        return 0;
        }


    function compareSubjectNumber( a, b ) {
        if ( a.subject_number < b.subject_number ){
            return -1;
        }
        if ( a.subject_number > b.subject_number ){
            return 1;
        }
        return 0;
     }

     function comparedescSubjectNumber( a, b ) {
        if ( a.subject_number < b.subject_number ){
            return 1;
        }
        if ( a.subject_number > b.subject_number ){
            return -1;
        }
        return 0;
     }

     function sortFunc(compareby) {
         if (compareby === 'coursetitle') {
             setcurrentCourses(props.courses.sort(compareCourseTitle).slice(indexOfFirstCourse, indexOfLastCourse));
         }
         if (compareby === 'desccoursetitle') {
             setcurrentCourses(props.courses.sort(comparedescCourseTitle).slice(indexOfFirstCourse, indexOfLastCourse));
         }
         if (compareby === 'school') {
             setcurrentCourses(props.courses.sort(compareSchool).slice(indexOfFirstCourse, indexOfLastCourse));
         }
         if (compareby === 'descschool') {
             setcurrentCourses(props.courses.sort(comparedescSchool).slice(indexOfFirstCourse, indexOfLastCourse));
         }
         if (compareby === 'subjectnumber') {
             setcurrentCourses(props.courses.sort(compareSubjectNumber).slice(indexOfFirstCourse, indexOfLastCourse));
         }
         if (compareby === 'descsubjectnumber') {
             setcurrentCourses(props.courses.sort(comparedescSubjectNumber).slice(indexOfFirstCourse, indexOfLastCourse));
         }
     }


    return (
        <Container>
            <Form style={{ display: 'flex',alignItems:'center'}}>
            <Form.Group controlId="exampleForm.SelectCustom">

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>
                            <h5 className="text-success">Search</h5>
                            <Form.Row >
                            <SchoolSelector/>
                             </Form.Row>
                        </th>

                            <td>
                                <br/><br />
                                <button type="button" className="btn btn-outline-success"
                                        onClick={newTransferCourse}>Create
                                </button>
                            </td>

                    </tr>
                    </thead>
                </Table>


            </Form.Group>
          </Form>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        <div>INSTITUTION NAME<br></br>
                        <Button variant="outline-secondary" onClick={() => sortFunc('school')}>asc</Button>
                        <Button variant="outline-secondary" onClick={() => sortFunc('descschool')}>desc</Button>
                    </div>
                    </th>
                    <th>
                     <div>COURSE TITLE<br></br>
                        <Button variant="outline-secondary" onClick={() => sortFunc('coursetitle')}>asc</Button>
                        <Button variant="outline-secondary" onClick={() => sortFunc('desccoursetitle')}>desc</Button>
                        </div>
                    </th>

                    <th>
                        <div>COURSE #<br></br>
                        <Button variant="outline-secondary" onClick={() => sortFunc('subjectnumber')}>asc</Button>
                        <Button variant="outline-secondary" onClick={() => sortFunc('descsubjectnumber')}>desc</Button>
                        </div>
                    </th>
                    <th/>
                    {/*<th>*/}
                        {/*<FontAwesomeIcon icon={faPlus} alignmentBaseline='before-edge' onClick={newTransferCourse}/>*/}
                    {/*</th>*/}
                </tr>
            </thead>
            <tbody>
                    { currentCourses && currentCourses.map( course => {
                    return (
                        <tr>
                            <td onClick={courseClicked(course)}>
                                {course.school}
                            </td>
                            <td onClick={courseClicked(course)}>
                            {course.title}
                            </td>
                            <td onClick={courseClicked(course)}>
                                {course.subject_number}
                            </td>
                            <td>
                                <Button variant="outline-primary" onClick={() => editClicked(course)}>Edit</Button>
                            </td>
                            <td>
                                <Button variant="outline-danger" onClick={() => deleteClicked(course)}>Delete</Button>
                            </td>
                        </tr>
                    )})}
            </tbody>
        </Table>
        <Pagination elementsPerPage={coursesPerPage} totalElements={props.courses.length} paginate={paginate}/>
        </Container>
    )
}

export default TransferCourseList;