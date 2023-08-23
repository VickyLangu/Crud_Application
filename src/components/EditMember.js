import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EditMember = ({ onEdit }) => {
  const { id } = useParams(); // Get the member id from the URL
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [reminder, setReminder] = useState(false);
  const [image, setImage] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState(null);

  useEffect(() => {
    // Fetch the member data using the id
    const fetchMember = async () => {
      try {
        const response = await fetch(`http://localhost:5001/members/${id}`);
        const data = await response.json();
        setMember(data);
        setName(data.name || "");
        setTitle(data.title || "");
        setReminder(data.reminder || false);
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMember();
  }, [id]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageDataUrl(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImageDataUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please add a member's name");
      return;
    }

    const updatedMember = {
      ...member,
      name,
      title,
      reminder,
      image: image ? URL.createObjectURL(image) : null,
    };
    try {
      const response = await fetch(`http://localhost:5001/members/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMember),
      });

      if (response.ok) {
        // Call onEdit here if needed
        alert("Member updated successfully");
        navigate("/"); // Redirect to the members list
      } else {
        console.error("Failed to update member");
      }
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
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
        {imageDataUrl ? (
          <img src={imageDataUrl} alt="Profile" className="profile-picture" />
        ) : (
          <img
            src={require("../image/background.png")}
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
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <input type="submit" value="Update Member" className="btn btn-block" />
    </form>
  );
};

export default EditMember;
