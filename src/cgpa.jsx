import { useState, useEffect } from 'react';
import { cse, ece, eee, ce, me, che, mme, puc } from './data';
import './app.css';
import Header from './header';
import Footer from './footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cgpa() {
    const branchData = { cse, ece, eee, ce, me, che, mme };

    const gradeValues = { EX: 10, A: 9, B: 8, C: 7, D: 6, E: 5, REM: 0 };

    const [branch, setBranch] = useState('');
    const [year, setYear] = useState('');
    const [currentSem, setCurrentSem] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [credits, setCredits] = useState([]);
    const [grades, setGrades] = useState({});
    const [semesters, setSemesters] = useState([]);
    const [result, setResult] = useState(0);
    const [cgpa, setCgpa] = useState(0);
    const [percent, setPercent] = useState(0);
    const [darkMode, setDarkMode] = useState(true);
    const [clickedSubject, setClickedSubject] = useState(null);
    const [Sem, setSem] = useState('');
    const handleSemChange = (e) => {
        setSem(e.target.value);
        setSubjects([]);
        setCredits([]);
        setGrades({});
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
        setBranch('');
        setCurrentSem('');
        setSubjects([]);
        setCredits([]);
        setGrades({});
        setSemesters([]);
    };

    const handleBranchChange = (e) => {
        setBranch(e.target.value);
        setCurrentSem('');
        setSubjects([]);
        setCredits([]);
        setGrades({});
    };
    const handleCgpaSemChange = (e) => {
        const selectedSem = e.target.value;
        setCurrentSem(selectedSem); // Set state only once

        // Clear previous data
        setSubjects([]);
        setCredits([]);
        setGrades({});
    };

    useEffect(() => {
        if (!currentSem) return;

        if (branch && (year === 'engineering' ? currentSem : true)) {
            if (year === 'engineering') {
                const selectedSubjects = branchData[branch][currentSem]?.subjects;
                const selectedCredits = branchData[branch][currentSem]?.credits;
                setSubjects(selectedSubjects);
                setCredits(selectedCredits);
            } else if (year === 'puc') {
                const selectedSubjects = puc[branch]?.subjects;
                const selectedCredits = puc[branch]?.credits;
                setSubjects(selectedSubjects);
                setCredits(selectedCredits);
            }
        } else {
            alert("Please select year, branch, and semester");
        }
    }, [currentSem, branch, year]);


    const handleGradeChange = (subject, grade) => {
        setGrades(prevGrades => ({
            ...prevGrades,
            [subject]: grade
        }));
    };
    const notify = () => {
        toast.error("No sgpa for remedial subjects");
    }
    const note = () => {
        toast.error("Not allowed to enter SGPA less than 10");
    }
    const err = () => {
        toast.warning("Please Enter all the fields");
    }
    const calculateSGPA = () => {
        let totalCredits = 0;
        let totalGradePoints = 0;
        let remedialSubjectSelected = false;

        subjects.forEach((subject, index) => {
            const grade = grades[subject];
            if (grade == 'REM') {
                notify();
                remedialSubjectSelected = true;
                return;
            }
            else {
                const gradeValue = gradeValues[grade];
                const credit = credits[index];
                totalCredits += credit;
                totalGradePoints += gradeValue * credit;
            }
        });
        if (remedialSubjectSelected) {
            return;
        }
        const totalSGPA = totalGradePoints / totalCredits;
        setResult(totalSGPA);
        // Add the SGPA for the current semester to the semesters array
        setSemesters(prevSemesters => [...prevSemesters, { sem: currentSem, sgpa: totalSGPA }]);
    };

    const calculateCGPA = () => {
        const totalSemesters = semesters.length;
        if (totalSemesters === 0 || filteredSemesters.length != 0) {
            err();
            return;
        }
        const totalSGPA = semesters.reduce((acc, curr) => {
            let a = curr.sgpa;
            if (a < 0 || a > 10) {
                note();
                return; // Continue with the previous accumulated value
            }
            return acc + a; // Add the current SGPA to the accumulated value
        }, 0);
        const totalCGPA = totalSGPA / totalSemesters;
        setCgpa(totalCGPA);
        setPercent(totalCGPA * 10); // Assuming a common conversion factor
    };

    const availableSemesters = year === 'engineering'
        ? ['e1s1', 'e1s2', 'e2s1', 'e2s2', 'e3s1', 'e3s2', 'e4s1', 'e4s2']
        : ['p1s1', 'p1s2', 'p2s1', 'p2s2'];
    const filterSemesters = availableSemesters.filter(sem => sem <= Sem);
    const filteredSemesters = filterSemesters.filter(sem => !semesters.some(s => s.sem === sem));

    return (
        <div className={darkMode ? 'dark-mode' : 'light-mode'} style={{ minHeight: '100vh' }}>
            <Header toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce
            />;
            <div className="container my-5" style={{ minHeight: '100vh' }}>
                <form className="mb-4 form-group">
                    <h1 className="text-center shiny-text">CGPA Calculator</h1>
                    <div className="mb-4 row align-items-center justify-content-center">
                        <label className="col-auto text col-form-label text-center">Year</label>
                        <div className="col-auto">
                            <select className="form-select select-text text-center" value={year} onChange={handleYearChange}>
                                <option value="" className='select-text'>Select Year</option>
                                <option value="puc" className='select-text'>PUC</option>
                                <option value="engineering" className='select-text'>Engineering</option>
                            </select>
                        </div>
                    </div>

                    {year === 'puc' && (
                        <div className="mb-4 row align-items-center justify-content-center">
                            <label className="col-auto col-form-label text text-center">Current Sem</label>
                            <div className="col-auto">
                                <select className="form-select select-text text-center" value={Sem} onChange={handleSemChange}>
                                    <option value="" className='select-text'>Select Semester</option>
                                    <option value="p1s1" className='select-text'>P1S1</option>
                                    <option value="p1s2" className='select-text'>P1S2</option>
                                    <option value="p2s1" className='select-text'>P2S1</option>
                                    <option value="p2s2" className='select-text'>P2S2</option>
                                </select>
                            </div>
                        </div>
                    )}
                    {year === 'engineering' && (
                        <div className="mb-4 row align-items-center justify-content-center">
                            <label className="col-auto col-form-label text text-center">Curret Sem</label>
                            <div className="col-auto">
                                <select className="form-select select-text text-center" value={Sem} onChange={handleSemChange}>
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
                        </div>
                    )}
                </form>
                {Sem && (
                    <div>
                        <h2 className="text-center shiny-text">Enter SGPA for each semester up to {Sem.toUpperCase()}</h2>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th className='text'>Semester</th>
                                    <th className='text'>SGPA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterSemesters.map((sem) => (
                                    <tr key={sem}>
                                        <td className='text'>{sem.toUpperCase()}</td>
                                        <td className='text'>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={semesters.find(s => s.sem === sem)?.sgpa || ''}
                                                onChange={(e) => {
                                                    const sgpa = parseFloat(e.target.value);
                                                    setSemesters(prev => {
                                                        const index = prev.findIndex(s => s.sem === sem);
                                                        if (index > -1) {
                                                            prev[index].sgpa = sgpa;
                                                        } else {
                                                            prev.push({ sem, sgpa });
                                                        }
                                                        return [...prev];
                                                    });
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn btn-primary button text-center col-auto mt-3" onClick={calculateCGPA}>Calculate CGPA</button>
                        {cgpa > 0 && (
                            <div className="mt-4 text-center">
                                <h2>CGPA: {cgpa.toFixed(2)}</h2>
                                <h2>Percentage: {percent.toFixed(2)}%</h2>
                            </div>
                        )}
                        {year === 'puc' && (
                            <div className="mb-4 mt-2 row align-items-center justify-content-center">
                                <label className="col-auto text col-form-label text-center">Branch</label>
                                <div className="col-auto">
                                    <select className="form-select select-text text-center" value={branch} onChange={handleBranchChange}>
                                        <option value="" className='select-text'>Select Branch</option>
                                        <option value="mpc" className='select-text'>MPC</option>
                                        <option value="mbipc" className='select-text'>MBIPC</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {year === 'engineering' && (
                            <div className="mb-4 mt-2 row align-items-center justify-content-center">
                                <label className="col-auto text col-form-label text-center">Branch</label>
                                <div className="col-auto">
                                    <select className="form-select select-text text-center" value={branch} onChange={handleBranchChange}>
                                        <option value="" className='select-text'>Select Branch</option>
                                        <option value="cse" className='select-text'>CSE</option>
                                        <option value="ece" className='select-text'>ECE</option>
                                        <option value="eee" className='select-text'>EEE</option>
                                        <option value="ce" className='select-text'>CE</option>
                                        <option value="me" className='select-text'>ME</option>
                                        <option value="che" className='select-text'>CHE</option>
                                        <option value="mme" className='select-text'>MME</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {branch && (
                            <>
                                <div className="mb-4 row align-items-center justify-content-center">
                                    <label className="col-auto text col-form-label text-center">Semester</label>
                                    <div className="col-auto">
                                        <select className="form-select select-text text-center" value={currentSem} onChange={handleCgpaSemChange}>
                                            <option value="" className='select-text'>Select Semester</option>
                                            {filteredSemesters.map((sem) => (
                                                <option key={sem} value={sem} className='select-text'>{sem.toUpperCase()}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                            </>
                        )}
                        {currentSem && (filteredSemesters.length > 0) && (
                            <div className="mb-4">
                                <form onSubmit={(e) => { e.preventDefault(); calculateSGPA(); }} className="mb-4 form-group">
                                    <h2 className="mb-3 shiny-text text-center">Subjects and Grades for {currentSem.toUpperCase()}</h2>
                                    {subjects.map((subject, index) => (
                                        <div key={index} className={`mb-3 row align-items-center text justify-content-center subject-hover ${clickedSubject === subject ? 'clicked' : ''}`}
                                            onClick={() => setClickedSubject(clickedSubject === subject ? null : subject)}>
                                            <label className="col-sm-6 col-form-label text text-center">{subject.toUpperCase()}</label>
                                            <div className="col-sm-6">
                                                <select className="form-select select-text text-center" onChange={(e) => handleGradeChange(subject, e.target.value)}>
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
                                    <button className="btn btn-success button mt-2 col-auto text-center">Submit SGPA</button>
                                </form>
                            </div>
                        )}
                        {result > 0 && (filteredSemesters.length > 0) && (
                            <div className="mt-4 text-center">
                                <h2>SGPA for {currentSem.toUpperCase()}: {result.toFixed(2)}</h2>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>

    );
}

export default Cgpa;
