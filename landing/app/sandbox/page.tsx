"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Copy, CheckCircle2, ChevronDown, ChevronRight, ArrowLeft } from "lucide-react";

const ENDPOINTS = [
  {
    group: "Cards",
    items: [
      {
        id: "issue-card",
        method: "POST",
        path: "/v1/cards/issue",
        desc: "Issue a new virtual or physical card",
        body: `{
  "customer_id": "cust_4xMr9kL",
  "product": "virtual",
  "currency": "AZN",
  "spending_limit": 2000,
  "notify_customer": true
}`,
        response: `{
  "card_id": "card_7yNk3pX",
  "status": "active",
  "pan_last4": "4242",
  "network": "Visa",
  "currency": "AZN",
  "spending_limit": 2000,
  "issued_at": "2025-05-12T09:14:00Z",
  "expires": "2028-05-31"
}`,
        statusCode: 201,
      },
      {
        id: "get-card",
        method: "GET",
        path: "/v1/cards/{card_id}",
        desc: "Retrieve card details",
        body: "",
        response: `{
  "card_id": "card_7yNk3pX",
  "status": "active",
  "pan_last4": "4242",
  "network": "Visa",
  "currency": "AZN",
  "spending_limit": 2000,
  "spent_mtd": 142.50,
  "customer_id": "cust_4xMr9kL",
  "issued_at": "2025-05-12T09:14:00Z"
}`,
        statusCode: 200,
      },
      {
        id: "freeze-card",
        method: "POST",
        path: "/v1/cards/{card_id}/freeze",
        desc: "Freeze or unfreeze a card instantly",
        body: `{ "frozen": true }`,
        response: `{
  "card_id": "card_7yNk3pX",
  "status": "frozen",
  "frozen_at": "2025-05-12T09:20:00Z"
}`,
        statusCode: 200,
      },
    ],
  },
  {
    group: "Payments",
    items: [
      {
        id: "initiate-payment",
        method: "POST",
        path: "/v1/payments/initiate",
        desc: "Initiate a payment from customer account",
        body: `{
  "customer_id": "cust_4xMr9kL",
  "amount": 142.50,
  "currency": "AZN",
  "merchant_id": "merch_bravo",
  "description": "Grocery purchase",
  "idempotency_key": "pay_abc123"
}`,
        response: `{
  "payment_id": "pay_9xKd2mN",
  "status": "approved",
  "amount": 142.50,
  "currency": "AZN",
  "merchant_id": "merch_bravo",
  "processed_at": "2025-05-12T09:14:02Z",
  "fee": 0.43
}`,
        statusCode: 201,
      },
    ],
  },
  {
    group: "Transfers",
    items: [
      {
        id: "create-transfer",
        method: "POST",
        path: "/v1/transfers",
        desc: "Create a peer-to-peer or inter-account transfer",
        body: `{
  "from_customer_id": "cust_4xMr9kL",
  "to_customer_id": "cust_9pQr5sT",
  "amount": 50.00,
  "currency": "AZN",
  "note": "Lunch split"
}`,
        response: `{
  "transfer_id": "txfr_3jWx8nP",
  "status": "completed",
  "amount": 50.00,
  "currency": "AZN",
  "completed_at": "2025-05-12T09:14:03Z"
}`,
        statusCode: 201,
      },
    ],
  },
  {
    group: "Lending",
    items: [
      {
        id: "apply-loan",
        method: "POST",
        path: "/v1/lending/apply",
        desc: "Apply for a credit product on behalf of a customer",
        body: `{
  "customer_id": "cust_4xMr9kL",
  "amount": 5000,
  "currency": "AZN",
  "term_months": 12,
  "product": "consumer_loan"
}`,
        response: `{
  "loan_id": "ln_4401",
  "status": "approved",
  "amount": 5000,
  "currency": "AZN",
  "term_months": 12,
  "monthly_payment": 458.33,
  "interest_rate": 0.18,
  "first_payment_date": "2025-06-12"
}`,
        statusCode: 201,
      },
    ],
  },
  {
    group: "BNPL",
    items: [
      {
        id: "create-bnpl",
        method: "POST",
        path: "/v1/bnpl/create-plan",
        desc: "Create a buy-now-pay-later installment plan",
        body: `{
  "customer_id": "cust_4xMr9kL",
  "merchant_id": "merch_apple",
  "total_amount": 749.00,
  "currency": "AZN",
  "installments": 3,
  "first_payment_date": "2025-06-12"
}`,
        response: `{
  "plan_id": "bnpl_881",
  "status": "active",
  "total_amount": 749.00,
  "installment_amount": 249.67,
  "installments": 3,
  "schedule": [
    { "due": "2025-06-12", "amount": 249.67 },
    { "due": "2025-07-12", "amount": 249.67 },
    { "due": "2025-08-12", "amount": 249.66 }
  ]
}`,
        statusCode: 201,
      },
    ],
  },
  {
    group: "Transactions",
    items: [
      {
        id: "list-transactions",
        method: "GET",
        path: "/v1/transactions",
        desc: "List transactions with optional filters",
        body: "",
        response: `{
  "data": [
    {
      "id": "TXN-9041",
      "customer_id": "cust_4xMr9kL",
      "amount": 142.50,
      "currency": "AZN",
      "type": "payment",
      "status": "approved",
      "merchant_id": "merch_bravo",
      "created_at": "2025-05-12T09:14:00Z"
    }
  ],
  "meta": { "total": 12430, "page": 1, "per_page": 20 }
}`,
        statusCode: 200,
      },
    ],
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-emerald-100 text-emerald-700",
  POST: "bg-blue-100 text-blue-700",
  DELETE: "bg-red-100 text-red-600",
  PATCH: "bg-orange-100 text-orange-700",
};

function syntaxHighlight(json: string) {
  return json
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      let cls = "text-green-400";
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? "text-blue-300" : "text-yellow-300";
      } else if (/true|false/.test(match)) {
        cls = "text-orange-400";
      } else if (/null/.test(match)) {
        cls = "text-red-400";
      } else {
        cls = "text-purple-300";
      }
      return `<span class="${cls}">${match}</span>`;
    });
}

