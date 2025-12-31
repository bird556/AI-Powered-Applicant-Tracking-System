import React, {useEffect, useState} from 'react';
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import Navbar from "~/components/Navbar";
import {Trash2} from "lucide-react";
const Resumes = () => {
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

    useEffect(() => {
      if(!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])

    useEffect(() => {
        const loadResumes = async () => {
            setLoadingResumes(true);

            const resumes = (await kv.list('resume:*', true)) as KVItem[];

            const parsedResumes = resumes?.map((resume) => (
                JSON.parse(resume.value) as Resume
            ))

            setResumes(parsedResumes || []);
            setLoadingResumes(false);
        }

        loadResumes()
    }, []);
    return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar />

        <section className="main-section">
            <div className="page-heading py-16">
                <h1>Track Your Applications & Resume Ratings</h1>
                {!loadingResumes && resumes?.length === 0 ? (
                    <h2>No resumes found. Upload your first resume to get feedback.</h2>
                ): (
                    <>
                    <h2>Review your submissions and check AI-powered feedback.</h2>
                        {!loadingResumes && (
                            <>

                                {/* Sign Out Button */}
                                <button className="auth-button mt-4 w-fit py-3 px-6 rounded-xl font-semibold text-white bg-gray-700 hover:bg-gray-800 active:scale-95 transition-all" onClick={auth.signOut} >
                                    <p>Log Out</p>
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={() => {
                                        navigate('/wipe');
                                    }}
                                    className={`cursor-pointer w-fit py-4 px-6 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 active:scale-95 shadow-lg
            `}
                                >
                                    <Trash2 className="w-5 h-5" />
                                    Wipe All App Data
                                </button>

                            </>
                        )}
                    </>
                )}
            </div>
            {loadingResumes && (
                <div className="flex flex-col items-center justify-center">
                    <img src="/images/resume-scan-2.gif" className="w-[200px]" />
                </div>
            )}

            {!loadingResumes && resumes.length > 0 && (
                <div className="resumes-section">
                    {resumes.map((resume) => (
                        <ResumeCard key={resume.id} resume={resume} isDemo={false}/>
                    ))}
                </div>
            )}

            {!loadingResumes && resumes?.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-10 gap-4">
                    <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                        Upload Resume
                    </Link>
                </div>
            )}

        </section>
    </main>
    );
};

export default Resumes;