// import { useState } from "react";
import React, { useState } from "react";

const AddMembers = ({ onAdd }) => {
  const [name, setText] = useState("");
  const [text, setDay] = useState("");
  const [reminder, setReminder] = useState(false);
  const [image, setImage] = useState(null);

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

    const newMember = {
      name,
      text,
      reminder,
      image: image ? URL.createObjectURL(image) : null, // Use the image URL if available
    };

    onAdd(newMember);

    setText("");
    setDay("");
    setReminder(false);
    setImage(null);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="profile-picture-container">
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Profile"
            className="profile-picture"
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
          onChange={(e) => setDay(e.target.value)}
        />
      </div>

      <input type="submit" value="Add Member" className="btn btn-block" />
    </form>
  );
};

export default AddMembers;

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
