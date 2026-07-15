/* @ds-bundle: {"format":3,"namespace":"AptienDesignSystem_1b525c","components":[],"sourceHashes":{"ui_kits/app/app.jsx":"4b6f87f67ed3","ui_kits/app/screens.jsx":"35324befb78c","ui_kits/app/shell.jsx":"b8817c43fd84","ui_kits/app/ui.jsx":"0bd00db7c277"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AptienDesignSystem_1b525c = window.AptienDesignSystem_1b525c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/app/app.jsx
try { (() => {
/* Aptien Product UI — main app: nav state + screen routing. */
const {
  useState: useStateApp
} = React;
function SettingsScreen() {
  const [emailNotif, setEmailNotif] = useStateApp(true);
  const [weekly, setWeekly] = useStateApp(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "Settings",
    sub: "Workspace preferences and notifications."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid #ECECEC",
      borderRadius: 10,
      padding: 24,
      boxShadow: "0 0 10px rgba(0,0,0,.06)",
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Notifications"), /*#__PURE__*/React.createElement(Row, {
    label: "Email notifications",
    desc: "Get notified when a task or revision is due.",
    on: emailNotif,
    set: () => setEmailNotif(v => !v)
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Weekly digest",
    desc: "A Monday summary of everything across your workspace.",
    on: weekly,
    set: () => setWeekly(v => !v)
  }), /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginTop: 28
    }
  }, "Workspace"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 0"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: "AP",
    color: "#1572e8",
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 700,
      fontSize: 14
    }
  }, "Aptien Demo s.r.o."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 12,
      color: "#878787"
    }
  }, "14 users \xB7 Growth plan")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Manage"))));
}
function Row({
  label,
  desc,
  on,
  set
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "12px 0",
      borderBottom: "1px solid #F6F6F6"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 600,
      fontSize: 14,
      color: "#1a1a1a"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 12,
      color: "#878787"
    }
  }, desc)), /*#__PURE__*/React.createElement(Switch, {
    on: on,
    onClick: set
  }));
}
function App() {
  const [nav, setNav] = useStateApp("dashboard");
  const [record, setRecord] = useStateApp(null);
  const [adding, setAdding] = useStateApp(false);
  let screen;
  if (nav === "dashboard") screen = /*#__PURE__*/React.createElement(Dashboard, {
    onOpenModule: setNav
  });else if (nav === "settings") screen = /*#__PURE__*/React.createElement(SettingsScreen, null);else screen = /*#__PURE__*/React.createElement(ListView, {
    moduleId: nav,
    onOpenRecord: setRecord,
    onAdd: () => setAdding(true)
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      background: "#f9f9fb"
    }
  }, /*#__PURE__*/React.createElement(TopBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      minHeight: 0,
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: nav,
    onNav: setNav
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      overflowY: "auto",
      padding: "32px 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 960
    }
  }, screen)), /*#__PURE__*/React.createElement(RecordDrawer, {
    record: record,
    onClose: () => setRecord(null)
  }), /*#__PURE__*/React.createElement(AddModal, {
    open: adding,
    onClose: () => setAdding(false)
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/screens.jsx
try { (() => {
/* Aptien Product UI — screens: Dashboard, ListView, RecordDrawer, AddModal. */
const {
  useState: useStateScr
} = React;

/* ---------- Sample data ---------- */
const PEOPLE = [{
  id: 1,
  name: "Jana Nováková",
  role: "Office Manager",
  dept: "Operations",
  init: "JN",
  color: "#2962FF",
  status: "ok",
  tags: ["Full-time", "HQ Prague"]
}, {
  id: 2,
  name: "Petr Kovář",
  role: "IT Technician",
  dept: "IT",
  init: "PK",
  color: "#00C853",
  status: "warning",
  tags: ["Full-time", "Remote"]
}, {
  id: 3,
  name: "Lucie Marková",
  role: "HR Specialist",
  dept: "People",
  init: "LM",
  color: "#00B8D4",
  status: "ok",
  tags: ["Part-time"]
}, {
  id: 4,
  name: "Tomáš Dvořák",
  role: "Facility Lead",
  dept: "Facility",
  init: "TD",
  color: "#C51162",
  status: "overdue",
  tags: ["Full-time", "HQ Brno"]
}, {
  id: 5,
  name: "Eva Horáková",
  role: "Accountant",
  dept: "Finance",
  init: "EH",
  color: "#AA00FF",
  status: "ok",
  tags: ["Full-time"]
}, {
  id: 6,
  name: "Martin Beneš",
  role: "Sales Rep",
  dept: "Sales",
  init: "MB",
  color: "#FF6D00",
  status: "warning",
  tags: ["Full-time", "Remote"]
}];

/* ---------- Dashboard (tiles) ---------- */
function Dashboard({
  onOpenModule
}) {
  const tiles = MODULES.filter(m => m.id !== "dashboard");
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "Good morning, Jana",
    sub: "Here's what's happening across your workspace today."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      flexWrap: "wrap",
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    icon: "list-check",
    color: "#FFAB00",
    big: "9",
    label: "Tasks due this week"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "screwdriver-wrench",
    color: "#00B8D4",
    big: "3",
    label: "Revisions overdue"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "user-plus",
    color: "#304FFE",
    big: "2",
    label: "New hires onboarding"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "box",
    color: "#00C853",
    big: "340",
    label: "Assets tracked"
  })), /*#__PURE__*/React.createElement(SectionLabel, null, "Sections"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 16
    }
  }, tiles.map(m => /*#__PURE__*/React.createElement("a", {
    key: m.id,
    onClick: () => onOpenModule(m.id),
    style: tileStyle,
    onMouseEnter: e => {
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,.10)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow = "none";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
      boxShadow: "0 2px 8px rgba(0,0,0,.06)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: m.icon,
    style: {
      fontSize: 26,
      color: "#1572e8"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 700,
      fontSize: 15,
      color: "#1a1a1a"
    }
  }, m.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 12,
      color: "#878787"
    }
  }, m.count, " records")))));
}
const tileStyle = {
  width: 168,
  minHeight: 150,
  borderRadius: 18,
  padding: "22px 16px 18px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  background: "rgba(125,144,166,.08)",
  cursor: "pointer",
  transition: "all .18s",
  textDecoration: "none"
};
function StatCard({
  icon,
  color,
  big,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 180px",
      background: "#fff",
      border: "1px solid #ECECEC",
      borderRadius: 10,
      padding: "18px 20px",
      boxShadow: "0 0 10px rgba(0,0,0,.06)",
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 10,
      background: color + "1f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    style: {
      color,
      fontSize: 18
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 900,
      fontSize: 26,
      color: "#1a1a1a",
      lineHeight: 1
    }
  }, big), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 12,
      color: "#878787",
      marginTop: 3
    }
  }, label)));
}

