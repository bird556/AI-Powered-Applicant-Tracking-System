import React, {useEffect} from "react";
import { Link } from "react-router";
import {usePuterStore} from "~/lib/puter";

const Navbar = () => {
    const {auth} = usePuterStore();


    return (
    <nav className={"navbar"}>
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">RESUMIND</p>
      </Link>
        {auth.isAuthenticated && (
            <>
                    <button className="text-gradient">
                <Link to="/resumes" className={"font-bold"}>
                        View Resumes
                    </Link>
                    </button>
            </>
        )}
      <Link to="/upload" className={"primary-button w-fit"}>Upload Resume</Link>
    </nav>
  );
};

export default Navbar;