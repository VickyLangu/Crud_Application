import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import EditMember from "./EditMember";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Member = ({ member, onDelete, onToggle, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const editTask = (updatedMember) => {
    // Call the onEdit function and pass the updatedMember object
    onEdit(member.id, updatedMember);
  };

  return (
    <div
      className={`member ${member.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(member.name)}
    >
      <div className="member-content">
        {member.image && (
          <img
            src={member.image} // Assuming member.image contains the image URL
            alt=""
            className="profile-picture member-image"
          />
        )}
        <div className="member-details">
          <h2>{member.name} </h2>{" "}
          <div className="member-icons">
            <Link to={`/edit/${member.id}`}>
              <FaPencilAlt
                style={{ color: "gray", cursor: "pointer" }}
                onClick={() => onEdit(member.id)} // Use onEdit instead of onEditClick
              />
            </Link>
            <FaTrashAlt
              style={{ color: "gray", cursor: "pointer" }}
              onClick={() => onDelete(member.id)}
            />
          </div>
          {editing ? (
            <EditMember onSubmit={editTask} />
          ) : (
            <h3>{member.text}</h3>
          )}
          {/* <h3>{member.text}</h3> */}
        </div>
      </div>
    </div>
  );
};

export default Member;
