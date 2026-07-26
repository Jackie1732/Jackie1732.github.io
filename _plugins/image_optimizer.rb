# frozen_string_literal: true

# Build-time image optimizer.
#
# Two jobs, both applied to rendered output only (Markdown parsing is never
# touched, so existing notes keep working unchanged):
#
# 1. Rewrite `https://github.com/<repo>/blob/<branch>/...?raw=true` image URLs
#    to site-local paths. Those GitHub blob links cost a 302 redirect to
#    raw.githubusercontent.com plus a cross-origin fetch for every image; the
#    files already ship in the repo, so a local `/pictures/...` path is faster
#    and works offline.
#
# 2. Give every content <img> `decoding="async"` and lazy-load everything below
#    the first image. The first image on a page is fetched eagerly with high
#    priority so it does not regress Largest Contentful Paint.
module Jekyll
  module ImageOptimizer
    IMG_TAG = /<img\b[^>]*>/i.freeze

    def self.blob_prefixes(site)
      repo = site.config["repository"] || "#{site.config["github_username"]}/#{site.config["github_username"]}.github.io"
      branches = %w[main master gh-pages]
      branches.map { |b| "https://github.com/#{repo}/blob/#{b}/" }
    end

    def self.rewrite(output, site)
      return output unless output.include?("<img")

      baseurl = site.config["baseurl"].to_s.chomp("/")

      # 1. GitHub blob URLs -> local paths.
      blob_prefixes(site).each do |prefix|
        output = output.gsub(prefix, "#{baseurl}/")
      end
      output = output.gsub("?raw=true", "")

      # 2. Loading hints. First image eager + high priority, the rest lazy.
      seen_first = false
      output.gsub(IMG_TAG) do |tag|
        next tag if tag =~ /\bloading=/i

        if seen_first
          tag.sub(/<img\b/i, '<img loading="lazy" decoding="async"')
        else
          seen_first = true
          tag.sub(/<img\b/i, '<img decoding="async" fetchpriority="high"')
        end
      end
    end
  end
end

Jekyll::Hooks.register [:posts, :pages, :documents], :post_render do |item|
  next unless item.output
  next unless item.output.include?("<img")

  item.output = Jekyll::ImageOptimizer.rewrite(item.output, item.site)
end
