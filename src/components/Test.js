import React, {useContext} from 'react';
import UserContext from '../contexts/UserContext';

const Test = () => {
  const User = useContext(UserContext);
  console.log(User);
  return (
    <div>
      {/* {User.text} */}
      {User.token && <div>You can see the secret message!</div>}
      I am test
      {/* <button onClick={() => User.setText("CHICKEN")}>CLICK ME</button> */}
    </div>
  )

}

export default Test;