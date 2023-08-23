import Member from "./Member";
import { useNavigate } from "react-router-dom";

const Members = ({
  members,
  onDelete,
  onToggle,
  onEdit,
  setSelectedMemberData,
}) => {
  const navigate = useNavigate();
  const handleEditClick = (id) => {
    const selectedMember = members.find((member) => member.id === id);
    if (selectedMember) {
      // onEdit(id);
      setSelectedMemberData(selectedMember);
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
          onEdit={handleEditClick}
        />
      ))}
    </>
  );
};

export default Members;
