import axios from "axios"
import {useEffect,useState} from "react"


function App() {
  const [employees,setEmployee] = useState([])
  const [pageNumber,setPageNumber] = useState(1)
  const [rowEmployee,setrowEmployee] = useState([])
  useEffect(()=>{
    const fetchEmployee = async()=>{
      try{
      let data = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      console.log(data.data)
      setEmployee(data.data)
    }
      catch(err){
        console.log("Error in fetching data",err)
        alert("failed to fetch data")
      }
    }
    fetchEmployee()
  },[])
  useEffect(()=>{
    // b = a.map((e,index)=>({[index+1]:e}))
    let rowEmp = [];
for (let i = 0; i < employees.length; i += 10) {
  rowEmp.push(employees.slice(i, i + 10));
}
    setrowEmployee(rowEmp)
  },[employees])
  const tableRow ={
    background:"#03fc7b",
  }
  return (
    <div>
      <div><h1>Employee Data Table</h1></div>
      <div>
        <table>
          <thead>
          <tr style={tableRow}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
          </thead>
          <tbody>
          {rowEmployee.length !== 0 && rowEmployee[pageNumber-1].map((employee)=>(
            <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.role}</td>
          </tr>
          ))}
          </tbody>
        </table>
        <div>
          <button onClick={() => setPageNumber(prevValue => prevValue - 1)} disabled={pageNumber === 1}>Previous</button>
          <span>{pageNumber}</span>
          <button onClick={() => setPageNumber(prevValue => prevValue + 1)} disabled={pageNumber === rowEmployee.length}>Next</button>
        </div>
      </div>
      
    </div>
  );
}

export default App;
