import React from 'react';

interface AdminFormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'number' | 'date' | 'datetime-local' | 'url';
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  helpText?: string;
  className?: string;
}

export function AdminFormField({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  defaultValue,
  helpText,
  className = '',
}: AdminFormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={name} className="block text-xs font-semibold text-text-strong uppercase tracking-wider">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text-strong placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-blue-700/30 focus:border-blue-700/40 transition-all"
      />
      {helpText && (
        <p className="text-[11px] text-text-muted">{helpText}</p>
      )}
    </div>
  );
}

interface AdminTextAreaFieldProps {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
  helpText?: string;
  className?: string;
}

export function AdminTextAreaField({
  label,
  name,
  required = false,
  placeholder,
  defaultValue,
  rows = 4,
  helpText,
  className = '',
}: AdminTextAreaFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={name} className="block text-xs font-semibold text-text-strong uppercase tracking-wider">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={rows}
        className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text-strong placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-blue-700/30 focus:border-blue-700/40 transition-all resize-y"
      />
      {helpText && (
        <p className="text-[11px] text-text-muted">{helpText}</p>
      )}
    </div>
  );
}

interface AdminSelectFieldProps {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  options: { value: string; label: string }[];
  helpText?: string;
  className?: string;
}

export function AdminSelectField({
  label,
  name,
  required = false,
  defaultValue,
  options,
  helpText,
  className = '',
}: AdminSelectFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={name} className="block text-xs font-semibold text-text-strong uppercase tracking-wider">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text-strong focus:outline-none focus:ring-2 focus:ring-blue-700/30 focus:border-blue-700/40 transition-all"
      >
        <option value="">— Pilih —</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helpText && (
        <p className="text-[11px] text-text-muted">{helpText}</p>
      )}
    </div>
  );
}
