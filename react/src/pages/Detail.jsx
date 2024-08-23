import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, removeUsers, updateUsers } from '../services/Users';
import { jwtDecode } from 'jwt-decode';

function Detail() {
  const { id } = useParams();

  const navigate = useNavigate()

  const [data, setData] = useState({})

  const [role, setRole] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("") 

  async function fetchDetails(){
    const response = await getUserById(id)


    if(response.status === 200){
      const data = response.data
      const changeFloat = data.educations.map((item) => {
        const betterGpa = parseFloat(item.gpa).toFixed(2)
        return {...item, gpa: betterGpa }
      })

      const changeDate = data.users.map((item) => {
        const dateObject = new Date(item.date_of_birth)
        const date = dateObject.getFullYear() + "-" + dateObject.getMonth() + "-" + dateObject.getDate()
        return {...item, date_of_birth: date}
      })
      const processedData = {...data, educations: changeFloat, users: changeDate}

      setData(details => processedData)
    }
  }

  useEffect(() => {
    if(!sessionStorage.getItem("token") || sessionStorage.getItem("token") === ""){
      navigate('/login')
    }

    const jwtContent = jwtDecode(sessionStorage.getItem("token")).userDetail

    if(jwtContent.role === "admin" ){
      setRole(role => jwtContent.role)
    } 

    if(id !== jwtContent.id && jwtContent.role !== "admin"){
      navigate('/detail/' + jwtContent.id)
    }

    fetchDetails()
  },[])

  useEffect(() => {
    console.log(data)  
  }, [data])
  

  function handleLogout(e){
    sessionStorage.removeItem("token")
    navigate("/login")
  }

  function handleChange(e){
    e.preventDefault()

    if(e.target.id === "username") {
      const usernameUpdate = {username: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...usernameUpdate}]}))
    }

    if(e.target.id === "fullName") {
      const fullNameUpdate = {full_name: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...fullNameUpdate}]}))
    }

    if(e.target.id === "email") {
      const emailUpdate = {email: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...emailUpdate}]}))
    }

    if(e.target.id === "registerNumber") {
      const registerNumberUpdate = {register_number: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...registerNumberUpdate}]}))
    }

    if(e.target.id === "appliedPosition") {
      const appliedPositionUpdate = {applied_position: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...appliedPositionUpdate}]}))
    }


    if(e.target.id === "registerAddress") {
      const registerAddressUpdate = {register_address: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...registerAddressUpdate}]}))
    }

    if(e.target.id === "sex") {
      const sexUpdate = {sex: e.target.value}
      setData(data => ({...data, users : [{...data.users[0], ...sexUpdate}]}))
    } 

    
    if(e.target.id === "status") {
      const statusUpdate = {status: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...statusUpdate}]}))
    }

    if(e.target.id === "placeOfBirth") {
      const placeOfBirthUpdate = {place_of_birth: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...placeOfBirthUpdate}]}))
    }

    if(e.target.id === "dateOfBirth") {
      setDateOfBirth(prev => e.target.value)
      const dateOfBirthUpdate = {date_of_birth: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...dateOfBirthUpdate}]}))
    }

    if(e.target.id === "currentAddress") {
      const currentAddressUpdate = {current_adress: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...currentAddressUpdate}]}))
    }

    if(e.target.id === "phone") {
      const phoneUpdate = {phone_number: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...phoneUpdate}]}))
    }

    if(e.target.id === "expectedSalary") {
      const expectedSalaryUpdate = {expected_salary: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...expectedSalaryUpdate}]}))
    }
    
    if(e.target.id === "bloodType") {
      const bloodTypeUpdate = {blood_type: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...bloodTypeUpdate}]}))
    }
    
    if(e.target.id === "emergencyName") {
      const emergencyNameUpdate = {emergency_name: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...emergencyNameUpdate}]}))
    }

    if(e.target.id === "skills") {
      const skillsUpdate = {skill: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...skillsUpdate}]}))
    }
    
    if(e.target.id === "religion") {
      const religionUpdate = {religion: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...religionUpdate}]}))
    }

    if(e.target.id === "officeAvaliablility") {
      const officeAvaliablilityUpdate = {availability_all_office: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...officeAvaliablilityUpdate}]}))
    }

    if(e.target.id === "role") {
      const roleUpdate = {role: e.target.value}
      setData(data => ({...data, users: [{...data.users[0], ...roleUpdate}]}))
    }

    if((e.target.id.includes("education") || e.target.id.includes("courses") || e.target.id.includes("career")) && !e.target.id.includes("delete") ){
      const id = e.target.id

      const num = id.match(/\d+/g);
      const index = parseInt(num[0])
      const string = id.match(/[A-Za-z\_]+/g);

      const arrayName = string[0]; 
      const propertyName = string[1]; 

      console.log({arrayName})

      const updatedArray = [...data[arrayName]];

      const updatedObject = { ...updatedArray[index] };

      if(propertyName === "gpa"){
        updatedObject[propertyName] = parseFloat(e.target.value).toFixed(2);

        if(updatedObject[propertyName] < 0){
          updatedObject[propertyName] = 0
        }

      // } else if(propertyName === "graduation"){
      //   updatedObject["graduation_year"] = e.target.value
      // } else if(arrayName === "careers" && propertyName === "last"){
      //   updatedObject["last_salary"] = e.target.value
      } else {
        updatedObject[propertyName] = e.target.value;
      }

      updatedArray[index] = updatedObject;

      setData((prevData) => ({
        ...prevData,
        [arrayName]: updatedArray,
      }));
    }

    if(e.target.id.includes("delete")){
      const id = e.target.id

      const num = id.match(/\d+/g);
      const index = parseInt(num[0])
      const string = id.match(/[A-Za-z]+/g);

      const arrayName = string[0]; 

      const updatedArray = [...data[arrayName]].filter((item, i) => i !== index);

      setData((prevData) => ({
        ...prevData,
        [arrayName]: updatedArray,
      }));
    }

    if(e.target.id.includes("buttonAdd")){

      const id = e.target.id

      const string = id.split(/([A-Z][a-z]+)/).filter((item) => item !== '')

      const arrayName = string[2].toLowerCase(); 

      const updatedArray = [...data[arrayName]];

      let updatedObject = { };

      if(arrayName === "Educations"){
        updatedObject = {
          level:"",
          institution:"",
          major:"",
          graduation_year:"",
          gpa:0
        };
      }

      if(arrayName === "Courses"){
        updatedObject = {
          title:"",
          certification:"",
          year:"",
        };
      }

      if(arrayName === "Careers"){
        updatedObject = {
          company:"",
          position:"",
          last_salary:0,
          year:"",
        };
      }

      updatedArray[updatedArray.length] = updatedObject;

      setData((prevData) => ({
        ...prevData,
        [arrayName]: updatedArray,
      }));
    }


  }

  async function deleteUser(){
    const deleteUser = await removeUsers(id)
    navigate('/list')
  }

  async function updateUser(){

  const update = await updateUsers(data, id)

  if(update){
    window.location.reload()
  }

  }
  

  return (
    <div>
      <header className="flex flex-wrap gap-10 items-start px-2.5 py-7 whitespace-nowrap min-h-[71px] bg-[#222933] justify-between pr-3">
        <div className="relative text-2xl font-semibold text-blue-50">
          Update Profile
        </div>
        <div className="relative text-2xl font-semibold text-blue-50 cursor-pointer" onClick={handleLogout}>
          <button className='mr-5 hover:opacity-70 transition-all'>Logout</button>
        </div>
      </header>

      {
        role &&
        <div>
          <button className="text-blue-600 hover:text-blue-400 transition-all ml-8 mt-3 font-bold text-2xl" onClick={(e)=>navigate('/list/')}>{"<- Back"}</button>
        </div>
      }

      <main className="flex flex-wrap px-5 pb-12 pt-3">

      
      <section className="flex flex-wrap w-full justify-between mt-8">
        <p className="text-black text-3xl mb-8 mt-3 font-black tracking-wide ">Profile</p>
      </section>

      {
        data?.users &&

        <div className="flex flex-wrap w-full">
          <div className="w-6/12 px-4 mb-3">
            <label for="username" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Username</label>
            <input type="text" id="username" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example_username" required value={data.users[0].username} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="fullName" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Name</label>
            <input type="text" id="fullName" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required value={data.users[0].full_name} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="email" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Email</label>
            <input type="email" id="email" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="youremail@email.com" required value={data.users[0].email} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="appliedPosition" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Applied Position</label>
            <input type="text" id="appliedPosition" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Position Desired" required value={data.users[0].applied_position} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="registerNumber" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Register Number</label>
            <input type="number" id="registerNumber" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required value={data.users[0].register_number} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="sex" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Sex</label>
            <select type="text" id="sex" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Male/Female" defaultValue={data.users[0].sex} onChange={(e)=>handleChange(e)}>
             <option value="male">Male</option>
             <option value="female">Female</option> 
            </select>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="status" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Marital Status</label>
            <select type="text" id="status" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Married/Single" value={data.users[0].status} onChange={(e)=>handleChange(e)}>
             <option value="single">Single</option> 
             <option value="married">Married</option>
            </select>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="placeOfBirth" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Place Of Birth</label>
            <input type="text" id="placeOfBirth" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City" value={data.users[0].place_of_birth} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="dateOfBirth" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Date Of Birth</label>
            <input type="date" id="dateOfBirth" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="08-08-1908" value={data.users[0].date_of_birth} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="skills" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Skills</label>
            <textarea id="skills" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Explain Your Skills Here" value={data.users[0].skill} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="registerAddress" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Register Address</label>
            <input type="text" id="registerAddress" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Register Address" value={data.users[0].register_address} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="currentAddress" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Current Address</label>
            <input type="text" id="currentAddress" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Current Address" value={data.users[0].current_address} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="phone" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Phone</label>
            <input type="tel" id="phone" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123456789" value={data.users[0].phone_number} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="expectedSalary" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Expected ExpectedSalary</label>
            <input type="number" id="salary" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="000000" value={data.users[0].expected_salary} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="bloodType" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Blood Type</label>
            <select type="text" id="bloodType" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Choose Your Blood Type" value={data.users[0].blood_type} onChange={(e)=>handleChange(e)}>
             <option value="A">A</option>
             <option value="B">B</option>
             <option value="AB">AB</option> 
             <option value="O">O</option> 
            </select>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="emergencyName" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Emergency Name</label>
            <input type="text" id="emergencyName" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Emergency Name" value={data.users[0].emergency_name} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="religion" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Religion</label>
            <input type="text" id="religion" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Religion" value={data.users[0].religion} onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="w-6/12 px-4 mb-3">
            <label for="officeAvailability" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Availabiliy For All Office </label>
            <select type="text" id="officeAvailability" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="YES/NO" value={data.users[0].availibilty_all_office} onChange={(e)=>handleChange(e)}>
             <option value="YES">YES</option>
             <option value="NO">NO</option> 
            </select>
          </div>
          {
            role &&
            <div className="w-6/12 px-4 mb-3">
              <label for="role" className="flex w-full px-2 mb-2 text-sm font-medium text-gray-900">Role</label>
              <select type="text" id="role" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="YES/NO" value={data.users[0].role} onChange={(e)=>handleChange(e)}>
              <option value="admin">admin</option>
              <option value="employee">employee</option>
              <option value="candidate">candidate</option> 
              </select>
            </div>
          }
        </div>
      }

    <section className="flex-flex-wrap px-10">
        <section className="flex flex-wrap w-full justify-between mt-8 mb-8">
          <p className="text-black text-3xl mb-8 mt-3 font-black tracking-wide ">Education</p>
          <div className="flex flex-wrap w-full text-black text-lg font-black">
            <div className="flex w-2/12 mb-2">Level</div>
            <div className="flex w-2/12 mb-2">Institution</div>
            <div className="flex w-4/12 mb-2">Major</div>
            <div className="flex w-2/12 mb-2">Graduation Year</div>
            <div className="flex w-2/12 mb-2">GPA</div>
          </div>
          {
              data?.users && data.educations.map((item,index) => {
                return (
                <div className="flex flex-wrap w-full text-black text-lg font-black">
                  <div className="flex w-2/12 px-3">
                    <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="text" id={`educations`+index+`level`+(item.id ?? 0)} onChange={handleChange} value={item.level} />
                  </div>
                  <div className="flex w-2/12 px-3">
                    <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="text" id={`educations`+index+`institution`+(item.id ?? 0)} onChange={handleChange} value={item.institution} />
                  </div>
                  <div className="flex w-4/12 px-3" >
                    <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="text" id={`educations`+index+`major`+(item.id ?? 0)} onChange={handleChange} value={item.major} />
                  </div>
                  <div className="flex w-2/12 px-3">
                    <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="year" min="1900" id={`educations`+index+`graduation_year`+(item.id ?? 0)} onChange={handleChange} value={item.graduation_year} />
                  </div>
                  <div className="flex w-1/12 px-3">
                    <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" min="0" type="number" id={`educations`+index+`gpa`+(item.id ?? 0)} onChange={handleChange} value={item.gpa} />
                  </div>
                  <div className="flex w-1/12 px-3">
                    <button className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-red-700 text-white justify-center px-4 font-medium hover:opacity-60 transition-all" id={`educations`+index+`delete`+(item.id ?? 0)} onClick={handleChange}>Del</button>
                  </div>
                </div>
                ) 
              })
            }
            <div className="flex flex-wrap w-full text-black text-lg font-black flex-end items-end">
              <div div className="flex w-full px-3 justify-end">
                <button className="flex flex-wrap w-1/12 py-3 rounded-lg mb-2 mt-1 bg-gray-700 text-white justify-center px-4 font-medium hover:opacity-60 transition-all" type="float" id={`buttonAddEducations`} onClick={handleChange}>Add</button>
              </div>
            </div>
        </section>

        
        <section className="flex flex-wrap w-full justify-between mt-8 mb-8">
          <p className="text-black text-3xl mb-8 mt-3 font-black tracking-wide ">Courses</p>
          <div className="flex flex-wrap w-full text-black text-lg font-black">
            <div className="flex w-4/12 mb-2">Title</div>
            <div className="flex w-3/12 mb-2">Certification</div>
            <div className="flex w-3/12 mb-2">Year</div>
          </div>
          {
              data?.users && data.courses.map((item,index) => {
                return (
                <div className="flex flex-wrap w-full text-black text-lg font-black">
                  <div className="flex w-4/12 px-3">
                    <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="text" id={`courses`+index+`title`+(item.id ?? 0)} onChange={handleChange} value={item.title} />
                  </div>
                  <div className="flex w-3/12 px-3">
                    <select className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="text" id={`courses`+index+`certification`+(item.id ?? 0)} onChange={handleChange} value={item.  certification}>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                  <div className="flex w-3/12 px-3" >
                    <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="number" min="1900" id={`courses`+index+`year`+(item.id ?? 0)} onChange={handleChange} value={item.year} />
                  </div>
                  <div className="flex w-1/12 px-3">
                    <button className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-red-700 text-white justify-center px-4 font-medium hover:opacity-60 transition-all" id={`courses`+index+`delete`+(item.id ?? 0)} onClick={handleChange}>Del</button>
                  </div>
                </div>
                ) 
              })
            }
            <div className="flex flex-wrap w-full text-black text-lg font-black flex-end items-end">
              <div div className="flex w-11/12 px-3 justify-end">
                <button className="flex flex-wrap w-1/12 py-3 rounded-lg mb-2 mt-1 bg-gray-700 text-white justify-center px-4 font-medium hover:opacity-60 transition-all" type="float" id={`buttonAddCourses`} onClick={handleChange}>Add</button>
              </div>
            </div>
        </section>

        <section className="flex flex-wrap w-full justify-between mt-8 mb-8">
          <p className="text-black text-3xl mb-8 mt-3 font-black tracking-wide ">Careers</p>
          <div className="flex flex-wrap w-full text-black text-lg font-black">
            <div className="flex w-3/12 mb-2">Company</div>
            <div className="flex w-3/12 mb-2">Position</div>
            <div className="flex w-3/12 mb-2">Last Salary</div>
            <div className="flex w-3/12 mb-2">Year</div>
          </div>
          {
              data?.users && data.careers.map((item,index) => {
                return (
                <div className="flex flex-wrap w-full text-black text-lg font-black">
                  <div className="flex w-3/12 px-3">
                    <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="text" id={`careers`+index+`company`+(item.id ?? 0)} onChange={handleChange} value={item.company} />
                  </div>
                  <div className="flex w-3/12 px-3">
                    <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="text" id={`careers`+index+`position`+(item.id ?? 0)} onChange={handleChange} value={item.position} />
                  </div>
                  <div className="flex w-3/12 px-3" >
                    <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="text" id={`careers`+index+`last_salary`+(item.id ?? 0)} onChange={handleChange} value={item.last_salary} />
                  </div>
                  <div className="flex w-2/12 px-3" >
                    <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="number" min="1900" id={`careers`+index+`year`+(item.id ?? 0)} onChange={handleChange} value={item.year} />
                  </div>
                  <div className="flex w-1/12 px-3">
                    <button className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-red-700 text-white justify-center px-4 font-medium hover:opacity-60 transition-all" id={`careers`+index+`delete`+(item.id ?? 0)} onClick={handleChange}>Del</button>
                  </div>
                </div>
                ) 
              })
            }
            <div className="flex flex-wrap w-full text-black text-lg font-black flex-end items-end">
              <div div className="flex w-full px-3 justify-end">
                <button className="flex flex-wrap w-1/12 py-3 rounded-lg mb-2 mt-1 bg-gray-700 text-white justify-center px-4 font-medium hover:opacity-60 transition-all" type="float" id={`buttonAddCareers`} onClick={handleChange}>Add</button>
              </div>
            </div>
        </section>
    </section>


      <section className="flex flex-wrap w-full justify-between mt-8">
      {
        role &&
        <button id="deleteAddProject" className="bg-red-600 px-3 py-2 min-h-4 mr-5 rounded-lg text-white font-semibold hover:opacity-60 transition-all" onClick={deleteUser}>Delete User</button>
      }
      <button id="saveAddProject" className="bg-blue-600 px-3 py-2 min-h-4 gap-3 rounded-lg text-white font-semibold hover:opacity-60 transition-all" onClick={updateUser}>Update User</button>
      </section>

      </main>
    </div>
  )
}

export default Detail