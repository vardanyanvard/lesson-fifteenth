import React from "react";

function EditLogin() {
  return (
    <div className="editLoginComponent">
      <p>Edit Login</p>
      <form action="">
        <input type="text" placeholder="login" />
        <input type="text" placeholder="password" />
        <button>Save</button>
      </form>
    </div>
  );
}

export default EditLogin;