/* ---------- List view (People) ---------- */
function ListView({
  moduleId,
  onOpenRecord,
  onAdd
}) {
  const mod = MODULES.find(m => m.id === moduleId) || MODULES[1];
  const [q, setQ] = useStateScr("");
  const [tab, setTab] = useStateScr("all");
  const [sel, setSel] = useStateScr([]);
  const rows = PEOPLE.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.role.toLowerCase().includes(q.toLowerCase()));
  const tabs = [["all", "All people", PEOPLE.length], ["active", "Active", 5], ["onboarding", "Onboarding", 2]];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: mod.label,
    sub: "Manage records, owners, tags and deadlines in one place.",
    action: /*#__PURE__*/React.createElement(Button, {
      icon: "plus",
      onClick: onAdd
    }, "Add new")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: q,
    onChange: setQ,
    placeholder: "Search people\u2026"
  }), /*#__PURE__*/React.createElement(FilterBtn, {
    icon: "filter",
    label: "Department"
  }), /*#__PURE__*/React.createElement(FilterBtn, {
    icon: "tag",
    label: "Tags"
  }), /*#__PURE__*/React.createElement(FilterBtn, {
    icon: "arrow-down-wide-short",
    label: "Sort"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 0,
      alignItems: "flex-end",
      borderBottom: "1px solid #ECECEC",
      marginBottom: 0
    }
  }, tabs.map(([id, label, n]) => {
    const on = tab === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => setTab(id),
      style: {
        height: 40,
        padding: "0 18px",
        border: "none",
        background: "none",
        cursor: "pointer",
        fontFamily: "Nunito, sans-serif",
        fontSize: 13,
        fontWeight: on ? 700 : 600,
        color: on ? "#1572e8" : "#263238",
        borderBottom: on ? "2px solid #1572e8" : "2px solid transparent",
        marginBottom: -1,
        display: "inline-flex",
        alignItems: "center",
        gap: 7
      }
    }, label, /*#__PURE__*/React.createElement("span", {
      style: {
        background: on ? "#1572e8" : "#ECECEC",
        color: on ? "#fff" : "#878787",
        borderRadius: 10,
        fontSize: 10,
        padding: "1px 7px",
        fontWeight: 700
      }
    }, n));
  })), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "Nunito, sans-serif",
      fontSize: 13,
      background: "#fff",
      boxShadow: "0 0 10px rgba(0,0,0,.06)",
      borderRadius: "0 0 10px 10px",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: thStyle
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    style: thStyle
  }, "Role"), /*#__PURE__*/React.createElement("th", {
    style: thStyle
  }, "Department"), /*#__PURE__*/React.createElement("th", {
    style: thStyle
  }, "Tags"), /*#__PURE__*/React.createElement("th", {
    style: thStyle
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id,
    onClick: () => onOpenRecord(p),
    style: {
      cursor: "pointer"
    },
    onMouseEnter: e => e.currentTarget.style.background = "rgba(21,114,232,.03)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("td", {
    style: tdStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: p.init,
    color: p.color
  }), " ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 700,
      color: "#1a1a1a"
    }
  }, p.name))), /*#__PURE__*/React.createElement("td", {
    style: tdStyle
  }, p.role), /*#__PURE__*/React.createElement("td", {
    style: tdStyle
  }, p.dept), /*#__PURE__*/React.createElement("td", {
    style: tdStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 4
    }
  }, p.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t)))), /*#__PURE__*/React.createElement("td", {
    style: tdStyle
  }, /*#__PURE__*/React.createElement(DeadlineBadge, {
    kind: p.status
  })))), rows.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 5,
    style: {
      ...tdStyle,
      textAlign: "center",
      color: "#878787",
      padding: 32
    }
  }, "No people match \"", q, "\".")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 4px",
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontSize: 12,
      color: "#878787"
    }
  }, "Showing 1\u2013", rows.length, " of ", PEOPLE.length), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, ["chevron-left", "1", "2", "3", "chevron-right"].map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    style: {
      minWidth: 32,
      height: 32,
      borderRadius: 4,
      border: "1px solid transparent",
      background: p === "1" ? "#1572e8" : "#F6F6F6",
      color: p === "1" ? "#fff" : "#1a1a1a",
      fontFamily: "Nunito, sans-serif",
      fontWeight: 700,
      fontSize: 12,
      cursor: "pointer"
    }
  }, p.includes("chevron") ? /*#__PURE__*/React.createElement(Icon, {
    name: p
  }) : p)))));
}
function FilterBtn({
  icon,
  label
}) {
  return /*#__PURE__*/React.createElement("button", {
    style: {
      background: "#a4a4a4",
      border: "none",
      borderRadius: 4,
      height: 30,
      padding: "5px 14px",
      fontSize: 12,
      fontFamily: "Nunito, sans-serif",
      fontWeight: 600,
      color: "#fff",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    style: {
      fontSize: 11
    }
  }), " ", label, " ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    style: {
      fontSize: 8
    }
  }));
}

