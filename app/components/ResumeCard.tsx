import React from "react";
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { resume } from "react-dom/server";
const ResumeCard = ({resume: {id, companyName, resumePath, jobTitle, imagePath, feedback}}: {resume: Resume}) => {
  console.log("Resume Card", resume);
  return (
    <Link
      to="/resume/${resume.id}"
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="!text-black font-bold break-words">{companyName}</h2>
          <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full hfull">
          <img src={imagePath} alt="resume"
          className="w-full h-[350px] max-sm:h-[200px] object-cover" />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;