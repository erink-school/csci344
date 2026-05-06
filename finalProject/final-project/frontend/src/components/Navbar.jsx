export default function Navbar({ handleLogout, username }) {
  return (
    <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          E's Computer Store
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          Signed in as <strong>{username}</strong>
        </span>

        <button
          onClick={handleLogout}
          className="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}