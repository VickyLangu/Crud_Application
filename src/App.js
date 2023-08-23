import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Member from "./components/Member";
import Members from "./components/Members";
import AddMembers from "./components/AddMembers";
import EditMember from "./components/EditMember";
import { useState, useEffect } from "react";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [members, setTasks] = useState([]);
  const [selectedMemberData, setSelectedMemberData] = useState(null);
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5001/members");
    const data = await res.json();

    return data;
  };

  // fetch

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5001/members/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  const addTask = async (member) => {
    const res = await fetch("http://localhost:5001/members", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(member),
    });

    const data = await res.json();

    setTasks([...members, data]);
  };

  //Edit function
  const editTask = async (id, updatedMember) => {
    await fetch(`http://localhost:5001/members/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMember),
    });
    setTasks((prevTasks) =>
      prevTasks.map((member) =>
        member.id === id ? { ...member, ...updatedMember } : member
      )
    );
  };

  // delete function

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5001/members/${id}`, {
      method: "DELETE",
    });
    setTasks(members.filter((member) => member.id !== id));
  };

  // toggle
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5001/members/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      members.map((member) =>
        member.id === id ? { ...member, reminder: data.reminder } : member
      )
    );
  };

  const handleEditClick = (id) => {
    const selectedMember = members.find((member) => member.id === id);
    if (selectedMember) {
      setSelectedMemberData(selectedMember);
    }
  };

  // function App() {
  // return (
  // <Router>
  //   <div className="app">
  //     <Header
  //       onAdd={() => setShowAddTask(!showAddTask)}
  //       showAdd={showAddTask}
  //     />
  //     <Routes>
  //       <ReactRoute
  //         path="/"
  //         element={
  //           <Members
  //             members={members}
  //             onDelete={deleteTask}
  //             onToggle={toggleReminder}
  //             onEdit={editTask}
  //           />
  //         }
  //       />
  //       <ReactRoute path="/add" element={<AddMembers onAdd={addTask} />} />
  //       <Route path="/edit/:id" element={<EditMember />} />
  //       <Route
  //         path="/"
  //         element={
  //           <Members
  //             members={members}
  //             onDelete={deleteTask}
  //             onToggle={toggleReminder}
  // //           />
  //         }
  //       />
  //       <Route path="/add" element={<AddMembers onAdd={addTask} />} />
  //       <Route
  //         path="/edit/:id"
  //         element={<EditMember onSubmit={editTask} />}
  //       />
  //     </Routes>
  //     <Route
  //       path="/"
  //       element={
  //         <Members
  //           members={members}
  //           onDelete={deleteTask}
  //           onToggle={toggleReminder}
  //         />
  //       }
  //     />
  //     <Route path="/add" element={<AddMembers onAdd={addTask} />} />
  //     <Route path="/edit/:id" element={<EditMember onSubmit={editTask} />} />
  //   </div>
  // </Router>
  // );
  // }
  return (
    <Router>
      <div className="app">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Members
                members={members}
                onDelete={deleteTask}
                onToggle={toggleReminder}
                onEdit={handleEditClick} // Pass your handleEditClick function here
                setSelectedMemberData={setSelectedMemberData} // Pass the setter function
              />
            }
          />
          <Route path="/add" element={<AddMembers onAdd={addTask} />} />

          <Route
            path="/edit/:id"
            element={
              <EditMember
                member={selectedMemberData}
                onEdit={(updatedMember) =>
                  editTask(selectedMemberData.id, updatedMember)
                }
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
