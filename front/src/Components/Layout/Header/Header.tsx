import "./Header.css";

export function Header(): JSX.Element {
    return (
        <div className="Header">
            <h1 className="HeaderTitle">Queue Management System</h1>
            <p className="HeaderSubtitle">Efficiently manage your appointments and patients</p>
        </div>
    );
}
