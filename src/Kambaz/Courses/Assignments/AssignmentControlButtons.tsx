import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentControlButtons() {
    return (
        <div className="float-end">
                <span className="wd-rounded-corners-all-around-1 wd-border-solid">
                    40% of Total </span>
            <BsPlus className="fs-4 mx-2" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}