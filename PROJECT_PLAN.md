# CEZLIAR Official Website Development Plan

Version: 1.0

---

# Project Overview

Create a premium static brand website for **CEZLIAR**.

The website should feel like a luxury Indian brand, not a normal ecommerce store.

No backend required.
No payment gateway required.
No cart checkout required.

All products will have:

* Buy on Amazon Button
* Buy on Flipkart Button

Admin can manually update product data and marketplace links inside JSON files.

---

# Tech Stack

Frontend:

* HTML5
* CSS3
* TailwindCSS
* JavaScript (Vanilla)
* GSAP Animation Library
* SwiperJS

No Backend:

* No Database
* No Authentication
* No Server APIs

Hosting:

* Cloudflare Pages
* Netlify
* Vercel
* GitHub Pages

---

# Folder Structure

```
cezliar/
│
├── index.html
├── about.html
├── contact.html
├── collections.html
├── products.html
├── blogs.html
│
├── assets/
│   ├── images/
│   ├── videos/
│   ├── icons/
│
├── css/
│   ├── style.css
│   ├── animations.css
│
├── js/
│   ├── app.js
│   ├── products.js
│   ├── animation.js
│
├── data/
│   ├── products.json
│   ├── categories.json
│   ├── testimonials.json
│
└── components/
    ├── navbar.html
    ├── footer.html
```

---

# Brand Colors

Primary:
#0F4D3C

Gold:
#C9A227

Ivory:
#F8F6F1

Light Beige:
#F4EFE6

Dark:
#2D2D2D

---

# Typography

Headings:
Playfair Display

Body:
Poppins

---

# Website Pages

## 1. Home Page

Sections:

### Hero Section

Full width slider.

Slides:

* Attar Collection
* Dhoop Collection
* Water Care
* Home Care

CTA:

Shop Collection

Explore Brand

---

### Our Collections

Cards:

* Fragrance
* Dhoop
* Water Care
* Home Care

Hover Animation.

---

### Best Sellers

Product Slider.

---

### Why Choose CEZLIAR

Icons:

* Premium Quality
* Trusted Brand
* Secure Shopping
* Fast Delivery
* Made in India
* Customer Support

---

### Brand Story

Luxury section with image and text.

---

### Customer Reviews

Auto slider.

---

### Instagram Gallery

Grid.

---

### Newsletter

Email input only.

No backend.

---

## 2. Collections Page

Cards:

### Fragrance

### Dhoop

### Water Care

### Home Care

Each card redirects to category page.

---

## 3. Product Listing Page

Features:

* Product Image
* Product Name
* Description
* Specifications
* Amazon Button
* Flipkart Button

No Add To Cart.

No Checkout.

---

## 4. Product Details Page

Gallery.

Specifications.

Benefits.

Applications.

FAQs.

Buttons:

Buy on Amazon

Buy on Flipkart

---

## 5. About Page

Sections:

Our Story

Vision

Mission

Why Choose CEZLIAR

---

## 6. Blogs Page

Static Blog Cards.

No CMS.

Blog markdown files.

---

## 7. Contact Page

Company Information.

Contact Form:

Name

Email

Message

FormSubmit integration optional.

---

# Navigation Bar

Desktop Menu:

Home

Shop

Collections

About CEZLIAR

Blogs

Contact

Icons:

Search

Cart Icon (optional)

Account Icon (optional)

Sticky Navigation.

Glass Effect.

---

# Footer

Quick Links

Collections

Marketplace Links

Social Media

Newsletter

Copyright.

---

# Product Data Structure

products.json

```
[
  {
    "id": 1,
    "name": "Drain Cleaner",
    "slug": "drain-cleaner",
    "category": "Home Care",
    "image": "assets/images/drain-cleaner.webp",
    "description": "Powerful drain cleaning solution.",
    "amazon": "AMAZON_LINK",
    "flipkart": "FLIPKART_LINK"
  }
]
```

---

# Product Card Component

Image

Title

Short Description

Buy on Amazon Button

Buy on Flipkart Button

Hover Animation.

---

# Search Function

Static search using JavaScript.

Search products from JSON.

---

# SEO

Dynamic Meta Tags.

Schema.org JSON-LD.

OpenGraph Tags.

Twitter Tags.

Sitemap.xml

Robots.txt

---

# Performance Requirements

PageSpeed:

Desktop:
95+

Mobile:
90+

Image format:
WebP.

Lazy Loading:
Enabled.

---

# Animation Requirements

GSAP:

Fade Up

Zoom

Parallax

Smooth Scroll

Floating Cards

Button Hover Effects

Counter Animation

---

# Mobile Responsive Breakpoints

320px

480px

768px

1024px

1440px

---

# Development Phases

---

# Phase 1

Project Setup

Folder Structure

Tailwind Installation

Base Layout

---

# Phase 2

Navbar

Footer

Home Page

---

# Phase 3

Collections

Products

JSON Integration

---

# Phase 4

Product Details Pages

Marketplace Buttons

Search

---

# Phase 5

Blogs

About

Contact

---

# Phase 6

Animations

SEO

Optimization

---

# Phase 7

Testing

Mobile Testing

Cross Browser Testing

Deployment

---

# Deployment

Deploy to:

* Cloudflare Pages
* Netlify
* Vercel

---

# Future Upgrade (Optional)

Admin Panel

CMS

Inventory

Direct Checkout

Customer Accounts

Wishlist

PWA

Android App

---

# Final Goal

Build a premium luxury brand website for CEZLIAR that showcases products beautifully and redirects customers to Amazon and Flipkart for purchasing.