/* ---------- Record drawer ---------- */
function RecordDrawer({
  record,
  onClose
}) {
  if (!record) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,.12)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 420,
      maxWidth: "90%",
      height: "100%",
      background: "#fff",
      boxShadow: "-10px 0 30px rgba(0,0,0,.18)",
      padding: 28,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      position: "absolute",
      top: 16,
      right: 16,
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 18,
      color: "#878787"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "xmark"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: record.init,
    color: record.color,
    size: 56
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontSize: 20,
      fontWeight: 800,
      color: "#1a1a1a",
      margin: 0
    }
  }, record.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 13,
      color: "#878787"
    }
  }, record.role))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      flexWrap: "wrap",
      margin: "12px 0 22px"
    }
  }, record.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    variant: "blue",
    icon: "tag"
  }, t)), /*#__PURE__*/React.createElement(DeadlineBadge, {
    kind: record.status
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Department",
    value: record.dept
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    value: record.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, ".") + "@aptien.com"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Phone",
    value: "+420 776 123 456"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Office",
    value: "HQ Prague \xB7 Floor 3"
  }), /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginTop: 24
    }
  }, "Assigned equipment"), /*#__PURE__*/React.createElement(DocRow, {
    icon: "laptop",
    title: "MacBook Pro 14\u2033",
    meta: "Asset #A-2231 \xB7 assigned 12 Jan 2026"
  }), /*#__PURE__*/React.createElement(DocRow, {
    icon: "mobile-screen",
    title: "iPhone 15",
    meta: "Asset #A-2310 \xB7 assigned 12 Jan 2026"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    icon: "pen",
    variant: "primary"
  }, "Edit"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    icon: "envelope"
  }, "Message"))));
}
function Field({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 700,
      fontSize: 11,
      color: "#878787",
      textTransform: "uppercase",
      letterSpacing: ".05em",
      marginBottom: 3
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 14,
      color: "#1a1a1a"
    }
  }, value));
}
function DocRow({
  icon,
  title,
  meta
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: 8,
      padding: "10px 14px",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    style: {
      color: "#1572e8",
      fontSize: 16
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontSize: 14,
      fontWeight: 600,
      color: "#1a1a1a"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 12,
      color: "#888"
    }
  }, meta)));
}

