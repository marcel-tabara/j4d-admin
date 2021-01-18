const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  seo: {
    mobileAlternate: {
      media: { type: String, required: false },
      href: { type: String, required: false },
    },
    languageAlternates: {
      hrefLang: { type: String, required: false },
      href: { type: String, required: false },
    },
    openGraph: {
      images: {
        url: { type: String, required: false },
        width: { type: Number, required: false },
        height: { type: Number, required: false },
        alt: { type: String, required: false },
      },
      videos: {
        url: { type: String, required: false },
        width: { type: Number, required: false },
        height: { type: Number, required: false },
        alt: { type: String, required: false },
      },
      profile: {
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        username: { type: String, required: false },
        gender: { type: String, required: false },
      },
      book: {
        authors: { type: Array, required: false },
        tags: { type: Array, required: false },
        isbn: { type: String, required: false },
        releaseDate: { type: String, required: false },
      },
      article: {
        authors: { type: Array, required: false },
        tags: { type: Array, required: false },
        publishedTime: { type: String, required: false },
        modifiedTime: { type: String, required: false },
        expirationTime: { type: String, required: false },
      },
      video: {
        actors: {
          profile: { type: String, required: false },
          role: { type: String, required: false },
        },
        directors: { type: Array, required: false },
        writers: { type: Array, required: false },
        tags: { type: Array, required: false },
        duration: { type: String, required: false },
        releaseDate: { type: String, required: false },
        series: { type: String, required: false },
      },
      url: { type: String, required: false },
      type: { type: String, required: false },
      title: { type: String, required: false },
      description: { type: String, required: false },
      defaultImageHeight: { type: Number, required: false },
      defaultImageWidth: { type: Number, required: false },
      locale: { type: String, required: false },
      site_name: { type: String, required: false },
    },
    facebook: {
      appId: { type: String, required: false },
    },
    twitter: {
      handle: { type: String, required: false },
      site: { type: String, required: false },
      cardType: { type: String, required: false },
    },
    metaTags: {
      content: { type: String, required: false },
      property: { type: String, required: false },
      name: { type: String, required: false },
    },
    title: { type: String, required: false },
    titleTemplate: { type: String, required: false },
    noindex: { type: Boolean, required: false },
    nofollow: { type: Boolean, required: false },
    description: { type: String, required: false },
    canonical: { type: String, required: false },
  },
  markdown: { type: String, required: true },
  created: { type: Date, required: false },
  updated: { type: Date, required: false },
  category: { type: String, required: false },
  subcategory: { type: String, required: false },
  priority: { type: String, required: false },
  slug: { type: String, required: false },
});

module.exports = mongoose.model('Post', PostSchema);
