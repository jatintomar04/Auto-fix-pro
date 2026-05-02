"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllusers } from "../features/complaints/ComplaintsSlice";
import Loading from "./Loading";

const PER_PAGE = 5;

// Helpers
const initials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const AllUsers = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message, allUsers } = useSelector(
    (state) => state.complaint
  );

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);

  // Fetch users
  useEffect(() => {
    if (user?.token) {
      dispatch(getAllusers(user.token));
    }
  }, [dispatch, user]);

  // Remove admins
  const users = allUsers ? allUsers.filter((u) => !u.isAdmin) : [];

  // Filter + Sort
  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return users
      .filter(
        (u) =>
          u.name?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const va = a[sortKey];
        const vb = b[sortKey];

        if (sortKey === "createdAt") {
          return sortAsc
            ? new Date(va) - new Date(vb)
            : new Date(vb) - new Date(va);
        }

        return sortAsc
          ? String(va).localeCompare(String(vb))
          : String(vb).localeCompare(String(va));
      });
  }, [search, sortKey, sortAsc, users]);

  if (isLoading) return <Loading />;
  if (isError)
    return <h2 className="text-center mt-10 text-red-500">{message}</h2>;

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
    setPage(1);
  };

  const SortArrow = ({ col }) => (
    <span className="ml-1 text-xs">
      {sortKey === col ? (sortAsc ? "▲" : "▼") : "⇅"}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">All Users</h1>
            <p className="text-sm text-gray-500">
              Manage all registered users
            </p>
          </div>

          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border px-4 py-2 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-gray-400 text-xs">Total Users</p>
            <p className="text-xl font-bold">{users.length}</p>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-gray-400 text-xs">Filtered</p>
            <p className="text-xl font-bold">{filtered.length}</p>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-gray-400 text-xs">Page</p>
            <p className="text-xl font-bold">
              {currentPage} / {totalPages}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th
                  onClick={() => handleSort("name")}
                  className="p-3 cursor-pointer"
                >
                  Name <SortArrow col="name" />
                </th>

                <th
                  onClick={() => handleSort("email")}
                  className="p-3 cursor-pointer"
                >
                  Email <SortArrow col="email" />
                </th>

                <th
                  onClick={() => handleSort("createdAt")}
                  className="p-3 cursor-pointer"
                >
                  Joined <SortArrow col="createdAt" />
                </th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                paginated.map((u) => (
                  <tr key={u._id} className="border-t hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                        {initials(u.name)}
                      </div>
                      {u.name}
                    </td>

                    <td className="p-3 text-gray-600">{u.email}</td>

                    <td className="p-3 text-gray-500 text-xs">
                      {formatDate(u.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 flex-wrap gap-3">
          <p className="text-xs text-gray-500">
            Showing{" "}
            {(currentPage - 1) * PER_PAGE + 1}–
            {Math.min(currentPage * PER_PAGE, filtered.length)} of{" "}
            {filtered.length}
          </p>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded border text-sm ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AllUsers;