import { Component } from 'react'
import { fetchListData } from './model'
import StudentList from './components/StudentList.jsx';
import TeacherList from './components/TeacherList.jsx';
import listHoc from './components/ListHoc.jsx';

// 包裹StudentList、ReacherList组件
const StudentListHoc = listHoc(StudentList, fetchListData);
const TeacherListHoc = listHoc(TeacherList, fetchListData);

class App extends Component {
  render() {
    return (
      <div className="app">
        <StudentListHoc field="student" />
        <TeacherListHoc field="teacher" />
      </div>
    )
  }
}

export default App;