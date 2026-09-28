
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',
  imageSize: 90,
};
function Button() {
  return (
    <button>Click me {user.name}</button>
  );
}
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
  return (
    <div> 
      <h1 className="title">Hello world!</h1>
      <Button />
      <br />
      <Image />
    </div>
  )
}