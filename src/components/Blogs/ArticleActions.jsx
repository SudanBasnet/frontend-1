import ArticlePrint from "@/components/Blogs/ArticlePrint";
import ArticleSave from "@/components/Blogs/ArticleSave";
import ArticleShare from "@/components/Blogs/ArticleShare";

export default function ArticleActions({ href, title, source }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ArticleSave href={href} title={title} source={source} />
      <ArticleShare title={title} />
      <ArticlePrint />
    </div>
  );
}