export default function SandboxPage() {
  const [selected, setSelected] = useState(ENDPOINTS[0].items[0]);
  const [body, setBody] = useState(ENDPOINTS[0].items[0].body);
  const [running, setRunning] = useState(false);
  const [response, setResponse] = useState<null | { code: number; body: string; time: number }>(null);
  const [copied, setCopied] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(ENDPOINTS.map((e) => e.group));

  const selectEndpoint = (item: typeof ENDPOINTS[0]["items"][0]) => {
    setSelected(item);
    setBody(item.body);
    setResponse(null);
  };

  const toggleGroup = (g: string) => setOpenGroups((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);

  const run = async () => {
    setRunning(true);
    setResponse(null);
    const start = Date.now();
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));
    setResponse({ code: selected.statusCode, body: selected.response, time: Date.now() - start });
    setRunning(false);
  };

  const curlCmd = `curl -X ${selected.method} https://api.unibank.az${selected.path} \\
  -H "Authorization: Bearer sk_test_upi_••••••••" \\
  -H "Content-Type: application/json"${selected.body ? ` \\
  -d '${selected.body.replace(/\n/g, " ").replace(/\s+/g, " ")}'` : ""}`;

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen flex-col bg-[#0d1117] overflow-hidden">
      {/* Top bar */}
      <header className="flex h-14 items-center justify-between border-b border-white/5 px-5 shrink-0">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors">
            <ArrowLeft size={15} />
            <span className="text-xs">Back to site</span>
          </a>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2.5">
            <Image src="/upi-logo.png" alt="UPI" width={48} height={22} className="brightness-0 invert" />
            <span className="text-xs font-medium text-white/40 border-l border-white/10 pl-2.5">API Sandbox</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-400">Sandbox environment</span>
          </div>
          <a href="/dashboard" className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors">
            Dashboard →
          </a>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r border-white/5 overflow-y-auto">
          <div className="px-3 py-3">
            <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-600">Endpoints</p>
            {ENDPOINTS.map((group) => {
              const isOpen = openGroups.includes(group.group);
              return (
                <div key={group.group} className="mb-1">
                  <button onClick={() => toggleGroup(group.group)}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors">
                    {group.group}
                    {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </button>
                  {isOpen && (
                    <div className="ml-2 space-y-0.5">
                      {group.items.map((item) => (
                        <button key={item.id} onClick={() => selectEndpoint(item)}
                          className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors ${selected.id === item.id ? "bg-white/10" : "hover:bg-white/5"}`}>
                          <span className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold ${METHOD_COLORS[item.method]}`}>{item.method}</span>
                          <span className="truncate font-mono text-[11px] text-gray-300">{item.path.replace("/v1", "")}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main: request + response */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Request bar */}
          <div className="flex items-center gap-3 border-b border-white/5 px-5 py-3 shrink-0">
            <span className={`rounded-md px-2.5 py-1 font-mono text-xs font-bold ${METHOD_COLORS[selected.method]}`}>{selected.method}</span>
            <code className="flex-1 font-mono text-sm text-gray-300">https://api.unibank.az{selected.path}</code>
            <button onClick={run} disabled={running}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-60 transition-colors shadow-sm shadow-blue-600/30">
              {running ? <><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</> : <><Play size={14} /> Run</>}
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden divide-x divide-white/5">
            {/* Request editor */}
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="border-b border-white/5 px-5 py-2.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">REQUEST</span>
                <span className="text-[10px] text-gray-600">{selected.desc}</span>
              </div>

              {/* Auth header */}
              <div className="border-b border-white/5 px-5 py-3 bg-white/2">
                <p className="text-[10px] text-gray-600 mb-1.5">HEADERS</p>
                <div className="font-mono text-xs space-y-1">
                  <div><span className="text-blue-400">Authorization</span><span className="text-gray-600">: </span><span className="text-yellow-400">Bearer sk_test_upi_2bCp8tNqYr4w••••</span></div>
                  <div><span className="text-blue-400">Content-Type</span><span className="text-gray-600">: </span><span className="text-green-400">application/json</span></div>
                </div>
              </div>

              {/* Body editor */}
              {selected.body ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <p className="px-5 pt-3 pb-1 text-[10px] font-semibold text-gray-600">BODY</p>
                  <textarea value={body} onChange={(e) => setBody(e.target.value)}
                    className="flex-1 resize-none bg-transparent px-5 pb-4 font-mono text-xs text-gray-300 outline-none leading-relaxed" />
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-xs text-gray-600">No request body — GET request</p>
                </div>
              )}

              {/* Curl */}
              <div className="border-t border-white/5">
                <div className="flex items-center justify-between px-5 py-2">
                  <span className="text-[10px] font-semibold text-gray-600">CURL EQUIVALENT</span>
                  <button onClick={() => copy(curlCmd)} className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors">
                    {copied ? <><CheckCircle2 size={11} className="text-emerald-400" /> Copied</> : <><Copy size={11} /> Copy</>}
                  </button>
                </div>
                <pre className="px-5 pb-3 font-mono text-[10px] text-gray-500 overflow-x-auto whitespace-pre">{curlCmd}</pre>
              </div>
            </div>

            {/* Response */}
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="border-b border-white/5 px-5 py-2.5 flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-500">RESPONSE</span>
                {response && (
                  <>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${response.code < 300 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                      {response.code} {response.code === 200 ? "OK" : response.code === 201 ? "Created" : "Error"}
                    </span>
                    <span className="text-[10px] text-gray-600">{response.time}ms</span>
                  </>
                )}
              </div>

              {response ? (
                <div className="flex-1 overflow-auto px-5 py-4">
                  <pre className="font-mono text-xs leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: syntaxHighlight(response.body) }} />
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                    <Play size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Hit &ldquo;Run&rdquo; to send the request</p>
                    <p className="text-xs text-gray-600 mt-1">Responses are mocked — no real data is affected</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
