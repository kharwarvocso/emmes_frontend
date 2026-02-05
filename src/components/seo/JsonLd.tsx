type JsonLdProps = {
  id?: string;
  data?: unknown;
};

const safeJsonParse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
};

export default function JsonLd({ id, data }: JsonLdProps) {
  if (data === null || data === undefined) return null;

  const normalized =
    typeof data === "string" ? safeJsonParse(data) ?? data : data;

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(normalized) }}
    />
  );
}
