"use client"

import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllusers } from "../features/complaints/ComplaintsSlice";
import Loading from "./Loading";

const PER_PAGE = 5;

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const Alluser = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message, allUsers } = useSelector(
    (state) => state.complaint
  );

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user?.token) {
      dispatch(getAllusers(user.token));
    }
  }, [dispatch, user]);

  const users = allUsers ? allUsers.filter((u) => !u.isAdmin) : [];

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
  if (isError) return <h2 className="text-center mt-10 text-red-500">{message}</h2>;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  function handleSort(key) {
    if (sortKey === key) setSortAsc((p) => !p);
    else { setSortKey(key); setSortAsc(true); }
    setPage(1);
  }

  const SortArrow = ({ col }) => (
    <span className="ml-1 text-xs">
      {sortKey === col ? (sortAsc ? "▲" : "▼") : <span className="text-gray-300">▲</span>}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">All Users</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage all registered users</p>
          </div>
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm w-64 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border px-5 py-4">
            <p className="text-xs text-gray-400">Total users</p>
            <p className="text-2xl font-semibold">{users.length}</p>
          </div>
          <div className="bg-white rounded-xl border px-5 py-4">
            <p className="text-xs text-gray-400">Showing</p>
            <p className="text-2xl font-semibold">{filtered.length}</p>
          </div>
          <div className="bg-white rounded-xl border px-5 py-4">
            <p className="text-xs text-gray-400">Page</p>
            <p className="text-2xl font-semibold">{currentPage} / {totalPages}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm table-fixed">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wide">
                <th
                  onClick={() => handleSort("name")}
                  className="w-[35%] px-5 py-3 text-left cursor-pointer hover:text-gray-800 select-none"
                >
                  Name <SortArrow col="name" />
                </th>
                <th
                  onClick={() => handleSort("email")}
                  className="w-[40%] px-5 py-3 text-left cursor-pointer hover:text-gray-800 select-none"
                >
                  Email <SortArrow col="email" />
                </th>
                <th
                  onClick={() => handleSort("createdAt")}
                  className="w-[25%] px-5 py-3 text-left cursor-pointer hover:text-gray-800 select-none"
                >
                  Joined <SortArrow col="createdAt" />
                </th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                paginated.map((u) => (
                  <tr
                    key={u._id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 flex-shrink-0">
                          {initials(u.name)}
                        </div>
                        <span className="truncate text-gray-800">{u.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-3 text-gray-500 truncate">{u.email}</td>

                    {/* Joined */}
                    <td className="px-5 py-3 text-gray-400 text-xs">{formatDate(u.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
          <p className="text-xs text-gray-400">
            {filtered.length === 0
              ? "No results"
              : `Showing ${(currentPage - 1) * PER_PAGE + 1}–${Math.min(currentPage * PER_PAGE, filtered.length)} of ${filtered.length} users`}
          </p>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-xs border transition-colors ${
                  currentPage === i + 1
                    ? "bg-gray-800 text-white border-gray-800"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
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