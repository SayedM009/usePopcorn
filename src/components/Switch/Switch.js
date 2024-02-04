export default function Switch({toggle, setToggle}) {
    return <div className="switch" onClick={() => setToggle(!toggle)}>
        <img style={{width:"15px"}} src="https://cdn-icons-png.flaticon.com/128/2990/2990154.png" alt="switch"></img>
    </div>
}