/* ---------- Add modal ---------- */
function AddModal({
  open,
  onClose
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 70,
      background: "rgba(0,0,0,.5)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingTop: 70
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F8F9FD",
      borderRadius: 16,
      boxShadow: "0 14px 40px rgba(0,0,0,.25)",
      width: 460,
      maxWidth: "92%",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 22px 6px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontSize: 18,
      fontWeight: 700,
      color: "#2a2f5b",
      margin: 0
    }
  }, "Add person"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#5b6770",
      fontSize: 22
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "xmark"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 22px 22px"
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Full name",
    placeholder: "e.g. Jana Nov\xE1kov\xE1",
    required: true
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "Role",
    placeholder: "e.g. Office Manager"
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "Department",
    placeholder: "Select department\u2026",
    select: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: btnBs("#5f6366")
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: btnBs("#1572e8")
  }, "Save")))));
}
const btnBs = bg => ({
  border: "1px solid " + bg,
  background: bg,
  color: "#fff",
  borderRadius: 17,
  padding: "7px 26px",
  fontFamily: "Roboto, Arial, sans-serif",
  fontWeight: 700,
  fontSize: 12,
  textTransform: "uppercase",
  cursor: "pointer"
});
function FormField({
  label,
  placeholder,
  required,
  select
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      marginBottom: 6,
      fontFamily: "Nunito, sans-serif",
      fontWeight: 600,
      fontSize: 12,
      color: "#1a1a1a"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#dc3545",
      marginLeft: 2
    }
  }, "*")), select ? /*#__PURE__*/React.createElement("select", {
    style: inputCtrl
  }, /*#__PURE__*/React.createElement("option", null, placeholder), /*#__PURE__*/React.createElement("option", null, "Operations"), /*#__PURE__*/React.createElement("option", null, "IT"), /*#__PURE__*/React.createElement("option", null, "People")) : /*#__PURE__*/React.createElement("input", {
    placeholder: placeholder,
    style: inputCtrl
  }));
}
const inputCtrl = {
  width: "100%",
  padding: "8px 13px",
  fontFamily: "Open Sans, sans-serif",
  fontSize: 13,
  color: "#1a1a1a",
  background: "#fff",
  border: "1px solid #e5e5e5",
  borderRadius: 4,
  outline: "none",
  boxSizing: "border-box"
};

