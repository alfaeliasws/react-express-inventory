// import React, { useEffect, useState } from 'react'
// import { useNavigate } from "react-router-dom";
// import { signUp } from '../services/Auth';
// import { jwtDecode } from 'jwt-decode';

// function SignUp() {
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//     passwordConfirmation: ""
//   })

//   const [disable, setDisable] = useState(true) 

//   const navigate = useNavigate()

//   function handleChange(e) {
//     e.preventDefault()

//     if(e.target.id === "username") {
//       const usernameUpdate = {username: e.target.value}
//       setCredentials(credentials => ({...credentials, ...usernameUpdate}))
//     }

//     if(e.target.id === "password") {
//       const passwordUpdate = {password: e.target.value}
//       setCredentials(credentials => ({...credentials, ...passwordUpdate}))
//     }

//     if(e.target.id === "passwordConfirmation") {
//       const passwordConfirmation = {passwordConfirmation: e.target.value}
//       setCredentials(credentials => ({...credentials, ...passwordConfirmation}))

//       if(e.target.value === credentials.password){
//         console.log("hit this")
//         setDisable(prev => false)
//       } else {
//         setDisable(prev => true)
//       }
//     }

//   }

//   async function handleSignUpClick(e){

//     e.preventDefault()

//     const response = await signUp(credentials)

//     if(response.status === 200) {
//       sessionStorage.setItem("token", response.token)
//       const jwtContent = jwtDecode(response.token)
//       navigate('/detail/' + jwtContent.userDetail.id)
//     }

//   }

//   async function handleLoginClick(e){
//     e.preventDefault()
//     navigate('/login')
//   }

//   useEffect(() => {
//     if(sessionStorage.getItem("token") 
//       && sessionStorage.getItem("token") !== "undefined"
//       && sessionStorage.getItem("token") !== "false"  
//   ) {
//       navigate("/detail");
//     }
//   },[])

//   useEffect(() => {
//   },[credentials, disable])

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900">
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                   <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                       Register your account
//                   </h1>
//                   <form className="space-y-4 md:space-y-6" action="#">
//                       <div>
//                           <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
//                           <input type="text" name="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example_username" required="" onChange={(e) => handleChange(e)}/>
//                       </div>
//                       <div>
//                           <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                           <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e) => handleChange(e)}/>
//                       </div>
//                       <div>
//                         <label for="passwordConfirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Confirmation</label>
//                         <input type="password" name="passwordConfirmation" id="passwordConfirmation" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e) => handleChange(e)}/>
//                       </div>
//                       <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSignUpClick} disabled={disable}>Sign Up</button>
//                       <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleLoginClick}>Log in</button>
//                   </form>
//               </div>
//           </div>
//       </div>
//     </section>
//   )
// }

// export default SignUp