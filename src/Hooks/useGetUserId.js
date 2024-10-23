// const useGetUserId = () => {
//   return (
//     window.localStorage.getItem('userID')
//   );
 
// }
// export default useGetUserId

import { useState, useEffect } from 'react';

const useGetUserId = () => {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedUserId = window.localStorage.getItem('userID', userID);  
    setUserID(storedUserId);
  }, []); // Empty dependency array means this effect runs only once after the component mounts.

  return userID;
};

export default useGetUserId;