/* ---------- Shared layout bits ---------- */
function PageHead({
  title,
  sub,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 22,
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 800,
      fontSize: 26,
      color: "#1a1a1a",
      margin: 0
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 13,
      color: "#878787",
      margin: "5px 0 0"
    }
  }, sub)), action);
}
function SectionLabel({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontSize: 11,
      fontWeight: 700,
      color: "#878787",
      textTransform: "uppercase",
      letterSpacing: ".08em",
      marginBottom: 14,
      ...style
    }
  }, children);
}
const thStyle = {
  textAlign: "left",
  fontFamily: "Nunito, sans-serif",
  fontWeight: 700,
  color: "#1a1a1a",
  padding: "0 20px",
  height: 52,
  borderBottom: "2px solid #ebedf2",
  fontSize: 12,
  whiteSpace: "nowrap"
};
const tdStyle = {
  padding: "0 20px",
  height: 58,
  borderBottom: "1px solid #ebedf2",
  color: "#1a1a1a",
  verticalAlign: "middle"
};
Object.assign(window, {
  Dashboard,
  ListView,
  RecordDrawer,
  AddModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/shell.jsx
try { (() => {
/* Aptien Product UI — app shell: TopBar + Sidebar + module model. */
const {
  useState: useStateShell
} = React;
const MODULES = [{
  id: "dashboard",
  label: "Dashboard",
  icon: "table-cells-large"
}, {
  id: "people",
  label: "People",
  icon: "users",
  count: 128
}, {
  id: "assets",
  label: "Assets",
  icon: "box",
  count: 340
}, {
  id: "documents",
  label: "Documents",
  icon: "folder-open",
  count: 52
}, {
  id: "tasks",
  label: "Tasks",
  icon: "list-check",
  count: 9
}, {
  id: "equipment",
  label: "Equipment",
  icon: "laptop",
  count: 76
}, {
  id: "revisions",
  label: "Revisions",
  icon: "screwdriver-wrench",
  count: 14
}];
function TopBar({
  onMenu
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#1572e8",
      color: "#fff",
      padding: "0 24px",
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",
      zIndex: 50,
      boxShadow: "0 0 10px rgba(0,0,0,.10)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "26",
    viewBox: "230 195 410 480",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M626.89,540.06c3.76,8.29,5.85,17.5,5.85,27.19c0,17.45-6.75,33.31-17.8,45.1l-0.3,0.33c-31.13,34.75-99.18,57.37-178.12,57.37c-78.1,0-145.55-22.14-177.12-56.26l-0.12-0.14c-5.84-5.9-10.58-12.9-13.87-20.67c-2.11-4.97-3.62-10.26-4.46-15.76c-0.49-3.25-0.75-6.58-0.75-9.96c0-11.18,2.78-21.7,7.69-30.93l1.16-2.34l127.01-254.63l1.12-2.25c10.71-21.93,33.24-37.03,59.29-37.03c26.21,0,48.85,15.29,59.48,37.43c0.11,0.23,0.22,0.46,0.33,0.69l0.77,1.55l129.64,259.87L626.89,540.06z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    opacity: ".7",
    d: "M369.46,588.12L488.33,349.8l7.84-15.72c4-8.51,6.23-18.02,6.23-28.06c0-36.42-29.53-65.95-65.95-65.95c-26.05,0-48.57,15.1-59.29,37.03l-1.12,2.25L249.05,533.98l-1.16,2.34c-4.91,9.22-7.69,19.75-7.69,30.93c0,36.42,29.53,65.95,65.95,65.95c25.76,0,48.02-14.71,58.88-36.17L369.46,588.12z"
  }), /*#__PURE__*/React.createElement("circle", {
    fill: "#FFC600",
    cx: "567.52",
    cy: "568.13",
    r: "65.95"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 800,
      fontSize: 18,
      letterSpacing: ".02em"
    }
  }, "aptien")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      maxWidth: 360,
      margin: "0 28px"
    }
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: "",
    onChange: () => {},
    placeholder: "Search everything\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    style: {
      fontSize: 16,
      opacity: .9,
      cursor: "pointer"
    }
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "circle-question",
    style: {
      fontSize: 16,
      opacity: .9,
      cursor: "pointer"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: "JN",
    color: "#2962FF",
    size: 30
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 600,
      fontSize: 13
    }
  }, "Jana N."))));
}
function Sidebar({
  active,
  onNav
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      width: 212,
      background: "#fff",
      borderRight: "1px solid #ECECEC",
      padding: "18px 12px",
      flexShrink: 0,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontSize: 10,
      fontWeight: 700,
      color: "#878787",
      textTransform: "uppercase",
      letterSpacing: ".08em",
      padding: "0 12px",
      marginBottom: 8
    }
  }, "Workspace"), MODULES.map(m => {
    const on = active === m.id;
    return /*#__PURE__*/React.createElement("a", {
      key: m.id,
      onClick: () => onNav(m.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 12px",
        borderRadius: 6,
        color: on ? "#1572e8" : "#555",
        fontFamily: "Nunito, sans-serif",
        fontSize: 13,
        fontWeight: on ? 700 : 500,
        cursor: "pointer",
        marginBottom: 2,
        background: on ? "rgba(21,114,232,.08)" : "transparent"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: m.icon,
      style: {
        width: 16,
        textAlign: "center",
        color: on ? "#1572e8" : "#7D90A6"
      }
    }), m.label, m.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        background: on ? "#1572e8" : "#ECECEC",
        color: on ? "#fff" : "#878787",
        borderRadius: 10,
        fontSize: 10,
        padding: "1px 7px",
        fontFamily: "Nunito, sans-serif",
        fontWeight: 700
      }
    }, m.count));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Nunito, sans-serif",
      fontSize: 10,
      fontWeight: 700,
      color: "#878787",
      textTransform: "uppercase",
      letterSpacing: ".08em",
      padding: "0 12px",
      margin: "20px 0 8px"
    }
  }, "System"), /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav("settings"),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 12px",
      borderRadius: 6,
      color: active === "settings" ? "#1572e8" : "#555",
      fontFamily: "Nunito, sans-serif",
      fontSize: 13,
      fontWeight: active === "settings" ? 700 : 500,
      cursor: "pointer",
      background: active === "settings" ? "rgba(21,114,232,.08)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "gear",
    style: {
      width: 16,
      textAlign: "center",
      color: active === "settings" ? "#1572e8" : "#7D90A6"
    }
  }), " Settings"));
}
Object.assign(window, {
  TopBar,
  Sidebar,
  MODULES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ui.jsx
try { (() => {
/* Aptien Product UI — shared primitives. Exported to window for cross-file use. */
const {
  useState
} = React;

/* ---- Icon (Font Awesome solid) ---- */
function Icon({
  name,
  className = "",
  style
}) {
  return /*#__PURE__*/React.createElement("i", {
    className: `fa-solid fa-${name} ${className}`,
    style: style
  });
}

/* ---- Avatar ---- */
function Avatar({
  initials,
  color = "#7602FF",
  size = 27
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      color: "#fff",
      fontFamily: "Nunito, sans-serif",
      fontWeight: 700,
      fontSize: size * 0.4,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, initials);
}

/* ---- Button (rounded pill) ---- */
function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  disabled
}) {
  const base = {
    borderRadius: 50,
    fontFamily: "Nunito, sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: ".03em",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    transition: "all .15s",
    padding: "9px 20px",
    border: "none",
    opacity: disabled ? 0.4 : 1
  };
  const variants = {
    primary: {
      background: "#1572e8",
      color: "#fff"
    },
    secondary: {
      background: "transparent",
      border: "1.5px solid #1572e8",
      color: "#1572e8"
    },
    text: {
      background: "transparent",
      color: "#1572e8",
      fontWeight: 500
    },
    outline: {
      background: "transparent",
      border: "1.5px solid rgba(0,0,0,.25)",
      color: "#333"
    },
    success: {
      background: "#00C853",
      color: "#fff"
    },
    danger: {
      background: "#EF5350",
      color: "#fff"
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    style: {
      ...base,
      ...variants[variant]
    },
    onClick: onClick,
    disabled: disabled
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon
  }), children);
}

/* ---- Badge ---- */
function Badge({
  children,
  bg = "#FFCD00",
  color = "#082e5d"
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      borderRadius: 4,
      padding: "3px 8px",
      fontFamily: "Nunito, sans-serif",
      fontWeight: 800,
      fontSize: 11,
      background: bg,
      color,
      display: "inline-block"
    }
  }, children);
}

