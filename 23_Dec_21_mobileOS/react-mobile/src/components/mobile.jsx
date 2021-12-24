import "./mobile.css"

function MobileOS() {
  return (
    <div className="container">
      <div>
        <h1>Mobile Operating System</h1>
        <li>Android</li>
        <li>BlackBerry</li>
        <li>iPhone</li>
        <li>Windows Phone</li>
      </div>
      <div>
        <h1>Mobile Manufacturers</h1>
        <li>Samsung</li>
        <li>HTC</li>
        <li>Micromax</li>
        <li className="circle">Apple</li>
      </div>
    </div>
  );
}

export default MobileOS;