// import React, { useState } from "react";

// const AddMembers = ({ onAdd }) => {
//   const [name, setText] = useState("");
//   const [text, setDay] = useState("");
//   const [reminder, setReminder] = useState(false);
//   const [image, setImage] = useState(null);

//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];
//     setImage(selectedImage);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (!name) {
//       alert("Please add a member's name");
//       return;
//     }

//     const newMember = {
//       name,
//       text,
//       reminder,
//       image: image ? URL.createObjectURL(image) : null, // Use the image URL if available
//     };

//     onAdd(newMember);

//     setText("");
//     setDay("");
//     setReminder(false);
//     setImage(null);
//   };
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

const EditMember = ({ member, onEdit, onBack }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [reminder, setReminder] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // console.log("Received member prop:", member);
    if (member) {
      setName(member.name);
      setText(member.text);
      setReminder(member.reminder);
      setImage(member.image ? new File([member.image], "profile.jpg") : null);
    }
  }, [member]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please add a member's name");
      return;
    }

    const updatedMember = {
      name,
      text,
      reminder,
      image: image ? URL.createObjectURL(image) : null,
    };

    onEdit(member.id, updatedMember);
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="arrow-link" style={{ width: "40px" }}>
        <Link to="/">
          <FaArrowLeft
            style={{
              fontSize: "10px",
              width: "100%",
              height: "100%",
              color: "#164b60",
            }}
          />
        </Link>
      </div>
      <div className="profile-picture-container">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Profile"
            className="profile-picture"
          />
        ) : (
          <img
            src={require("../image/background.png")} // Replace with the actual path to your placeholder image
            alt=""
            className="placeholder-image"
          />
        )}
        <label htmlFor="profile-picture" className="profile-picture-label">
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />{" "}
          <div className="add-icon">+</div>
        </label>
      </div>

      <div className="form-control">
        <input
          type="text"
          placeholder="Full names"
          value={name}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Job Title"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <input type="submit" value="Add Member" className="btn btn-block" />
    </form>
  );
};

export default EditMember;

// const AddMembers = ({ onAdd }) => {
//   const [text, setText] = useState("");
//   const [day, setDay] = useState("");
//   const [reminder, setReminder] = useState(false);
//   const [image, setImage] = useState(null);
//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (!text) {
//       alert("please add a member");
//       return;
//     }

//     onAdd({ text, day, reminder, image });

//     setText("");
//     setDay("");
//     setReminder(false);
//     setImage(null);
//   };

//   return (
//     <form className="add-form" onSubmit={onSubmit}>
//       {/* <h1>Hello</h1> */}
//       <div className="form-control">
//         <input
//           type="text"
//           placeholder="Full names"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//       </div>
//       <div className="form-control">
//         <input
//           type="text"
//           placeholder="Job Title"
//           value={day}
//           onChange={(e) => setDay(e.target.value)}
//         />
//       </div>

//       <input type="submit" value="Add Member" className="btn btn-block" />
//     </form>
//   );
// };

// export default AddMembers;

// import React, { useState } from "react";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// // Import the necessary components here

// const EditMember = ({ onSubmit }) => {
//   const { id } = useParams();
//   const [name, setText] = useState("");
//   const [text, setDay] = useState("");
//   const [reminder, setReminder] = useState(false);
//   const [image, setImage] = useState(null);
//   const handleEdit = () => {
//     // Perform the edit action here
//     // ...
//   };

//   const handleCancel = () => {
//     // Close the editing mode
//     // ...
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newMember = {
//       name,
//       text,
//       reminder,
//       image: image ? URL.createObjectURL(image) : null, // Use the image URL if available
//     };

//     onSubmit(updatedMember);
//   };

//   return (
//     <form className="add-form" onSubmit={handleSubmit}>
//       <div className="profile-picture-container">
//         {image && (
//           <img
//             src={URL.createObjectURL(image)}
//             alt="Profile"
//             className="profile-picture"
//           />
//         )}
//         <label htmlFor="profile-picture" className="profile-picture-label">
//           <input
//             type="file"
//             id="profile-picture"
//             accept="image/*"
//             onChange={handleImageChange}
//             style={{ display: "none" }}
//           />
//           <div className="add-icon">+</div>
//         </label>
//       </div>

//       <div className="form-control">
//         <input
//           type="text"
//           placeholder="Full names"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </div>
//       <div className="form-control">
//         <input
//           type="text"
//           placeholder="Job Title"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//       </div>

//       <input type="submit" value="Save Changes" className="btn btn-block" />
//     </form>
//   );
// };

// export default EditMember;

// // const EditMember = ({ onSubmit }) => {
// //   const { id } = useParams();
// //   const [newName, setNewName] = useState("");
// //   const [newText, setNewText] = useState("");
// //   const [newImage, setNewImage] = useState("");
// //   const [newReminder, setNewReminder] = useState(false);

// //   const handleEdit = () => {
// //     // Perform the edit action here
// //     // ...
// //   };

// //   const handleCancel = () => {
// //     // Close the editing mode
// //     // ...
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const updatedMember = {
// //       name: newName,
// //       text: newText,
// //       image: newImage,
// //       reminder: newReminder,
// //     };

// //     onSubmit(updatedMember);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         type="text"
// //         placeholder="New Name"
// //         value={newName}
// //         onChange={(e) => setNewName(e.target.value)}
// //       />
// //       <input
// //         type="text"
// //         placeholder="New Text"
// //         value={newText}
// //         onChange={(e) => setNewText(e.target.value)}
// //       />
// //       {/* Input fields for other member details */}
// //       {/* <div className="member-icons">
// //         <FaCheck
// //           style={{ color: "green", cursor: "pointer" }}
// //           onClick={handleEdit}
// //         />
// //         <FaTimes
// //           style={{ color: "red", cursor: "pointer" }}
// //           onClick={handleCancel}
// //         />
// //       </div> */}
// //       <button type="submit">Save</button>
// //     </form>
// //   );
// // };

// // export default EditMember;

// // import { FaTrashAlt, FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";

// // import React, { useState } from "react";

// // const EditMember = ({ onSubmit }) => {
// //   const [newName, setNewName] = useState("");
// //   const [newText, setNewText] = useState("");
// //   const [newImage, setNewImage] = useState("");
// //   const [newReminder, setNewReminder] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const updatedMember = {
// //       name: newName,
// //       text: newText,
// //       image: newImage,
// //       reminder: newReminder,
// //     };

// //     onSubmit(updatedMember);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         type="text"
// //         placeholder="New Name"
// //         value={newName}
// //         onChange={(e) => setNewName(e.target.value)}
// //       />
// //       <input
// //         type="text"
// //         placeholder="New Text"
// //         value={newText}
// //         onChange={(e) => setNewText(e.target.value)}
// //       />
// //       {/* Input fields for other member details */}
// //       <button type="submit">Save</button>
// //     </form>
// //   );
// // };

// // export default EditMember;
