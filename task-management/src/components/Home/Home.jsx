import React from "react";
import { Link } from "react-router-dom";

export const Home = ({data}) => {
  return (
    <div>
      <section className="header">
        <h1 className="text-2xl font-bold">
          task<span className="text-[#8059FC]">management</span>
        </h1>
      </section>

      <section className="home flex justify-evenly">
        <div className="cards card1  h-[500px] w-[330px] ">
          <div className="settings">
            <h1>Settings</h1>
            
            
            {/* <h1>Edit</h1> */}
            <Link to="/">All</Link>
            <Link to="/create">Create</Link>
            <Link to="/edit">Edit</Link>
            
          </div>
        </div>
        <div className="cards card2 w-[780px]">
        </div>
      </section>
    </div>
  );
};
