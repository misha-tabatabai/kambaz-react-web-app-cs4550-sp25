import { FaCalendar, FaEnvelopeOpenText, FaRegClock }
    from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBookBible } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";
export default function ReactIconsSampler() {
    return (
        <div id="wd-react-icons-sampler" className="mb-4">
            <h2>React Icons Sampler</h2>
            <div className="d-flex">
                <VscAccount size={30} className="fs-3 text" />
                <AiOutlineDashboard size={30} className="fs-3 text" />
                <FaBookBible size={30} className="fs-3 text" />
                <FaCalendar size={30} className="fs-3 text" />
                <FaEnvelopeOpenText size={30} className="fs-3 text" />
                <FaRegClock size={30} className="fs-3 text" />
            </div>
        </div>
    );
}
