import React from "react";
import FindDoctor from "../../components/Doctor/FindDoctor/FindDoctors";
import Navbar from "../../components/Navbar";

const findDoctor = () => {
  return (
    <div>
      <Navbar />
      <FindDoctor />
    </div>
  );
};

export default findDoctor;


// const FindDoctor = () => {

//   const [state, setState] = useState('findDoctor')
  
//   useEffect(() => {
//     const data = localStorage.getItem('view_doctors_state')
//     console.log(data);
//     if(data !== null) setState(JSON.parse(data))
//   }, [])

//   useEffect(() => {
//     localStorage.setItem('view_doctors_state', JSON.stringify(state))
//   }, [state])

//   return (
//     <div>
//       <Navbar />
//       {state === 'findDoctor' && (
//         <FindDoctors />
//       )}
//       {state === "dentist" && (
//         <InCategoryDoctors/>
//       )}
//     </div>
//   );
// };