# YouTube integration and audience-acquisition strategy

The website must be designed as the companion platform for the existing YouTube channel:

Channel name: TCG Business Elite
Channel URL: https://www.youtube.com/@TCGBusinessElite
Primary current content format: YouTube Shorts

YouTube should be treated as the initial and most important source of visitors.

The website and YouTube channel must feel like parts of the same brand, while the website should offer substantially more information than a YouTube Short can provide.

# YouTube-to-website visitor journey

Design a low-friction journey:

YouTube Short
→ channel profile link or related video
→ campaign-specific website landing page
→ relevant card-detail page
→ collection exploration
→ education, newsletter or return visit

Account for the fact that ordinary URLs in YouTube Shorts descriptions and comments may not be clickable.

Recommend compliant conversion paths using:

- YouTube channel-profile links
- A prominently positioned first profile link
- Related videos attached to Shorts
- Clickable links in qualifying long-form video descriptions
- Spoken calls to action
- On-screen calls to action
- Memorable short website URLs
- Optional QR codes where appropriate
- Pinned comments that direct viewers to the channel-profile link

Do not recommend link techniques that bypass YouTube policies.

# Short-specific landing pages

The application should support landing pages created for individual Shorts, cards, sets or campaigns.

Examples:

- /youtube
- /szoboszlai
- /shorts/{short-code}
- /cards/{card-slug}
- /sets/{set-slug}

Each Short-specific landing page should:

- Immediately show the same card featured in the Short
- Use matching imagery and terminology
- Confirm that the visitor reached the correct page
- Display card identity and key facts above the fold
- Show front and back card images
- Explain the card’s set, parallel and condition
- Show available price history with confidence information
- Link to related Szoboszlai cards
- Offer an educational explanation for unfamiliar terminology
- Include a prominent “Watch on YouTube” link
- Load quickly on mobile devices
- Avoid intrusive advertising before the requested card content
- Include a clear next action
- Remain useful even when no market data is available

Do not send all YouTube visitors to a generic homepage when the Short can be connected to a specific card or topic.

# YouTube content connections

Extend the data model so that the following records can be connected to YouTube content:

- Owned card
- Canonical card release
- Set or series
- Player event
- Educational article
- Campaign
- YouTube video or Short

A YouTube-content record should support:

- YouTube video ID
- Video type: Short, standard video or live stream
- Title
- Publication date
- Thumbnail
- Associated cards
- Associated set or series
- Associated educational article
- Website landing-page slug
- Campaign identifier
- Call-to-action version
- Visibility status

One Short may relate to several cards, and one card may appear in several videos.

# Website YouTube features

Include:

- A visible link to the TCG Business Elite YouTube channel
- A “Featured on YouTube” section
- A collection filter for cards appearing in videos
- A “Watch this card’s Short” action on relevant card pages
- A latest-videos or selected-videos component
- YouTube links in the site header or footer
- Optional embedded videos using privacy-conscious loading
- A clear external-link indicator where appropriate

Do not automatically load third-party YouTube tracking on every page.

Prefer a thumbnail with click-to-load behavior or YouTube’s privacy-enhanced embedding mode. Evaluate whether consent is required before loading embedded third-party content for EU visitors.

# Campaign attribution

Build privacy-conscious campaign attribution into the platform.

Support:

- UTM parameters
- Campaign-specific paths
- Short or video identifiers
- Referring source
- Landing page
- First visit
- Engaged visit
- Card-page views
- Collection exploration
- Education-article views
- Newsletter signup if added later
- Return visits using privacy-respecting methods

Example profile URL:

https://example.com/szoboszlai?utm_source=youtube&utm_medium=channel_profile&utm_campaign=szoboszlai_collection

Example related-video URL:

https://example.com/cards/{card-slug}?utm_source=youtube&utm_medium=video_description&utm_campaign={campaign}&utm_content={video_id}

For memorable on-screen URLs, campaign attribution may be encoded in the path:

https://example.com/szobo/101

Do not place personal information in campaign URLs.

# Conversion measurement

Define a simple funnel dashboard showing:

- YouTube-referred visits
- Visits by campaign or Short
- Landing-page engagement
- Card-detail interactions
- Collection pages viewed per session
- Education-content visits
- YouTube return clicks
- Newsletter conversions when introduced
- Advertising engagement reported separately

Avoid vanity metrics as the only measure of success.

Do not use dark patterns, forced registration or misleading calls to action.

# Short content templates

Create reusable Short-to-website content templates.

Template A: Card showcase

Hook:
“Do you know what makes this Szoboszlai card different?”

Content:
Show the card, manufacturer, set, parallel and one distinguishing feature.

CTA:
“See the front, back, complete details and available price history through the first link on my channel profile.”

Template B: Price-history story

Hook:
“How has this Szoboszlai card’s market changed?”

Content:
Explain one confirmed market observation without presenting it as a guaranteed valuation.

CTA:
“See the complete timeline, sources and confidence level on the website through my profile.”

Template C: Education

Hook:
“What does a numbered football card actually mean?”

Content:
Give a concise explanation using a card from the collection.

CTA:
“The complete beginner’s guide and examples are available through the first profile link.”

Template D: Collection discovery

Hook:
“Card number {number} in my Szoboszlai collection.”

Content:
Highlight why the card was added and what makes it interesting.

CTA:
“Explore the full Szoboszlai collection through the link on my channel profile.”

# Advertising considerations for YouTube visitors

Do not immediately confront visitors from YouTube with an interstitial, full-screen advertisement or consent wall that prevents access to the promised card.

The landing page must deliver the information promised in the Short before presenting significant advertising.

Reserve stable ad space to avoid layout shift and consider:

- One ad below the main card information
- One ad between related-card sections
- A desktop sidebar placement
- Limited contextual ads in educational articles

Keep YouTube campaign performance separate from advertisement-click performance. Never optimize the interface to produce accidental ad clicks.

# Branding requirements

Develop a consistent brand system across the website and TCG Business Elite YouTube channel, including:

- Logo usage
- Profile and website colors
- Typography
- Thumbnail style
- Card-image treatment
- On-screen Short captions
- Website call-to-action language
- URL presentation
- Trust and methodology language

The visual identity must be distinctive without copying the trademarks, colors or trade dress of a football club, player, league, manufacturer or grading company.

# YouTube integration success criteria

The integration is successful when:

- A Short can be connected to a specific card or article.
- The Short can direct visitors to a memorable relevant URL.
- The resulting page immediately continues the story from the Short.
- Visitors are not sent unnecessarily to a generic homepage.
- Campaign traffic can be measured without invasive tracking.
- Card pages can link back to related YouTube content.
- YouTube embeds do not harm privacy or page performance.
- Calls to action comply with current YouTube link behavior.
- Advertising does not obstruct the content promised in the Short.