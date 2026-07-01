import type { ContentNodePayload } from "@/lib/queries/page-by-uri";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/env";
import { getWordPressNodeByUri, isBlogPostingNode, stripTags } from "@/lib/wordpress-node";

type Props = {
  uri: string;
  pathname: string;
};

export async function WordPressArticle({ uri, pathname }: Props) {
  const node = await getWordPressNodeByUri(uri);
  return <WordPressArticleBody node={node} pathname={pathname} />;
}

export function WordPressArticleBody({
  node,
  pathname,
}: {
  node: ContentNodePayload;
  pathname: string;
}) {
  const site = getSiteUrl().replace(/\/+$/, "");
  const pathForUrl = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
  const url = new URL(pathForUrl, `${site}/`).toString();
  const title =
    node.title?.trim() || pathname.split("/").filter(Boolean).pop() || "Content";
  const description =
    node.excerpt ?
      stripTags(node.excerpt).slice(0, 320)
    : stripTags(node.content ?? "").slice(0, 320);
  const isArticle = isBlogPostingNode(node);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isArticle ? "BlogPosting" : "WebPage",
    "@id": url,
    url,
    name: title,
    description: description || undefined,
    dateModified: node.modified ?? undefined,
    isPartOf: { "@type": "WebSite", name: "Nourbelle Tours", url: `${site}/` },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
            {isArticle ? "Journal" : "Page"}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-[#0A0909]">{title}</h1>
          {node.featuredImage?.node?.sourceUrl ?
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src={node.featuredImage.node.sourceUrl}
                alt={node.featuredImage.node.altText || title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
          : null}
        </header>
        {node.content ?
          <div
            suppressHydrationWarning
            className="max-w-none space-y-4 text-base leading-relaxed text-zinc-800 [&_a]:text-[#0A0909] [&_a]:underline [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_img]:h-auto [&_img]:max-w-full [&_p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: node.content }}
          />
        : null}
      </article>
    </>
  );
}
