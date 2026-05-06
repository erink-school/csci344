import { useEffect, useMemo, useState } from "react";
import {
  createReservation,
  createWishlistItem,
  getComputers,
} from "../api.js";
import BarChartComponent from "./BarChart.jsx";

export default function Homepage({ username }) {
  const [computers, setComputers] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadComputers() {
      try {
        const data = await getComputers();
        setComputers(data);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadComputers();
  }, []);

  const categories = useMemo(() => {
    const values = computers.map((c) => c.category);
    return ["All", ...new Set(values)];
  }, [computers]);

  const filtered = computers.filter((computer) => {
    const matchesSearch = computer.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || computer.category === category;

    return matchesSearch && matchesCategory;
  });

  async function handleWishlist(computer) {
    try {
      await createWishlistItem(computer.id, "Added from storefront");
      setMessage(`${computer.name} added to wishlist.`);
    } catch (err) {
      setMessage(err.message);
    }
  }

  async function handleReservation(computer) {
    try {
      await createReservation({
        customer_name: username,
        email: `${username}@example.com`,
        phone: "555-555-5555",
        status: "Pending",
        notes: `Reservation for ${computer.name}`,
        computer: computer.id,
      });

      setMessage(`Reservation created for ${computer.name}.`);
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="mb-8 rounded-2xl bg-white p-6 shadow">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Browse Computers
            </h2>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              placeholder="Search computers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded border border-slate-300 px-4 py-2"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded border border-slate-300 px-4 py-2"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {message ? (
        <div className="mb-6 rounded border border-blue-200 bg-blue-50 p-4 text-blue-700">
          {message}
        </div>
      ) : null}

      <section className="mb-8 rounded-2xl bg-white p-6 shadow">
        <h3 className="mb-4 text-xl font-semibold">Inventory Overview</h3>
        <BarChartComponent items={computers} />
      </section>

      {loading ? (
        <p className="text-slate-600">Loading computers...</p>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((computer) => (
            <article
              key={computer.id}
              className="overflow-hidden rounded-2xl bg-white shadow transition hover:scale-[1.01]"
            >
              <img
                src={computer.photo}
                alt={computer.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {computer.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {computer.brand?.name || "Unknown Brand"}
                    </p>
                  </div>

                  <span className="rounded bg-slate-100 px-3 py-1 text-sm font-medium">
                    ${computer.price}
                  </span>
                </div>

                <p className="mb-4 text-sm text-slate-600">
                  {computer.description}
                </p>

                <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-slate-700">
                  <div className="rounded bg-slate-50 p-2">
                    <strong>RAM:</strong> {computer.ram} GB
                  </div>

                  <div className="rounded bg-slate-50 p-2">
                    <strong>Storage:</strong> {computer.storage} GB
                  </div>

                  <div className="rounded bg-slate-50 p-2 col-span-2">
                    <strong>Processor:</strong> {computer.processor}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleWishlist(computer)}
                    className="flex-1 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                  >
                    Wishlist
                  </button>

                  <button
                    onClick={() => handleReservation(computer)}
                    className="flex-1 rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}