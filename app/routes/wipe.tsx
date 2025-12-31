import { useEffect, useState } from "react";
import {useNavigate} from "react-router";
import { usePuterStore } from "~/lib/puter";
import { ArrowLeft, AlertTriangle, File, Trash2, User } from "lucide-react"; // Optional: remove if you don't want lucide

type FSItem = {
    id: string;
    name: string;
    path: string;
};

const WipeApp = () => {
    const { auth, isLoading, error, fs, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [deleting, setDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const loadFiles = async () => {
        try {
            const files = (await fs.readDir("./")) as FSItem[];
            setFiles(files.filter((f) => f.name !== "." && f.name !== "..")); // filter out . and ..
        } catch (err) {
            console.error("Failed to load files:", err);
        }
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading, auth.isAuthenticated, navigate]);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await Promise.all(files.map((file) => fs.delete(file.path)));
            await kv.flush();
            await loadFiles();
            setShowConfirm(false);
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Some files could not be deleted.");
        } finally {
            setDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-lg text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-red-600 text-lg">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Back Button */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="cursor-pointer flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </button>

                    <div className="flex items-center gap-3 text-gray-700">
                        <User className="w-5 h-5" />
                        <span className="font-medium">{auth.user?.username}</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Wipe App Data</h1>
                    <p className="text-gray-600 mb-8">
                        This will permanently delete all files and clear stored app data. This action cannot be undone.
                    </p>

                    {/* Files List */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <File className="w-5 h-5 text-blue-600" />
                            Existing Files ({files.length})
                        </h2>

                        {files.length === 0 ? (
                            <p className="text-gray-500 italic py-8 text-center">No files found.</p>
                        ) : (
                            <div className="bg-gray-50 rounded-xl p-6 max-h-96 overflow-y-auto border border-gray-200">
                                <ul className="space-y-3">
                                    {files.map((file) => (
                                        <li
                                            key={file.id}
                                            className="flex items-center justify-between py-3 px-4 bg-white rounded-lg shadow-sm border border-gray-100"
                                        >
                      <span className="font-medium text-gray-800 truncate max-w-md">
                        {file.name}
                      </span>
                                            <span className="text-sm text-gray-500">{file.path}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={() => setShowConfirm(true)}
                        disabled={deleting || files.length === 0}
                        className={`cursor-pointer w-full py-4 px-6 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-3
              ${
                            files.length === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700 active:scale-95 shadow-lg"
                        }
              ${deleting ? "opacity-80 cursor-wait" : ""}
            `}
                    >
                        <Trash2 className="w-5 h-5" />
                        {deleting ? "Deleting..." : "Wipe All App Data"}
                    </button>
                </div>
            </main>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                        <div className="flex items-center gap-4 mb-6 text-red-600">
                            <AlertTriangle className="w-10 h-10" />
                            <h3 className="text-2xl font-bold">Confirm Deletion</h3>
                        </div>

                        <p className="text-gray-700 mb-8">
                            Are you sure you want to delete <strong>{files.length}</strong> file(s) and clear all app data?
                            This action is <strong>permanent</strong>.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="cursor-pointer flex-1 py-3 px-6 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold text-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="cursor-pointer flex-1 py-3 px-6 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-80"
                            >
                                {deleting ? "Deleting..." : "Yes, Delete Everything"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WipeApp;