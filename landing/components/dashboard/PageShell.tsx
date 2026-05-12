import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  gdprNotice?: boolean;
  children: ReactNode;
}

export default function PageShell({ title, subtitle, actions, gdprNotice, children }: Props) {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>

      {/* GDPR notice */}
      {gdprNotice && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 110 1.5A.75.75 0 018 4zm.75 3.75v4.5a.75.75 0 01-1.5 0v-4.5a.75.75 0 011.5 0z" />
          </svg>
          <p className="text-xs text-amber-700">
            <span className="font-semibold">GDPR Notice:</span> Personal data is masked per EU General Data Protection Regulation.
            Full data accessible only to authorised personnel with audit logging. Retention period: 5 years.{" "}
            <a href="/dashboard/settings#gdpr" className="underline">Manage data settings →</a>
          </p>
        </div>
      )}

      {children}
    </div>
  );
}
