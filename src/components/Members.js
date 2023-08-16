import Member from "./Member";
import { useNavigate } from "react-router-dom";

const Members = ({ members, onDelete, onToggle, onEdit }) => {
  const navigate = useNavigate();
  const handleEditClick = (id) => {
    const selectedMember = members.find((member) => member.id === id);
    if (selectedMember) {
      onEdit(id);
      navigate(`/edit/${id}`);
    }
  };
  return (
    <>
      {members.map((member) => (
        <Member
          key={member.id}
          member={member}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </>
  );
};

export default Members;
