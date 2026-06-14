import { useState, useEffect, useCallback } from 'react';
import { Search, RefreshCw, Download, Users, TrendingUp, Calendar, MessageSquare, LogOut, Eye, EyeOff, Trash2, RotateCcw } from 'lucide-react';

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'tinserv2025'; // change this

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRzsLMFea0FYkp6tj6ZR5meJhnEd1rL9v3RJDVPo2WCi6cQCMMkKVcxnhHJBbj1qTMsvbt4S5gEwkVl/pub?gid=0&single=true&output=csv';
// ─────────────────────────────────────────────────────────────────────────────

const DELETED_KEY = 'tinserv-deleted';

interface Registrant {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const DEMO_DATA: Registrant[] = [
  { timestamp: '14.06.2025 10:23:05', name: 'Ion Popescu', email: 'ion@example.com', phone: '+373 60 123 456', message: 'Vreau să mă înscriu ca voluntar pentru activitățile din weekend.' },
  { timestamp: '14.06.2025 09:15:30', name: 'Maria Ionescu', email: 'maria@example.com', phone: '+373 79 654 321', message: '' },
  { timestamp: '13.06.2025 16:40:12', name: 'Andrei Rusu', email: 'andrei@gmail.com', phone: '+373 60 111 222', message: 'Disponibil weekenduri și seara după ora 18.' },
  { timestamp: '12.06.2025 12:00:44', name: 'Elena Moraru', email: 'elena@yahoo.com', phone: '+40 722 333 444', message: 'Am experiență în domeniul educației și aș vrea să ajut.' },
  { timestamp: '11.06.2025 08:30:19', name: 'Vlad Ciobanu', email: 'vlad@gmail.com', phone: '+373 61 555 666', message: '' },
];

function rowKey(r: Registrant) {
  return `${r.email}::${r.timestamp}`;
}

function parseCSV(text: string): Registrant[] {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  return lines
    .slice(1)
    .filter(l => l.trim())
    .map(line => {
      const cols: string[] = [];
      let cur = '';
      let inQ = false;
      for (const ch of line) {
        if (ch === '"') { inQ = !inQ; continue; }
        if (ch === ',' && !inQ) { cols.push(cur); cur = ''; continue; }
        cur += ch;
      }
      cols.push(cur);
      // Sheet columns: name, email, phone, message, timestamp
      return {
        name:      cols[0]?.trim() ?? '',
        email:     cols[1]?.trim() ?? '',
        phone:     cols[2]?.trim() ?? '',
        message:   cols[3]?.trim() ?? '',
        timestamp: cols[4]?.trim() ?? '',
      };
    })
    .reverse();
}

// Parses "DD.MM.YYYY HH:MM:SS" → Date
function parseTimestamp(ts: string): Date {
  const [datePart, timePart = '00:00:00'] = ts.split(' ');
  const [day, month, year] = datePart.split('.');
  return new Date(`${year}-${month}-${day}T${timePart}`);
}

function isToday(ts: string) {
  const d = parseTimestamp(ts);
  const now = new Date();
  return d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
}

function isThisWeek(ts: string) {
  const d = parseTimestamp(ts);
  return d >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
}

function loadDeleted(): Set<string> {
  try {
    const raw = localStorage.getItem(DELETED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveDeleted(set: Set<string>) {
  localStorage.setItem(DELETED_KEY, JSON.stringify([...set]));
}

// ─── PASSWORD GATE ───────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [shake, setShake] = useState(false);

  function attempt() {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('tinserv-admin', '1');
      onLogin();
    } else {
      setShake(true);
      setPw('');
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 mb-1">
            <span className="text-brand-500 font-black text-xl tracking-tight">TIN</span>
            <span className="text-white font-black text-xl tracking-tight">SERV</span>
          </div>
          <div className="text-gray-600 text-xs font-mono tracking-[0.3em] uppercase">admin panel</div>
        </div>

        <div className={`border p-8 transition-all duration-100 ${shake ? 'border-red-500 translate-x-1' : 'border-gray-800'}`}>
          <label className="block text-[10px] text-gray-600 font-mono uppercase tracking-[0.25em] mb-2">
            Password
          </label>
          <div className="relative mb-5">
            <input
              type={showPw ? 'text' : 'password'}
              value={pw}
              onChange={e => setPw(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && attempt()}
              autoFocus
              className="w-full bg-gray-950 border border-gray-800 text-white font-mono px-4 py-3 pr-10 text-sm focus:outline-none focus:border-brand-500 transition-colors placeholder:text-gray-700"
              placeholder="••••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPw(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button
            onClick={attempt}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-black py-3 text-xs uppercase tracking-[0.2em] transition-colors"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('tinserv-admin') === '1');
  const [data, setData] = useState<Registrant[]>([]);
  const [deleted, setDeleted] = useState<Set<string>>(loadDeleted);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [isDemo, setIsDemo] = useState(false);
  const [search, setSearch] = useState('');
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    if (!SHEET_CSV_URL) {
      setData(DEMO_DATA);
      setIsDemo(true);
      setLastRefresh(new Date());
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(SHEET_CSV_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      setData(parseCSV(text));
      setIsDemo(false);
      setLastRefresh(new Date());
    } catch (e) {
      setFetchError(`Could not load data: ${e instanceof Error ? e.message : 'network error'}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  function logout() {
    sessionStorage.removeItem('tinserv-admin');
    setAuthed(false);
  }

  function deleteRow(key: string) {
    const next = new Set(deleted);
    next.add(key);
    setDeleted(next);
    saveDeleted(next);
    setConfirmDelete(null);
    setExpandedRow(null);
  }

  function restoreRow(key: string) {
    const next = new Set(deleted);
    next.delete(key);
    setDeleted(next);
    saveDeleted(next);
  }

  function restoreAll() {
    setDeleted(new Set());
    saveDeleted(new Set());
  }

  function exportCSV() {
    const visible = data.filter(r => !deleted.has(rowKey(r)));
    const header = ['Timestamp', 'Name', 'Email', 'Phone', 'Message'];
    const rows = [header, ...visible.map(r => [r.timestamp, r.name, r.email, r.phone, r.message])];
    const csv = rows.map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    a.download = `tinserv-registrants-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const visible = data.filter(r => !deleted.has(rowKey(r)));
  const hiddenRows = data.filter(r => deleted.has(rowKey(r)));

  const filtered = (showDeleted ? hiddenRows : visible).filter(r =>
    `${r.name} ${r.email} ${r.phone}`.toLowerCase().includes(search.toLowerCase())
  );

  const todayCount = visible.filter(r => isToday(r.timestamp)).length;
  const weekCount = visible.filter(r => isThisWeek(r.timestamp)).length;
  const withMsg = visible.filter(r => r.message).length;

  const stats = [
    { label: 'Total',     value: visible.length, icon: Users,         color: 'text-brand-500',  border: 'border-brand-500/30' },
    { label: 'Today',     value: todayCount,      icon: Calendar,      color: 'text-green-400',  border: 'border-green-400/30' },
    { label: 'This Week', value: weekCount,        icon: TrendingUp,    color: 'text-blue-400',   border: 'border-blue-400/30' },
    { label: 'With Note', value: withMsg,          icon: MessageSquare, color: 'text-purple-400', border: 'border-purple-400/30' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Topbar */}
      <header className="border-b border-gray-900 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-brand-500 font-black text-base tracking-tight">TINSERV</span>
          <span className="text-gray-700 font-mono text-sm">/admin</span>
          {isDemo && (
            <span className="text-[10px] bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-0.5 font-mono uppercase tracking-wide">
              demo
            </span>
          )}
        </div>
        <div className="flex items-center gap-5">
          {lastRefresh && (
            <span className="text-gray-700 text-xs font-mono hidden sm:block">
              {lastRefresh.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-1.5 text-gray-500 hover:text-white text-xs font-mono uppercase tracking-wide transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            refresh
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-gray-600 hover:text-red-400 text-xs font-mono uppercase tracking-wide transition-colors"
          >
            <LogOut className="w-3 h-3" />
            logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map(({ label, value, icon: Icon, color, border }) => (
            <div key={label} className={`border ${border} bg-gray-950 p-5`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 text-[10px] font-mono uppercase tracking-[0.2em]">{label}</span>
                <Icon className={`w-3.5 h-3.5 ${color} opacity-60`} />
              </div>
              <div className={`text-4xl font-black ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name, email, phone…"
              className="w-full bg-gray-950 border border-gray-800 text-white text-sm font-mono pl-9 pr-4 py-2.5 focus:outline-none focus:border-brand-500/60 transition-colors placeholder:text-gray-700"
            />
          </div>
          {hiddenRows.length > 0 && (
            <button
              onClick={() => { setShowDeleted(v => !v); setExpandedRow(null); }}
              className={`flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wide px-5 py-2.5 border transition-colors whitespace-nowrap ${
                showDeleted
                  ? 'border-red-500/40 text-red-400 bg-red-500/5'
                  : 'border-gray-800 text-gray-500 hover:border-red-500/30 hover:text-red-400'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              {showDeleted ? 'show active' : `deleted (${hiddenRows.length})`}
            </button>
          )}
          <button
            onClick={exportCSV}
            disabled={visible.length === 0}
            className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wide px-5 py-2.5 border border-gray-800 text-gray-500 hover:border-brand-500/50 hover:text-brand-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>

        {/* Error */}
        {fetchError && (
          <div className="border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-mono px-4 py-3">
            ✗ {fetchError}
          </div>
        )}

        {/* Deleted view banner */}
        {showDeleted && hiddenRows.length > 0 && (
          <div className="border border-red-500/20 bg-red-500/5 px-4 py-3 flex items-center justify-between">
            <span className="text-red-400 text-xs font-mono">{hiddenRows.length} hidden entries</span>
            <button
              onClick={restoreAll}
              className="flex items-center gap-1.5 text-red-400 hover:text-white text-xs font-mono uppercase tracking-wide transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              restore all
            </button>
          </div>
        )}

        {/* Table */}
        <div className="border border-gray-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b border-gray-900 bg-gray-950">
                  {['#', 'Timestamp', 'Name', 'Email', 'Phone', 'Message', ''].map((h, i) => (
                    <th key={i} className="text-left px-4 py-3 text-[10px] text-gray-600 uppercase tracking-[0.2em] font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && data.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-gray-700 text-xs">
                      Loading…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-gray-700 text-xs">
                      {search ? 'No results.' : showDeleted ? 'No deleted entries.' : 'No registrants yet.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((r, i) => {
                    const key = rowKey(r);
                    const isDeleted = deleted.has(key);
                    const isExpanded = expandedRow === i;
                    const isConfirming = confirmDelete === key;
                    return (
                      <>
                        <tr
                          key={key}
                          onClick={() => {
                            if (isConfirming) return;
                            if (r.message) setExpandedRow(isExpanded ? null : i);
                          }}
                          className={`border-b border-gray-900/80 transition-colors group ${
                            isDeleted ? 'opacity-40' : r.message && !isConfirming ? 'cursor-pointer hover:bg-gray-900/60' : 'hover:bg-gray-950'
                          }`}
                        >
                          <td className="px-4 py-3 text-gray-700 text-xs">{filtered.length - i}</td>
                          <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{r.timestamp}</td>
                          <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{r.name}</td>
                          <td className="px-4 py-3">
                            <a
                              href={`mailto:${r.email}`}
                              onClick={e => e.stopPropagation()}
                              className="text-brand-400 hover:text-brand-300 transition-colors"
                            >
                              {r.email}
                            </a>
                          </td>
                          <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                            {r.phone || <span className="text-gray-700">—</span>}
                          </td>
                          <td className="px-4 py-3 text-gray-500 max-w-xs">
                            {r.message ? (
                              <span className="flex items-center gap-1.5">
                                <MessageSquare className="w-3 h-3 text-purple-500 flex-shrink-0" />
                                <span className="truncate max-w-[200px]">{r.message}</span>
                              </span>
                            ) : (
                              <span className="text-gray-800">—</span>
                            )}
                          </td>
                          {/* Actions */}
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            {isDeleted ? (
                              <button
                                onClick={e => { e.stopPropagation(); restoreRow(key); }}
                                className="text-gray-600 hover:text-green-400 transition-colors"
                                title="Restore"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                            ) : isConfirming ? (
                              <span className="flex items-center justify-end gap-2">
                                <button
                                  onClick={e => { e.stopPropagation(); deleteRow(key); }}
                                  className="text-red-400 hover:text-red-300 text-[10px] uppercase tracking-wide font-bold transition-colors"
                                >
                                  confirm
                                </button>
                                <button
                                  onClick={e => { e.stopPropagation(); setConfirmDelete(null); }}
                                  className="text-gray-600 hover:text-gray-400 text-[10px] uppercase tracking-wide transition-colors"
                                >
                                  cancel
                                </button>
                              </span>
                            ) : (
                              <button
                                onClick={e => { e.stopPropagation(); setConfirmDelete(key); }}
                                className="text-gray-800 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                        {isExpanded && r.message && !isConfirming && (
                          <tr key={`${key}-exp`} className="border-b border-gray-900/80 bg-gray-950/50">
                            <td colSpan={7} className="px-4 py-3">
                              <div className="ml-[calc(3rem+16px)] border-l-2 border-purple-500/30 pl-4 text-gray-400 text-xs leading-relaxed">
                                {r.message}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2.5 border-t border-gray-900 flex items-center justify-between text-[10px] text-gray-700 font-mono">
            <span>
              {showDeleted
                ? `${hiddenRows.length} deleted entries`
                : `${filtered.length} of ${visible.length} registrants${hiddenRows.length > 0 ? ` · ${hiddenRows.length} hidden` : ''}`
              }
            </span>
            {isDemo && <span className="text-yellow-600/60">demo data</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
