import type { Metadata } from "next";
import {
  buildWordPressNodeMetadata,
  getWordPressNodeByUri,
  segmentsToPathname,
  segmentsToWpUri,
} from "@/lib/wordpress-node";
import { WordPressArticle } from "@/components/wp/WordPressArticle";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>;
}): Promise<Metadata> {
  const { path } = await params;
  const uri = segmentsToWpUri(path);
  const pathname = segmentsToPathname(path);
  const node = await getWordPressNodeByUri(uri);
  return buildWordPressNodeMetadata(node, pathname);
}

export default async function CatchAllWordPressPage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const uri = segmentsToWpUri(path);
  const pathname = segmentsToPathname(path);
  return <WordPressArticle uri={uri} pathname={pathname} />;
}
