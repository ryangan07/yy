"use client";

import { useState } from "react";

const ADD = "__add_custom__";

const fieldClass =
  "w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink normal-case tracking-normal";

export function CreatableSelect({
  label,
  value,
  options,
  onChange,
  onAdd,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  onAdd: (v: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const list = value && !options.includes(value) ? [...options, value] : options;

  function commit() {
    const v = draft.trim();
    if (v) {
      onAdd(v);
      onChange(v);
    }
    setDraft("");
    setAdding(false);
  }

  return (
    <label className="flex flex-col gap-1">
      <span>{label}</span>
      {adding ? (
        <div className="flex gap-2">
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit();
              }
              if (e.key === "Escape") setAdding(false);
            }}
            placeholder={`New ${label.toLowerCase()}`}
            className={fieldClass}
          />
          <button type="button" onClick={commit} className="rounded bg-cta px-3 text-sm text-white">
            Add
          </button>
          <button type="button" onClick={() => setAdding(false)} className="px-2 text-sm text-muted">
            Cancel
          </button>
        </div>
      ) : (
        <select
          value={value}
          onChange={(e) => (e.target.value === ADD ? setAdding(true) : onChange(e.target.value))}
          className={fieldClass}
        >
          {list.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
          <option value={ADD}>+ Add custom…</option>
        </select>
      )}
    </label>
  );
}

export function CreatableChips({
  label,
  selected,
  options,
  onChange,
  onAdd,
}: {
  label: string;
  selected: string[];
  options: string[];
  onChange: (v: string[]) => void;
  onAdd: (v: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const all = Array.from(new Set([...options, ...selected]));

  function toggle(o: string) {
    onChange(selected.includes(o) ? selected.filter((s) => s !== o) : [...selected, o]);
  }

  function commit() {
    const v = draft.trim();
    if (!v) return;
    onAdd(v);
    if (!selected.includes(v)) onChange([...selected, v]);
    setDraft("");
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="font-sans text-xs uppercase tracking-[0.16em] text-muted">{label}</span>
      <div className="flex flex-wrap gap-2">
        {all.map((o) => {
          const on = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => toggle(o)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                on ? "border-ink bg-ink text-white" : "border-line text-body hover:border-ink"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
      <div className="flex max-w-sm gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit();
            }
          }}
          placeholder="+ Add custom amenity"
          className={fieldClass}
        />
        <button type="button" onClick={commit} className="rounded border border-ink px-3 text-sm text-ink">
          Add
        </button>
      </div>
    </div>
  );
}