/* ---- Deadline badge ---- */
function DeadlineBadge({
  kind
}) {
  const map = {
    overdue: ["#DD2C00", "Overdue"],
    warning: ["#FFAB00", "Due soon"],
    ok: ["#00C853", "On time"]
  };
  const [bg, label] = map[kind];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      borderRadius: 3,
      padding: "2px 7px",
      fontFamily: "Nunito, sans-serif",
      fontWeight: 700,
      fontSize: 11,
      color: "#fff",
      background: bg
    }
  }, label);
}

/* ---- Tag ---- */
function Tag({
  children,
  icon,
  variant = "default"
}) {
  const v = {
    default: {
      background: "#eceff1",
      color: "#59676d"
    },
    blue: {
      background: "#64b5f6",
      color: "#fff"
    },
    red: {
      background: "#f06292",
      color: "#fff"
    },
    green: {
      background: "#22C55E",
      color: "#fff"
    },
    yellow: {
      background: "#ffc107",
      color: "#000"
    }
  }[variant];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 12px",
      borderRadius: 4,
      fontFamily: "Nunito, sans-serif",
      fontSize: 9,
      fontWeight: 600,
      lineHeight: 1,
      ...v
    }
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    style: {
      marginRight: 6
    }
  }), children);
}

/* ---- Search input (pill) ---- */
function SearchInput({
  value,
  onChange,
  placeholder = "Search…"
}) {
  const [focus, setFocus] = useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      width: 300,
      maxWidth: "100%",
      background: focus ? "#fff" : "#f2f5f7",
      border: `1px solid ${focus ? "#1572e8" : "transparent"}`,
      boxShadow: focus ? "0 0 0 3px rgba(21,114,232,.12)" : "none",
      borderRadius: 999,
      padding: "5px 8px 5px 16px",
      transition: "all .15s"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "magnifying-glass",
    style: {
      color: "#878787",
      fontSize: 14,
      marginRight: 10
    }
  }), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      background: "transparent",
      border: "none",
      outline: "none",
      padding: "6px 0",
      fontFamily: "Nunito, sans-serif",
      fontSize: 13,
      color: "#1a1a1a"
    }
  }), value && /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange(""),
    style: {
      flexShrink: 0,
      border: "none",
      background: "rgba(0,0,0,.05)",
      width: 22,
      height: 22,
      borderRadius: "50%",
      cursor: "pointer",
      color: "#878787",
      fontSize: 10,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "xmark"
  })));
}

/* ---- Switch ---- */
function Switch({
  on,
  onClick
}) {
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      width: 50,
      height: 22,
      background: on ? "#6bbe7a" : "#b0bbbe",
      borderRadius: 22,
      position: "relative",
      cursor: "pointer",
      transition: "background .2s",
      display: "inline-block",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: on ? 31 : 3,
      width: 16,
      height: 16,
      background: "#fff",
      borderRadius: "50%",
      boxShadow: "0 1px 3px rgba(0,0,0,.25)",
      transition: "left .2s"
    }
  }));
}
Object.assign(window, {
  Icon,
  Avatar,
  Button,
  Badge,
  DeadlineBadge,
  Tag,
  SearchInput,
  Switch
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ui.jsx", error: String((e && e.message) || e) }); }

})();
