import { useState } from 'react';

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',
  imageSize: 90,
};

function Image() {
  return (
    <img className="profile"
      src={user.imageUrl}
      alt={'123' + user.name}
      style={{
        width: user.imageSize,
        height: user.imageSize,
      }}
    />
  );
}

export default function Title() {
  const [count, setCount] = useState(0);


  function handleClick() {
    setCount(count + 1);
  }
  return (
    <div> 
      <h1 className="title">Hello world!</h1>
      <Button count={count} onClick={handleClick}/>
      <Button count={count} onClick={handleClick}/>
      <br />
      <Image />
    </div>
  );
}
function  Button({ count, onClick }) {
  
  return (
    <button onClick={onClick}>Click me {count}</button>
  );
}