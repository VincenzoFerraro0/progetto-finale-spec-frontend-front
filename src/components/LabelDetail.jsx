import { Link } from "react-router-dom";

export default function LabelDetail({path}) {
    return (
        <Link to={path}>
            <div>dettagli</div>
        </Link>
    )
}