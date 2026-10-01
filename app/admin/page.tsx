"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type UtmValue = {
  id: string;
  kind: "campaign_name" | "event_name";
  label: string;
  value: string;
  active: boolean;
};

export default function AdminPage() {
  const [values, setValues] = useState<UtmValue[]>([]);
  const [loading, setLoading] = useState(true);

  const [kind, setKind] = useState<"campaign_name" | "event_name">(
    "campaign_name"
  );

  const [newValue, setNewValue] = useState("");
  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");

  async function loadValues() {
    setLoading(true);

    const { data, error } = await supabase
      .from("utm_values")
      .select("*")
      .order("kind")
      .order("label");

    if (error) {
      setMessage(error.message);
    } else {
      setValues(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadValues();
  }, []);

  async function addValue() {
    if (!newValue.trim()) return;

    const { error } = await supabase.from("utm_values").insert({
      kind,
      label: newValue,
      value: newValue,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setNewValue("");
    setMessage("Waarde toegevoegd.");
    await loadValues();
  }

  async function toggleValue(value: UtmValue) {
    const { error } = await supabase
      .from("utm_values")
      .update({
        active: !value.active,
      })
      .eq("id", value.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    await loadValues();
  }

  async function clearHistory() {
    const confirmed = window.confirm(
      "Alle gegenereerde URLs verwijderen?"
    );

    if (!confirmed) return;

    const { error } = await supabase.rpc(
      "admin_clear_generated_links"
    );

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Historiek leeggemaakt.");
  }

  const filteredValues = values.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="wrap">
      <div
        className="grid"
        style={{
          gridTemplateColumns: "2fr 1fr",
        }}
      >
        <section className="card">
          <h1>UTM beheer</h1>

          <div
            className="row"
            style={{
              marginBottom: 20,
            }}
          >
            <select
              value={kind}
              onChange={(e) =>
                setKind(
                  e.target.value as
                    | "campaign_name"
                    | "event_name"
                )
              }
            >
              <option value="campaign_name">
                Campaign Name
              </option>
              <option value="event_name">
                Event Name
              </option>
            </select>

            <input
              placeholder="Nieuwe waarde"
              value={newValue}
              onChange={(e) =>
                setNewValue(e.target.value)
              }
            />

            <button
              className="btn"
              onClick={addValue}
            >
              Toevoegen
            </button>
          </div>

          <div
            className="row"
            style={{
              marginBottom: 20,
            }}
          >
            <input
              placeholder="Zoeken..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <button
              className="btn secondary"
              onClick={loadValues}
            >
              Refresh
            </button>
          </div>

          {message && (
            <p
              style={{
                marginBottom: 20,
              }}
            >
              {message}
            </p>
          )}

          {loading ? (
            <p>Laden...</p>
          ) : (
            <table className="history">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Naam</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredValues.map((item) => (
                  <tr key={item.id}>
                    <td>{item.kind}</td>

                    <td>{item.label}</td>

                    <td>
                      {item.active ? (
                        <span
                          style={{
                            color: "#067647",
                            fontWeight: 600,
                          }}
                        >
                          Actief
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "#b42318",
                            fontWeight: 600,
                          }}
                        >
                          Inactief
                        </span>
                      )}
                    </td>

                    <td>
                      <button
                        className="btn secondary"
                        onClick={() =>
                          toggleValue(item)
                        }
                      >
                        {item.active
                          ? "Deactiveren"
                          : "Activeren"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </main>
  );
}
