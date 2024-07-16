import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import { cse, ece, eee, ce, me, che, mme, puc } from './data';
import './header.css';
import './app.css';

function App() {
  const branchData = {
    cse,
    ece,
    eee,
    ce,
    me,
    che,
    mme,
    puc
  };

  const gradeValues = {
    EX: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    E: 5
  };

  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [sem, setSem] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [credits, setCredits] = useState([]);
  const [grades, setGrades] = useState({});
  const [result, setResult] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [clickedSubject, setClickedSubject] = useState(null);
  let ele = useRef('');

  const handleButtonClick = () => {
    if (branch && (year === 'Engineering' ? sem : false)) {
      const selectedSubjects = branchData[branch][sem].subjects;
      const selectedCredits = branchData[branch][sem].credits;
      setSubjects(selectedSubjects);
      setCredits(selectedCredits);
      setGrades({});
    }
    else if (year === 'PUC') {
      const selectedSubjects = puc[branch].subjects;
      const selectedCredits = puc[branch].credits;
      setSubjects(selectedSubjects);
      setCredits(selectedCredits);
      setGrades({});
    } else {
      alert("Please select year, branch, and semester");
    }
  };

  const calculateSGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    subjects.forEach((subject, index) => {
      const grade = grades[subject];
      if (grade == 'REM') {
        alert("Not allowed to enter REM grades");
        return;
      }
      else {
        const gradeValue = gradeValues[grade];
        const credit = credits[index];
        totalCredits += credit;
        totalGradePoints += gradeValue * credit;
      }
    });

    const totalSGPA = totalGradePoints / totalCredits;
    setResult(totalSGPA);
    ele.current.innerHTML = totalSGPA.toFixed(2);
  };

  const handleGradeChange = (subject, grade) => {
    setGrades(prevGrades => ({
      ...prevGrades,
      [subject]: grade
    }));
  };

  const handleSGPASubmit = (e) => {
    e.preventDefault();
    calculateSGPA();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const printResult = () => {
    window.print();
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setBranch('');
    setSem('');
    setSubjects([]);
    setCredits([]);
    setGrades({});
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
    setSem('');
    setSubjects([]);
    setCredits([]);
    setGrades({});
  };

  const handleSemChange = (e) => {
    setSem(e.target.value);
    setSubjects([]);
    setCredits([]);
    setGrades({});
  };

  return (
    <div className={`d-flex mouse flex-column ${darkMode ? 'dark-mode' : 'light-mode'}`} style={{ minHeight: '100vh' }}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="container my-5">
        <p className="text-center header shiny-text">RGUKT College Grade Calculator</p>
        <div className="mb-4 row align-items-center justify-content-center">
          <label className="col-auto text col-form-label text-center">Year</label>
          <div className="col-auto">
            <select className="form-select select-text text-center" value={year} onChange={handleYearChange}>
              <option value="" className='select-text'>Select Year</option>
              <option value="PUC" className='select-text'>PUC</option>
              <option value="Engineering" className='select-text'>Engineering</option>
            </select>
          </div>
        </div>
        <div className="mb-4 row align-items-center justify-content-center">
          {year && (
            <>
              <label className="col-auto col-form-label text text-center">Branch</label>
              <div className="col-auto">
                <select className="form-select select-text text-center" value={branch} onChange={handleBranchChange}>
                  <option value="" className='select-text'>Select Branch</option>
                  {year === 'PUC' ? (
                    <>
                      <option value="mpc" className='select-text'>MPC</option>
                      <option value="mbipc" className='select-text'>MBIPC</option>
                    </>
                  ) : (
                    <>
                      <option value="cse" className='select-text'>CSE</option>
                      <option value="ece" className='select-text'>ECE</option>
                      <option value="eee" className='select-text'>EEE</option>
                      <option value="ce" className='select-text'>CIVIL</option>
                      <option value="me" className='select-text'>MECH</option>
                      <option value="che" className='select-text'>CME</option>
                      <option value="mme" className='select-text'>MME</option>
                    </>
                  )}
                </select>
              </div>
            </>
          )}
        </div>
        <div className="mb-4 row align-items-center justify-content-center">
          {year === 'Engineering' && (
            <>
              <label className="col-auto col-form-label text text-center">Semester</label>
              <div className="col-auto">
                <select className="form-select select-text text-center" value={sem} onChange={handleSemChange}>
                  <option value="" className='select-text'>Select Semester</option>
                  <option value="e1s1" className='select-text'>E1S1</option>
                  <option value="e1s2" className='select-text'>E1S2</option>
                  <option value="e2s1" className='select-text'>E2S1</option>
                  <option value="e2s2" className='select-text'>E2S2</option>
                  <option value="e3s1" className='select-text'>E3S1</option>
                  <option value="e3s2" className='select-text'>E3S2</option>
                  <option value="e4s1" className='select-text'>E4S1</option>
                  <option value="e4s2" className='select-text'>E4S2</option>
                </select>
              </div>
            </>
          )}
        </div>
        <div className="mb-4 row align-items-center justify-content-center">
          {year && branch && (year === 'Engineering' ? sem : true) && (
            <div className="text-center mb-4 mt-5">
              <button className="btn btn-info button" onClick={handleButtonClick}>Load Subjects</button>
            </div>
          )}
        </div>
        <div className='mb-4 row align-items-center justify-content-center'>
          {subjects.length > 0 && (
            <form onSubmit={handleSGPASubmit} className='form-group text-center'>
              <h2 className="shiny-text align-items-center text-center">Subjects and Grades</h2>
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className={`mb-3 row align-items-center justify-content-center text subject-hover ${clickedSubject === subject ? 'clicked' : ''}`}
                  onClick={() => setClickedSubject(clickedSubject === subject ? null : subject)}
                >
                  <label className="col-sm-4 text text-center">{subject.toUpperCase()}</label>
                  <div className="col-sm-4">
                    <select className="form-select select-text text-center" onChange={(e) => handleGradeChange(subject, e.target.value)} required>
                      <option value="" className='select-text'>Select Grade</option>
                      <option value="EX" className='select-text'>EX</option>
                      <option value="A" className='select-text'>A</option>
                      <option value="B" className='select-text'>B</option>
                      <option value="C" className='select-text'>C</option>
                      <option value="D" className='select-text'>D</option>
                      <option value="E" className='select-text'>E</option>
                      <option value="REM" className='select-text'>REM</option>
                    </select>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <button type="submit" className="btn btn-success button mt-3">Submit SGPA</button>
              </div>
            </form>
          )}
          <h1 className="text-center mt-2" ref={ele}></h1>
          {result > 0 && (
            <div className="mt-4 text-center">
              <NavLink to="/cgpa">
                <button className="btn btn-info mx-2">Calculate CGPA</button>
              </NavLink>
              <button className="btn btn-warning mx-2" onClick={printResult}>Print Result</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
