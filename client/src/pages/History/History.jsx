import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  Search,
  History as HistoryIcon,
  ShieldCheck,
  TriangleAlert,
  AlertCircle,
  CalendarDays,
  Leaf,
  Eye,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import Container from "../../components/common/Container";

export default function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/history");
        setHistory(res.data.data || []);
      } catch {
        setError("Failed to load history.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredHistory = history.filter((item) => {
    const matchesSearch = `${item.cropName} ${item.diseaseName}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSeverity =
      severityFilter === "All" ||
      item.severity?.toLowerCase() === severityFilter.toLowerCase();

    return matchesSearch && matchesSeverity;
  });

  const totalScans = history.length;
  const lowCount = history.filter(
    (i) => i.severity?.toLowerCase() === "low",
  ).length;
  const mediumCount = history.filter(
    (i) => i.severity?.toLowerCase() === "medium",
  ).length;
  const highCount = history.filter(
    (i) => i.severity?.toLowerCase() === "high",
  ).length;

  if (loading)
    return (
      <section className="page-atmosphere flex min-h-screen items-center justify-center pt-32">
        Loading...
      </section>
    );
  if (error)
    return (
      <section className="page-atmosphere flex min-h-screen flex-col items-center justify-center gap-4 pt-32">
        <p className="text-red-600">{error}</p>
        <Link to="/dashboard" className="text-green-700 hover:underline">
          Back to Dashboard
        </Link>
      </section>
    );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this scan?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/history/${id}`);

      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete history.");
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/history/${selectedId}`);

      setHistory((prev) => prev.filter((item) => item._id !== selectedId));

      setShowDeleteModal(false);
      setSelectedId(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete history.");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  return (
    <section className="page-atmosphere min-h-screen pb-16 pt-32">
      <Container>
        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-green-700"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <h1 className="mb-8 font-[Manrope] text-4xl font-bold text-gray-900">
          Crop History
        </h1>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm flex justify-between">
            <div>
              <p>Total Scans</p>
              <h2 className="text-3xl font-bold">{totalScans}</h2>
            </div>
            <HistoryIcon />
          </div>
          <div className="rounded-2xl border bg-green-50 p-5 shadow-sm flex justify-between">
            <div>
              <p>Low Risk</p>
              <h2 className="text-3xl font-bold">{lowCount}</h2>
            </div>
            <ShieldCheck />
          </div>
          <div className="rounded-2xl border bg-yellow-50 p-5 shadow-sm flex justify-between">
            <div>
              <p>Medium Risk</p>
              <h2 className="text-3xl font-bold">{mediumCount}</h2>
            </div>
            <AlertCircle />
          </div>
          <div className="rounded-2xl border bg-red-50 p-5 shadow-sm flex justify-between">
            <div>
              <p>High Risk</p>
              <h2 className="text-3xl font-bold">{highCount}</h2>
            </div>
            <TriangleAlert />
          </div>
        </div>

        <div className="relative mb-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crop or disease..."
            className="w-full rounded-2xl border py-3 pl-11 pr-4"
          />
        </div>

        <div className="mb-6 flex gap-3 flex-wrap">
          {["All", "Low", "Medium", "High"].map((level) => (
            <button
              key={level}
              onClick={() => setSeverityFilter(level)}
              className={`rounded-xl px-4 py-2 ${severityFilter === level ? "bg-green-600 text-white" : "border bg-white"}`}
            >
              {level}
            </button>
          ))}
        </div>

        <p className="mb-6 text-gray-500">
          Showing {filteredHistory.length} of {history.length} scans
        </p>

        {filteredHistory.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <Leaf className="mx-auto mb-4 text-green-600" size={42} />
            <h2 className="text-2xl font-bold">No matching records</h2>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredHistory.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-xl bg-green-100 p-3">
                    <Leaf className="text-green-700" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl">{item.cropName}</h2>
                    <p className="text-sm text-gray-500">{item.diseaseName}</p>
                  </div>
                </div>

                <div className="flex justify-between mb-3">
                  <span className="text-sm">{item.severity}</span>
                  <span>{item.confidence}%</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <CalendarDays size={16} />
                  {new Date(item.createdAt || item.detectedOn).toLocaleString()}
                </div>

                <p className="line-clamp-3 text-sm text-gray-600">
                  {item.explanation}
                </p>
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => navigate("/result", { state: item })}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-white hover:bg-green-700 transition"
                  >
                    <Eye size={18} />
                    View Report
                  </button>

                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-fadeIn">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="text-red-600" size={30} />
            </div>

            <h2 className="mt-5 text-center text-2xl font-bold text-gray-800">
              Delete Scan?
            </h2>

            <p className="mt-3 text-center text-gray-500">
              This action cannot be undone.
              <br />
              The scan will be permanently deleted.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={cancelDelete}
                className="flex-1 rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
              >
                Delete Scan
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
