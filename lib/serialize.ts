/** Convert Prisma records (BigInt created_at) into JSON-safe plain objects. */
export function serializeRecord<T extends Record<string, unknown>>(row: T) {
  const out: Record<string, unknown> = { ...row };
  if (typeof out.created_at === "bigint") {
    out.created_at = Number(out.created_at);
  }
  return out;
}

export function serializeRecords<T extends Record<string, unknown>>(rows: T[]) {
  return rows.map(serializeRecord);
}
