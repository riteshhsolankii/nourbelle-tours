type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Avoids `</script>` (or other `<`) in JSON breaking HTML parsing and hydration. */
function jsonLdInnerHtml(data: Record<string, unknown> | Record<string, unknown>[]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD must be inline for crawlers
      dangerouslySetInnerHTML={{ __html: jsonLdInnerHtml(data) }}
    />
  );
}
