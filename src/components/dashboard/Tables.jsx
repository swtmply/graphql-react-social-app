import React from "react";
import "../../styles/table.scss";

const Tables = ({ data }) => {
  return (
    <div className="table__component">
      <div className="table">
        {data[0].__typename === "User" ? (
          <>
            <div className="row head">
              <div className="column head">Username</div>
              <div className="column head">Email</div>
              <div className="column head">Role</div>
              <div className="column head">Actions</div>
            </div>
            {data.map((user, index) => (
              <div className="row data" key={index}>
                <div className="column data">{user.username}</div>
                <div className="column data">{user.email}</div>
                <div className="column data">{user.role}</div>
                <div className="column data">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Tables;
